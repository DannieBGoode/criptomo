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
});