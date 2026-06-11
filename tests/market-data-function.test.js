const marketData = require('../netlify/functions/market-data.js');

function createUpstreamResponse(payload, status) {
  const httpStatus = status || 200;

  return {
    ok: httpStatus >= 200 && httpStatus < 300,
    status: httpStatus,
    text: jest.fn().mockResolvedValue(JSON.stringify(payload))
  };
}

describe('market-data Netlify function', () => {
  beforeEach(() => {
    process.env.CRYPTOCOMPARE_API_KEY = 'server-side-key';
    process.env.LIVECOINWATCH_API_KEY = 'lcw-server-key';
    global.fetch = jest.fn();
  });

  afterEach(() => {
    delete process.env.CRYPTOCOMPARE_API_KEY;
    delete process.env.LIVECOINWATCH_API_KEY;
  });

  test('proxies an allowed endpoint and appends the server-side api key', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ USD: 50000 }));

    const result = await marketData.handler({
      path: '/api/market/data/price',
      queryStringParameters: { fsym: 'BTC', tsyms: 'USD,EUR' }
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const upstreamUrl = global.fetch.mock.calls[0][0];
    expect(upstreamUrl).toContain('https://min-api.cryptocompare.com/data/price?');
    expect(upstreamUrl).toContain('fsym=BTC');
    expect(upstreamUrl).toContain('api_key=server-side-key');
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ USD: 50000 });
  });

  test('caches current prices briefly and closed past days for a year', async () => {
    global.fetch
      .mockResolvedValueOnce(createUpstreamResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createUpstreamResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createUpstreamResponse({ Data: { Data: [] } }));

    const current = await marketData.handler({
      path: '/api/market/data/price',
      queryStringParameters: { fsym: 'BTC', tsyms: 'USD' }
    });
    const historical = await marketData.handler({
      path: '/api/market/data/pricehistorical',
      queryStringParameters: { fsym: 'BTC', ts: '1500000000', tsyms: 'USD' }
    });
    const dailyHistory = await marketData.handler({
      path: '/api/market/data/v2/histoday',
      queryStringParameters: {
        fsym: 'BTC',
        tsym: 'USD',
        limit: '4',
        toTs: String(Math.floor(Date.now() / 1000) - 3 * 86400)
      }
    });

    expect(current.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=300');
    expect(historical.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=31536000');
    expect(historical.headers['Netlify-CDN-Cache-Control']).toContain('immutable');
    expect(dailyHistory.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=31536000');
  });

  test('keeps same-day or invalid historical timestamps on the short cache window', async () => {
    const startOfTodayUtc = Math.floor(Date.now() / 86400000) * 86400;
    global.fetch
      .mockResolvedValueOnce(createUpstreamResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createUpstreamResponse({ Data: { Data: [] } }))
      .mockResolvedValueOnce(createUpstreamResponse({ Data: { Data: [] } }));

    const sameDayHistorical = await marketData.handler({
      path: '/api/market/data/pricehistorical',
      queryStringParameters: { fsym: 'BTC', ts: String(Math.floor(Date.now() / 1000)), tsyms: 'USD' }
    });
    const todayDailyHistory = await marketData.handler({
      path: '/api/market/data/v2/histoday',
      queryStringParameters: { fsym: 'BTC', tsym: 'USD', limit: '4', toTs: String(startOfTodayUtc) }
    });
    const missingTimestamp = await marketData.handler({
      path: '/api/market/data/v2/histoday',
      queryStringParameters: { fsym: 'BTC', tsym: 'USD', limit: '4' }
    });

    expect(sameDayHistorical.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=300');
    expect(todayDailyHistory.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=300');
    expect(missingTimestamp.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=300');
  });

  test('strips any client-supplied api_key before calling upstream', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ USD: 50000 }));

    await marketData.handler({
      path: '/api/market/data/price',
      queryStringParameters: { fsym: 'BTC', tsyms: 'USD', api_key: 'client-injected' }
    });

    const upstreamUrl = global.fetch.mock.calls[0][0];
    expect(upstreamUrl).not.toContain('client-injected');
    expect(upstreamUrl).toContain('api_key=server-side-key');
  });

  test('also resolves paths on the direct function route', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ Data: { Data: [] } }));

    const result = await marketData.handler({
      path: '/.netlify/functions/market-data/data/v2/histoday',
      queryStringParameters: { fsym: 'BTC', tsym: 'USD', limit: '4' }
    });

    expect(global.fetch.mock.calls[0][0]).toContain('https://min-api.cryptocompare.com/data/v2/histoday?');
    expect(result.statusCode).toBe(200);
  });

  test('rejects endpoints outside the allowlist without calling upstream', async () => {
    const result = await marketData.handler({
      path: '/api/market/data/blockchain/mining',
      queryStringParameters: {}
    });

    expect(result.statusCode).toBe(404);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.headers['Cache-Control']).toBe('no-store');
  });

  test('passes through upstream errors without caching them', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ Response: 'Error' }, 429));

    const result = await marketData.handler({
      path: '/api/market/data/price',
      queryStringParameters: { fsym: 'BTC', tsyms: 'USD' }
    });

    expect(result.statusCode).toBe(429);
    expect(result.headers['Cache-Control']).toBe('no-store');
  });

  test('returns 502 when the upstream request throws', async () => {
    global.fetch.mockRejectedValueOnce(new Error('socket hang up'));

    const result = await marketData.handler({
      path: '/api/market/data/price',
      queryStringParameters: { fsym: 'BTC', tsyms: 'USD' }
    });

    expect(result.statusCode).toBe(502);
    expect(JSON.parse(result.body).error).toContain('Upstream');
  });

  const DAY_MS = 86400000;
  const CHUNK_MS = 100 * DAY_MS;
  const pastChunkStart = Math.floor((Date.now() - 200 * DAY_MS) / CHUNK_MS) * CHUNK_MS;
  const currentChunkStart = Math.floor(Date.now() / CHUNK_MS) * CHUNK_MS;

  function gridParams(start) {
    return { code: 'BTC', currency: 'USD', start: String(start), end: String(start + CHUNK_MS) };
  }

  test('proxies LiveCoinWatch history as a server-side POST with the key in a header', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ history: [{ date: pastChunkStart, rate: 35000 }] }));

    const result = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: { code: 'btc', currency: 'USD', start: String(pastChunkStart), end: String(pastChunkStart + CHUNK_MS) }
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [upstreamUrl, options] = global.fetch.mock.calls[0];
    expect(upstreamUrl).toBe('https://api.livecoinwatch.com/coins/single/history');
    expect(options.method).toBe('POST');
    expect(options.headers['x-api-key']).toBe('lcw-server-key');
    expect(JSON.parse(options.body)).toEqual({
      code: 'BTC',
      currency: 'USD',
      start: pastChunkStart,
      end: pastChunkStart + CHUNK_MS,
      meta: false
    });
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).history).toHaveLength(1);
    expect(result.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=31536000');
  });

  test('keeps LiveCoinWatch history chunks that touch today on the short cache window', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ history: [{ date: currentChunkStart, rate: 35000 }] }));

    const result = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: gridParams(currentChunkStart)
    });

    expect(result.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=300');
  });

  test('never caches an empty or malformed LiveCoinWatch 200 as immutable', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ history: [] }));

    const emptyResult = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: gridParams(pastChunkStart)
    });

    expect(emptyResult.statusCode).toBe(200);
    expect(emptyResult.headers['Netlify-CDN-Cache-Control']).toContain('s-maxage=300');
    expect(emptyResult.headers['Netlify-CDN-Cache-Control']).not.toContain('immutable');

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: jest.fn().mockResolvedValue('<html>upstream hiccup</html>')
    });

    const malformedResult = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: gridParams(pastChunkStart)
    });

    expect(malformedResult.headers['Cache-Control']).toBe('no-store');
  });

  test('rejects LiveCoinWatch history requests off the 100-day epoch grid', async () => {
    const misaligned = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: { code: 'BTC', currency: 'USD', start: String(pastChunkStart + 5), end: String(pastChunkStart + 5 + CHUNK_MS) }
    });
    const oversized = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: { code: 'BTC', currency: 'USD', start: String(pastChunkStart), end: String(pastChunkStart + 2 * CHUNK_MS) }
    });
    const badCurrency = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: { code: 'BTC', currency: 'GBP', start: String(pastChunkStart), end: String(pastChunkStart + CHUNK_MS) }
    });
    const badCode = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: { code: 'B$C', currency: 'USD', start: String(pastChunkStart), end: String(pastChunkStart + CHUNK_MS) }
    });

    expect(misaligned.statusCode).toBe(400);
    expect(oversized.statusCode).toBe(400);
    expect(badCurrency.statusCode).toBe(400);
    expect(badCode.statusCode).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('rejects LiveCoinWatch history requests with missing or invalid params', async () => {
    const missingCode = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: { currency: 'USD', start: '1', end: '2' }
    });
    const invertedRange = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: { code: 'BTC', currency: 'USD', start: '2', end: '1' }
    });

    expect(missingCode.statusCode).toBe(400);
    expect(invertedRange.statusCode).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('returns 500 for LiveCoinWatch history when the key is not configured', async () => {
    delete process.env.LIVECOINWATCH_API_KEY;

    const result = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: gridParams(pastChunkStart)
    });

    expect(result.statusCode).toBe(500);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('passes through LiveCoinWatch upstream errors without caching them', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ error: { code: 429 } }, 429));

    const result = await marketData.handler({
      path: '/api/market/lcw/history',
      queryStringParameters: gridParams(pastChunkStart)
    });

    expect(result.statusCode).toBe(429);
    expect(result.headers['Cache-Control']).toBe('no-store');
  });

  test('never caches a CryptoCompare 200 error payload', async () => {
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({
      Response: 'Error',
      Message: 'You are over your rate limit please upgrade your account!'
    }));

    const result = await marketData.handler({
      path: '/api/market/data/pricehistorical',
      queryStringParameters: { fsym: 'BTC', ts: '1500000000', tsyms: 'USD' }
    });

    expect(result.statusCode).toBe(200);
    expect(result.headers['Cache-Control']).toBe('no-store');
  });

  test('still proxies without a configured api key (local/dev fallback)', async () => {
    delete process.env.CRYPTOCOMPARE_API_KEY;
    global.fetch.mockResolvedValueOnce(createUpstreamResponse({ USD: 50000 }));

    await marketData.handler({
      path: '/api/market/data/price',
      queryStringParameters: { fsym: 'BTC', tsyms: 'USD' }
    });

    expect(global.fetch.mock.calls[0][0]).not.toContain('api_key=');
  });
});
