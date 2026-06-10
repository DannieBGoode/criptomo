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
const ROUTE_PREFIXES = ['/api/market', '/.netlify/functions/market-data'];
const YEAR_SECONDS = 31536000;

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
  '/data/pricemulti': function () {
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

async function handler(event) {
  const upstreamPath = getUpstreamPath(event && event.path);
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
      headers: Object.assign({}, JSON_CONTENT_TYPE, response.ok ? cacheHeaders : NO_STORE),
      body: body
    };
  } catch (error) {
    return jsonError(502, 'Upstream market data request failed.');
  }
}

exports.handler = handler;

module.exports = {
  ALLOWED_ENDPOINTS: ALLOWED_ENDPOINTS,
  buildUpstreamUrl: buildUpstreamUrl,
  getUpstreamPath: getUpstreamPath,
  handler: handler
};
