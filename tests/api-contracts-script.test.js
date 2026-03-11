const apiContracts = require('../bin/check-api-contracts.js');

function createJsonResponse(payload, status) {
  const httpStatus = status || 200;

  return {
    ok: httpStatus >= 200 && httpStatus < 300,
    status: httpStatus,
    text: jest.fn().mockResolvedValue(JSON.stringify(payload))
  };
}

describe('live api contract runner', () => {
  beforeEach(() => {
    delete process.env.CRYPTOCOMPARE_API_KEY;
    delete process.env.API_CONTRACT_TIMEOUT_MS;
    global.fetch = jest.fn();
  });

  test('passes when all provider contracts match the expected shape', async () => {
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createJsonResponse({
        Data: [
          { TIMESTAMP: 1741305600, CLOSE: 99000 },
          { TIMESTAMP: 1741392000, CLOSE: 100000 },
          { TIMESTAMP: 1741478400, CLOSE: 101000 }
        ]
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
      }));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-10T12:00:00.000Z') });

    expect(report.success).toBe(true);
    expect(report.results).toHaveLength(4);
    expect(report.results.every((result) => result.status === 'passed')).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(4);
    expect(apiContracts.formatMarkdownReport(report)).toContain('Overall: PASS');
  });

  test('reports failures without throwing when a provider payload drifts', async () => {
    global.fetch
      .mockResolvedValueOnce(createJsonResponse({ USD: 50000 }))
      .mockResolvedValueOnce(createJsonResponse({ BTC: { USD: 48000 } }))
      .mockResolvedValueOnce(createJsonResponse({ Data: [{ TIMESTAMP: 1741478400, CLOSE: 101000 }] }))
      .mockResolvedValueOnce(createJsonResponse({ data: [{}] }));

    const report = await apiContracts.runContractChecks({ now: new Date('2026-03-10T12:00:00.000Z') });
    const liveCoinWatchResult = report.results.find((result) => result.provider === 'LiveCoinWatch');

    expect(report.success).toBe(false);
    expect(liveCoinWatchResult.status).toBe('failed');
    expect(liveCoinWatchResult.error).toContain('rank');
    expect(apiContracts.formatMarkdownReport(report)).toContain('Overall: FAIL');
  });

  test('formats a readable console report with a fixed-width table', () => {
    const report = {
      generatedAt: '2026-03-10T12:00:00.000Z',
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
