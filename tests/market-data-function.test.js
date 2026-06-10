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
    global.fetch = jest.fn();
  });

  afterEach(() => {
    delete process.env.CRYPTOCOMPARE_API_KEY;
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
