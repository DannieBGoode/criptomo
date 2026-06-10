// Netlify Function: server-side proxy for the CryptoCompare (CoinDesk Data) market endpoints.
//
// The browser calls /api/market/<path> (see netlify.toml); this function appends the
// CRYPTOCOMPARE_API_KEY environment variable server-side so the key never reaches
// page source. CDN cache headers keep repeat lookups from spending API quota:
// current prices stay fresh within a five-minute window, while historical data
// never changes and can sit in the durable cache for a day.

const UPSTREAM_ORIGIN = 'https://min-api.cryptocompare.com';
const ROUTE_PREFIXES = ['/api/market', '/.netlify/functions/market-data'];

const CACHE_PROFILES = {
  current: {
    'Cache-Control': 'public, max-age=60',
    'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=300'
  },
  historical: {
    'Cache-Control': 'public, max-age=3600',
    'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=86400'
  }
};

const ALLOWED_ENDPOINTS = {
  '/data/price': CACHE_PROFILES.current,
  '/data/pricemulti': CACHE_PROFILES.current,
  '/data/pricehistorical': CACHE_PROFILES.historical,
  '/data/v2/histoday': CACHE_PROFILES.historical
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
  const cacheHeaders = ALLOWED_ENDPOINTS[upstreamPath];

  if (!cacheHeaders) {
    return jsonError(404, 'Unknown market data endpoint.');
  }

  const upstreamUrl = buildUpstreamUrl(
    upstreamPath,
    event && event.queryStringParameters,
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
