// Netlify Function: server-side proxy for the CryptoCompare (CoinDesk Data) market endpoints.
//
// The browser calls /api/market/<path> (see netlify.toml); this function appends the
// CRYPTOCOMPARE_API_KEY environment variable server-side so the key never reaches
// page source. CDN cache headers keep repeat lookups from spending API quota:
// current prices stay fresh within a five-minute window, while lookups for closed
// past days never change and can sit in the durable cache for a year. Netlify
// purges its cache on every deploy, so the long TTL means "until the next deploy",
// never a staleness risk.

const UPSTREAM_ORIGIN = 'https://min-api.cryptocompare.com';
const LIVECOINWATCH_ORIGIN = 'https://api.livecoinwatch.com';
const ROUTE_PREFIXES = ['/api/market', '/.netlify/functions/market-data'];
const YEAR_SECONDS = 31536000;
const DAY_MS = 86400000;
const LCW_HISTORY_CHUNK_MS = 100 * DAY_MS;
const LCW_ALLOWED_CURRENCIES = ['USD', 'EUR'];
const LCW_CODE_PATTERN = /^[A-Z0-9]{1,12}$/;

const CACHE_PROFILES = {
  current: {
    'Cache-Control': 'public, max-age=60',
    'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=300'
  },
  immutableHistory: {
    'Cache-Control': 'public, max-age=86400, immutable',
    'Netlify-CDN-Cache-Control': 'public, durable, immutable, s-maxage=' + YEAR_SECONDS
  }
};

// Data for closed past days is immutable, but a timestamp on the current UTC day
// still moves with the market (the day's candle is still running), so it only
// gets the short current-price window. Invalid or missing timestamps mean the
// upstream defaults to "now" and are treated the same way.
function historicalCacheProfile(timestampParam) {
  const timestamp = Number(timestampParam);
  const startOfTodayUtcSeconds = Math.floor(Date.now() / 86400000) * 86400;

  if (Number.isFinite(timestamp) && timestamp > 0 && timestamp < startOfTodayUtcSeconds) {
    return CACHE_PROFILES.immutableHistory;
  }

  return CACHE_PROFILES.current;
}

const ALLOWED_ENDPOINTS = {
  '/data/price': function () {
    return CACHE_PROFILES.current;
  },
  '/data/pricehistorical': function (params) {
    return historicalCacheProfile(params.ts);
  },
  '/data/v2/histoday': function (params) {
    return historicalCacheProfile(params.toTs);
  }
};

const JSON_CONTENT_TYPE = { 'Content-Type': 'application/json; charset=utf-8' };
const NO_STORE = { 'Cache-Control': 'no-store' };

function getUpstreamPath(eventPath) {
  const requestPath = String(eventPath || '');
  const matchedPrefix = ROUTE_PREFIXES.find(function (prefix) {
    return requestPath === prefix || requestPath.startsWith(prefix + '/');
  });

  if (!matchedPrefix) {
    return requestPath;
  }

  return requestPath.slice(matchedPrefix.length) || '/';
}

function buildUpstreamUrl(upstreamPath, queryStringParameters, apiKey) {
  const url = new URL(upstreamPath, UPSTREAM_ORIGIN);
  const params = queryStringParameters || {};

  Object.keys(params).forEach(function (key) {
    if (key.toLowerCase() === 'api_key') {
      return;
    }
    url.searchParams.set(key, params[key]);
  });

  if (apiKey) {
    url.searchParams.set('api_key', apiKey);
  }

  return url.toString();
}

function jsonError(statusCode, message) {
  return {
    statusCode: statusCode,
    headers: Object.assign({}, JSON_CONTENT_TYPE, NO_STORE),
    body: JSON.stringify({ error: message })
  };
}

// LiveCoinWatch's official API takes the range in milliseconds; a range whose
// end falls on a closed past day is immutable, same reasoning as
// historicalCacheProfile above.
function liveCoinWatchHistoryCacheProfile(endMsParam) {
  const endMs = Number(endMsParam);
  const startOfTodayUtcMs = Math.floor(Date.now() / DAY_MS) * DAY_MS;

  if (Number.isFinite(endMs) && endMs > 0 && endMs < startOfTodayUtcMs) {
    return CACHE_PROFILES.immutableHistory;
  }

  return CACHE_PROFILES.current;
}

// The official LiveCoinWatch API is POST-only with a header key, so the
// browser-facing GET /api/market/lcw/history is translated server-side.
//
// Requests must match the fixed 100-day epoch grid the page JS uses
// (see fetchLiveCoinWatchHistory in js/calculator-common.js). Every visitor
// then produces identical URLs, and arbitrary start/end values — which would
// each be a guaranteed CDN cache miss spending the shared key's quota — are
// rejected before any upstream call.
async function handleLiveCoinWatchHistory(queryStringParameters) {
  const params = queryStringParameters || {};
  const code = String(params.code || '').trim().toUpperCase();
  const currency = String(params.currency || 'USD').trim().toUpperCase();
  const start = Number(params.start);
  const end = Number(params.end);

  if (!LCW_CODE_PATTERN.test(code)) {
    return jsonError(400, 'code must be 1-12 uppercase letters or digits.');
  }

  if (LCW_ALLOWED_CURRENCIES.indexOf(currency) === -1) {
    return jsonError(400, 'currency must be one of: ' + LCW_ALLOWED_CURRENCIES.join(', ') + '.');
  }

  if (!Number.isFinite(start) || start <= 0 || start % LCW_HISTORY_CHUNK_MS !== 0 || end !== start + LCW_HISTORY_CHUNK_MS) {
    return jsonError(400, 'start/end must be one 100-day chunk aligned to the epoch grid.');
  }

  if (!process.env.LIVECOINWATCH_API_KEY) {
    return jsonError(500, 'LiveCoinWatch API key is not configured.');
  }

  try {
    const response = await fetch(LIVECOINWATCH_ORIGIN + '/coins/single/history', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.LIVECOINWATCH_API_KEY
      },
      body: JSON.stringify({
        code: code,
        currency: currency,
        start: start,
        end: end,
        meta: false
      })
    });
    const body = await response.text();

    return {
      statusCode: response.status,
      headers: Object.assign({}, JSON_CONTENT_TYPE, liveCoinWatchHistoryResponseHeaders(response, body, end)),
      body: body
    };
  } catch (error) {
    return jsonError(502, 'Upstream market data request failed.');
  }
}

// Only a 200 whose body actually contains history points earns the immutable
// 1-year cache — a transient empty/malformed 200 frozen into the durable CDN
// cache (and visitors' browsers, which deploy purges can't reach) would turn
// a valid coin/range into a persistent "no data" answer. Genuinely empty
// ranges (coin didn't exist yet) get the short window: correct answers,
// re-verified every few minutes instead of trusted for a year.
function liveCoinWatchHistoryResponseHeaders(response, body, endMs) {
  if (!response.ok) {
    return NO_STORE;
  }

  let points = null;
  try {
    const parsed = JSON.parse(body);
    points = parsed && parsed.history;
  } catch (error) {
    return NO_STORE;
  }

  if (!Array.isArray(points)) {
    return NO_STORE;
  }

  if (!points.length) {
    return CACHE_PROFILES.current;
  }

  return liveCoinWatchHistoryCacheProfile(endMs);
}

async function handler(event) {
  const upstreamPath = getUpstreamPath(event && event.path);

  if (upstreamPath === '/lcw/history') {
    return handleLiveCoinWatchHistory(event && event.queryStringParameters);
  }

  const resolveCacheHeaders = ALLOWED_ENDPOINTS[upstreamPath];

  if (!resolveCacheHeaders) {
    return jsonError(404, 'Unknown market data endpoint.');
  }

  const queryStringParameters = (event && event.queryStringParameters) || {};
  const cacheHeaders = resolveCacheHeaders(queryStringParameters);
  const upstreamUrl = buildUpstreamUrl(
    upstreamPath,
    queryStringParameters,
    process.env.CRYPTOCOMPARE_API_KEY
  );

  try {
    const response = await fetch(upstreamUrl);
    const body = await response.text();

    return {
      statusCode: response.status,
      headers: Object.assign({}, JSON_CONTENT_TYPE, cryptoCompareResponseHeaders(response, body, cacheHeaders)),
      body: body
    };
  } catch (error) {
    return jsonError(502, 'Upstream market data request failed.');
  }
}

// CryptoCompare reports quota and contract errors as HTTP 200 with
// Response: "Error" in the body — never let those into the cache, or an
// over-quota answer for a closed past day would be served as immutable for
// a year (until the next deploy).
function cryptoCompareResponseHeaders(response, body, cacheHeaders) {
  if (!response.ok) {
    return NO_STORE;
  }

  try {
    const parsed = JSON.parse(body);
    if (parsed && parsed.Response === 'Error') {
      return NO_STORE;
    }
  } catch (error) {
    return NO_STORE;
  }

  return cacheHeaders;
}

exports.handler = handler;

module.exports = {
  ALLOWED_ENDPOINTS: ALLOWED_ENDPOINTS,
  buildUpstreamUrl: buildUpstreamUrl,
  getUpstreamPath: getUpstreamPath,
  handleLiveCoinWatchHistory: handleLiveCoinWatchHistory,
  handler: handler
};
