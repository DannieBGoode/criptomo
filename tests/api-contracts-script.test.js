const apiContracts = require('../bin/check-api-contracts.js');

function createJsonResponse(payload, status) {
  const httpStatus = status || 200;

  return {
    ok: httpStatus >= 200 && httpStatus < 300,
    status: httpStatus,
    text: jest.fn().mockResolvedValue(JSON.stringify(payload))
  };
}

function buildPriceListPayload() {
  const coins = [];
  for (let i = 0; i < 200; i++) {
    coins.push({ code: i === 115 ? 'IOTA' : 'COIN' + i, price: i === 115 ? 0.5 : 10 + i, rank: i + 1 });
  }
  return { data: coins };
}

describe('live api contract runner', () => {
  beforeEach(() => {
    delete process.env.CRYPTOCOMPARE_API_KEY;
    delete process.env.LIVECOINWATCH_API_KEY;
    delete process.env.API_CONTRACT_TIMEOUT_MS;
    delete process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE;
    delete process.env.GITHUB_ACTIONS;
    global.fetch = jest.fn();
  });

  afterEach(() => {
    delete process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE;
    delete process.env.GITHUB_ACTIONS;
  });

  test('passes when all provider contracts match the expected shape', async () => {
    process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE = '1';
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createJsonResponse({
        Data: {
          Data: [
            { time: 1741305600, close: 99000 },
            { time: 1741392000, close: 100000 },
            { time: 1741478400, close: 101000 }
          ]
        }
      }))
      .mockResolvedValueOnce(createJsonResponse({
        data: [{
          cap: 1000000,
          circulating: 19000000,
          code: 'BTC',
          name: 'Bitcoin',
          price: 60000,
          rank: 1
        }]
      }))
      .mockResolvedValueOnce(createJsonResponse(buildPriceListPayload()));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });

    expect(report.success).toBe(true);
    expect(report.results).toHaveLength(5);
    expect(report.results.every((result) => result.status === 'passed')).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(5);
    expect(apiContracts.formatMarkdownReport(report)).toContain('Overall: PASS');
  });

  test('checks only LiveCoinWatch by default; CryptoCompare needs the manual flag', async () => {
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({
        data: [{
          cap: 1000000,
          circulating: 19000000,
          code: 'BTC',
          name: 'Bitcoin',
          price: 60000,
          rank: 1
        }]
      }))
      .mockResolvedValueOnce(createJsonResponse(buildPriceListPayload()));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });

    expect(report.success).toBe(true);
    expect(report.results).toHaveLength(2);
    expect(report.results.every((result) => result.provider === 'LiveCoinWatch')).toBe(true);

    process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE = '1';
    global.fetch.mockReset();
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createJsonResponse({ Data: { Data: [{ time: 1741478400, close: 101000 }] } }))
      .mockResolvedValueOnce(createJsonResponse({ data: [{ cap: 1, circulating: 1, code: 'BTC', name: 'Bitcoin', price: 1, rank: 1 }] }))
      .mockResolvedValueOnce(createJsonResponse(buildPriceListPayload()));

    const forcedReport = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });
    expect(forcedReport.results).toHaveLength(5);
  });

  test('fails the keyed history check in CI when the key secret is missing', async () => {
    process.env.GITHUB_ACTIONS = 'true';
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ data: [{ cap: 1, circulating: 1, code: 'BTC', name: 'Bitcoin', price: 1, rank: 1 }] }))
      .mockResolvedValueOnce(createJsonResponse(buildPriceListPayload()));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });
    const keyedResult = report.results.find((result) => result.name === 'LiveCoinWatch official history (keyed)');

    expect(report.success).toBe(false);
    expect(keyedResult.status).toBe('failed');
    expect(keyedResult.error).toContain('missing in CI');
  });

  test('runs the keyed LiveCoinWatch history check only when the key is configured', async () => {
    process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE = '1';
    process.env.LIVECOINWATCH_API_KEY = 'lcw-test-key';
    const dailyPoints = [];
    for (let i = 0; i < 100; i++) {
      dailyPoints.push({ date: 1700000000000 + i * 86400000, rate: 30000 + i });
    }

    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createJsonResponse({ Data: { Data: [{ time: 1741478400, close: 101000 }] } }))
      .mockResolvedValueOnce(createJsonResponse({ data: [{ cap: 1, circulating: 1, code: 'BTC', name: 'Bitcoin', price: 1, rank: 1 }] }))
      .mockResolvedValueOnce(createJsonResponse(buildPriceListPayload()))
      .mockResolvedValueOnce(createJsonResponse({ history: dailyPoints }));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });
    const historyResult = report.results.find((result) => result.name === 'LiveCoinWatch official history (keyed)');

    expect(report.results).toHaveLength(6);
    expect(historyResult.status).toBe('passed');
    const [historyUrl, historyOptions] = global.fetch.mock.calls[5];
    expect(historyUrl).toBe('https://api.livecoinwatch.com/coins/single/history');
    expect(historyOptions.method).toBe('POST');
    expect(historyOptions.headers['x-api-key']).toBe('lcw-test-key');
    expect(JSON.stringify(report)).not.toContain('lcw-test-key');
  });

  test('fails when the LiveCoinWatch price list is too shallow or missing IOTA', async () => {
    process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE = '1';
    const shallowList = { data: [{ code: 'BTC', price: 60000, rank: 1 }] };
    const noIotaList = buildPriceListPayload();
    noIotaList.data = noIotaList.data.map((coin) => (coin.code === 'IOTA' ? { ...coin, code: 'XYZ' } : coin));

    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createJsonResponse({ Data: { Data: [{ time: 1741478400, close: 101000 }] } }))
      .mockResolvedValueOnce(createJsonResponse({ data: [{ cap: 1, circulating: 1, code: 'BTC', name: 'Bitcoin', price: 1, rank: 1 }] }))
      .mockResolvedValueOnce(createJsonResponse(shallowList));

    const shallowReport = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });
    const shallowResult = shallowReport.results.find((result) => result.name === 'LiveCoinWatch price list depth');

    expect(shallowResult.status).toBe('failed');
    expect(shallowResult.error).toContain('top 200');

    global.fetch.mockReset();
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createJsonResponse({ Data: { Data: [{ time: 1741478400, close: 101000 }] } }))
      .mockResolvedValueOnce(createJsonResponse({ data: [{ cap: 1, circulating: 1, code: 'BTC', name: 'Bitcoin', price: 1, rank: 1 }] }))
      .mockResolvedValueOnce(createJsonResponse(noIotaList));

    const noIotaReport = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });
    const noIotaResult = noIotaReport.results.find((result) => result.name === 'LiveCoinWatch price list depth');

    expect(noIotaResult.status).toBe('failed');
    expect(noIotaResult.error).toContain('IOTA');
  });

  test('reports failures without throwing when a provider payload drifts', async () => {
    process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE = '1';
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createJsonResponse({ Data: { Data: [{ time: 1741478400, close: 101000 }] } }))
      .mockResolvedValueOnce(createJsonResponse({ data: [{}] }))
      .mockResolvedValueOnce(createJsonResponse(buildPriceListPayload()));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });
    const liveCoinWatchResult = report.results.find((result) => result.name === 'LiveCoinWatch legacy market list');

    expect(report.success).toBe(false);
    expect(liveCoinWatchResult.status).toBe('failed');
    expect(liveCoinWatchResult.error).toContain('rank');
    expect(apiContracts.formatMarkdownReport(report)).toContain('Overall: FAIL');
  });

  test('surfaces the upstream message when CryptoCompare rate limits with HTTP 200', async () => {
    process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE = '1';
    const rateLimitPayload = {
      Response: 'Error',
      Message: 'You are over your rate limit please upgrade your account!',
      Data: {}
    };

    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse(rateLimitPayload))
      .mockResolvedValueOnce(createJsonResponse({ Data: {} }))
      .mockResolvedValueOnce(createJsonResponse({
        data: [{
          cap: 1000000,
          circulating: 19000000,
          code: 'BTC',
          name: 'Bitcoin',
          price: 60000,
          rank: 1
        }]
      }))
      .mockResolvedValueOnce(createJsonResponse(buildPriceListPayload()));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });
    const historicalResult = report.results.find((result) => result.name === 'CryptoCompare historical price');
    const dailyResult = report.results.find((result) => result.name === 'CryptoCompare daily history');

    expect(report.success).toBe(false);
    expect(historicalResult.status).toBe('failed');
    expect(historicalResult.error).toContain('over your rate limit');
    expect(dailyResult.status).toBe('failed');
    expect(dailyResult.error).toContain('Upstream body:');
    expect(dailyResult.error).toContain('"Data":{}');
  });

  test('never leaks the CryptoCompare API key into reports', async () => {
    process.env.API_CONTRACT_INCLUDE_CRYPTOCOMPARE = '1';
    process.env.CRYPTOCOMPARE_API_KEY = 'super-secret-key';
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ Response: 'Error' }, 401))
      .mockResolvedValueOnce(createJsonResponse({
        Data: {
          Data: [
            { time: 1741305600, close: 99000 },
            { time: 1741392000, close: 100000 }
          ]
        }
      }))
      .mockResolvedValueOnce(createJsonResponse({
        data: [{
          cap: 1000000,
          circulating: 19000000,
          code: 'BTC',
          name: 'Bitcoin',
          price: 60000,
          rank: 1
        }]
      }))
      .mockResolvedValueOnce(createJsonResponse(buildPriceListPayload()));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-09T12:00:00.000Z') });

    expect(global.fetch.mock.calls[0][0]).toContain('api_key=super-secret-key');
    expect(JSON.stringify(report)).not.toContain('super-secret-key');
    expect(apiContracts.formatMarkdownReport(report)).not.toContain('super-secret-key');
    expect(apiContracts.formatConsoleReport(report)).not.toContain('super-secret-key');
    expect(report.results[0].endpoint).toContain('api_key=REDACTED');
  });

  test('formats a readable console report with a fixed-width table', () => {
    const report = {
      generatedAt: '2026-03-09T12:00:00.000Z',
      results: [
        {
          durationMs: 18,
          endpoint: 'https://example.com/current-price',
          httpStatus: 200,
          name: 'Current price',
          notes: 'USD field is present and numeric.',
          provider: 'CryptoCompare',
          status: 'passed'
        },
        {
          durationMs: null,
          endpoint: 'https://example.com/market-list',
          error: 'rank is missing or not numeric.',
          httpStatus: 502,
          name: 'Legacy market list',
          notes: '',
          provider: 'LiveCoinWatch',
          status: 'failed'
        }
      ],
      success: false
    };
    const consoleReport = apiContracts.formatConsoleReport(report);

    expect(consoleReport).toContain('Live API Contract Report');
    expect(consoleReport).toContain('| Check              | Provider      | Status | HTTP | Time (ms) |');
    expect(consoleReport).toContain('| Current price      | CryptoCompare | PASS   | 200  | 18        |');
    expect(consoleReport).toContain('| Legacy market list | LiveCoinWatch | FAIL   | 502  | -         |');
    expect(consoleReport).toContain('Notes: USD field is present and numeric.');
    expect(consoleReport).toContain('Error: rank is missing or not numeric.');
    expect(consoleReport).toContain('Endpoint: https://example.com/market-list');
  });
});
