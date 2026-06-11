const { loadModule } = require('./helpers/load-module');

describe('calculator-common.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <select id="invest-currency">
        <option class="btc" min="2010-07-18">BTC</option>
        <option class="editable" min="2020-01-01">Other</option>
      </select>
      <input class="calculator-othercoins" />
      <div class="calculator-othercoins"></div>
      <input class="editable" />
      <input id="invest-date" min="" value="2019-01-01" />
      <div class="coin-error error" style="display:none"></div>
      <div class="date-error error" style="display:none"><span class="suggestedDate"></span></div>
      <div class="api-error error" style="display:none"></div>
      <div id="calculator-results" style="display:block"></div>
    `;
  });

  test('shows editable input and syncs typed value', () => {
    const calculatorCommon = loadModule('../js/calculator-common.js');
    const select = document.querySelector('#invest-currency');
    select.selectedIndex = 1;

    calculatorCommon.handleInvestCurrencyChange();
    document.querySelector('.calculator-othercoins').value = 'DOGE';
    document.querySelector('.calculator-othercoins').dispatchEvent(new KeyboardEvent('keyup'));

    expect(document.querySelector('input.calculator-othercoins').classList.contains('visible')).toBe(true);
    expect(document.querySelector('.editable').value).toBe('DOGE');
  });

  test('applies exclusive currency and date errors', () => {
    const calculatorCommon = loadModule('../js/calculator-common.js');

    calculatorCommon.handleError('currency');
    expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
    expect(document.querySelector('#invest-currency').classList.contains('input-error')).toBe(true);
    expect(document.querySelector('.calculator-othercoins').classList.contains('input-error')).toBe(false);

    document.querySelector('#invest-currency').selectedIndex = 1;
    calculatorCommon.handleInvestCurrencyChange();
    calculatorCommon.handleError('date');

    expect(document.querySelector('.date-error').classList.contains('is-visible')).toBe(true);
    expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(false);
    expect(document.querySelector('#calculator-results').classList.contains('is-visible')).toBe(false);
    expect(document.querySelector('#invest-date').classList.contains('input-error')).toBe(true);
    expect(document.querySelector('#invest-currency').classList.contains('input-error')).toBe(false);
    expect(document.querySelector('.calculator-othercoins').classList.contains('input-error')).toBe(false);
    expect(document.querySelector('.suggestedDate').textContent).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  describe('fetchCurrentPriceData', () => {
    function liveCoinWatchResponse(coins) {
      return {
        ok: true,
        json: jest.fn().mockResolvedValue({ data: coins })
      };
    }

    function cryptoCompareResponse(payload) {
      return {
        ok: true,
        json: jest.fn().mockResolvedValue(payload)
      };
    }

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    test('resolves a CryptoCompare-shaped payload from the LiveCoinWatch list', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch.mockResolvedValueOnce(liveCoinWatchResponse([
        { code: 'BTC', price: 85000 },
        { code: 'ETH', price: 2500 }
      ]));

      const data = await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');

      expect(data).toEqual({ USD: 85000 });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch.mock.calls[0][0]).toContain('http-api.livecoinwatch.com/coins');
      expect(global.fetch.mock.calls[0][0]).toContain('currency=USD');
    });

    test('maps the MIOTA preset to the IOTA code LiveCoinWatch uses', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch.mockResolvedValueOnce(liveCoinWatchResponse([
        { code: 'IOTA', price: 0.5 }
      ]));

      const data = await calculatorCommon.fetchCurrentPriceData('MIOTA', 'USD');

      expect(data).toEqual({ USD: 0.5 });
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('reuses the cached list for the same fiat and refetches for another fiat', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 85000 }]))
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 79000 }]));

      await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');
      const second = await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');
      const eur = await calculatorCommon.fetchCurrentPriceData('BTC', 'EUR');

      expect(second).toEqual({ USD: 85000 });
      expect(eur).toEqual({ EUR: 79000 });
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch.mock.calls[1][0]).toContain('currency=EUR');
    });

    test('re-fetches the price list after the freshness window expires', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      const nowSpy = jest.spyOn(Date, 'now').mockReturnValue(1000000);
      global.fetch
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 85000 }]))
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 90000 }]));

      try {
        const first = await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');
        nowSpy.mockReturnValue(1000000 + 300001);
        const second = await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');

        expect(first).toEqual({ USD: 85000 });
        expect(second).toEqual({ USD: 90000 });
        expect(global.fetch).toHaveBeenCalledTimes(2);
      } finally {
        nowSpy.mockRestore();
      }
    });

    test('falls back to the CryptoCompare proxy for coins outside the list', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 85000 }]))
        .mockResolvedValueOnce(cryptoCompareResponse({ USD: 0.07 }));

      const data = await calculatorCommon.fetchCurrentPriceData('DOGE', 'USD');

      expect(data).toEqual({ USD: 0.07 });
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(global.fetch.mock.calls[1][0]).toContain('/api/market/data/price?fsym=DOGE&tsyms=USD');
    });

    test('falls back to the CryptoCompare proxy when a listed price is not positive', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 0 }]))
        .mockResolvedValueOnce(cryptoCompareResponse({ USD: 85000 }));

      const data = await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');

      expect(data).toEqual({ USD: 85000 });
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test('falls back to the CryptoCompare proxy when LiveCoinWatch is down', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch
        .mockRejectedValueOnce(new Error('network down'))
        .mockResolvedValueOnce(cryptoCompareResponse({ USD: 85000 }));

      const data = await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');

      expect(data).toEqual({ USD: 85000 });
      expect(global.fetch.mock.calls[1][0]).toContain('/api/market/data/price');
    });

    test('does not cache a failed LiveCoinWatch response', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch
        .mockResolvedValueOnce({ ok: false, status: 500, json: jest.fn().mockResolvedValue({}) })
        .mockResolvedValueOnce(cryptoCompareResponse({ USD: 1 }))
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 85000 }]));

      await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');
      const retry = await calculatorCommon.fetchCurrentPriceData('BTC', 'USD');

      expect(retry).toEqual({ USD: 85000 });
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    test('accepts a CryptoCompare fallback payload that carries a rate-limit warning with valid data', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 85000 }]))
        .mockResolvedValueOnce(cryptoCompareResponse({
          USD: 0.07,
          Message: 'You are over your rate limit please upgrade your account!',
          HasWarning: true
        }));

      const data = await calculatorCommon.fetchCurrentPriceData('DOGE', 'USD');

      expect(data.USD).toBe(0.07);
    });

    test('rejects with an api error type when the CryptoCompare fallback returns an error payload', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch
        .mockResolvedValueOnce(liveCoinWatchResponse([{ code: 'BTC', price: 85000 }]))
        .mockResolvedValueOnce({
          ok: false,
          status: 502,
          json: jest.fn().mockResolvedValue({ error: 'Upstream market data request failed.' })
        });

      await expect(calculatorCommon.fetchCurrentPriceData('DOGE', 'USD')).rejects.toMatchObject({
        calculatorErrorType: 'api'
      });
    });
  });

  describe('fetchLiveCoinWatchHistory', () => {
    const DAY_MS = 86400000;
    const CHUNK_MS = 100 * DAY_MS;

    function historyResponse(points) {
      return {
        ok: true,
        json: jest.fn().mockResolvedValue({ history: points })
      };
    }

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    test('fetches one epoch-aligned chunk and returns a date-to-rate map', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      const chunkStart = 200 * CHUNK_MS;
      global.fetch.mockResolvedValueOnce(historyResponse([
        { date: chunkStart, rate: 100 },
        { date: chunkStart + DAY_MS, rate: 110 }
      ]));

      const bpi = await calculatorCommon.fetchLiveCoinWatchHistory('BTC', 'USD', chunkStart + DAY_MS, chunkStart + 2 * DAY_MS);

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const url = global.fetch.mock.calls[0][0];
      expect(url).toContain('/api/market/lcw/history?');
      expect(url).toContain('code=BTC');
      expect(url).toContain('currency=USD');
      expect(url).toContain('start=' + chunkStart);
      expect(url).toContain('end=' + (chunkStart + CHUNK_MS));
      expect(bpi[new Date(chunkStart).toISOString().split('T')[0]]).toBe(100);
      expect(bpi[new Date(chunkStart + DAY_MS).toISOString().split('T')[0]]).toBe(110);
    });

    test('splits long ranges into grid-aligned chunks so URLs are cache-stable', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      const chunkStart = 150 * CHUNK_MS;
      global.fetch.mockResolvedValue(historyResponse([{ date: chunkStart, rate: 100 }]));

      await calculatorCommon.fetchLiveCoinWatchHistory('BTC', 'USD', chunkStart + 5 * DAY_MS, chunkStart + 230 * DAY_MS);

      expect(global.fetch).toHaveBeenCalledTimes(3);
      const starts = global.fetch.mock.calls.map((call) => Number(new URL(call[0], 'http://localhost').searchParams.get('start')));
      expect(starts).toEqual([chunkStart, chunkStart + CHUNK_MS, chunkStart + 2 * CHUNK_MS]);
    });

    test('maps the MIOTA preset to the IOTA code', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch.mockResolvedValueOnce(historyResponse([{ date: 100 * CHUNK_MS, rate: 0.5 }]));

      await calculatorCommon.fetchLiveCoinWatchHistory('MIOTA', 'USD', 100 * CHUNK_MS, 100 * CHUNK_MS + DAY_MS);

      expect(global.fetch.mock.calls[0][0]).toContain('code=IOTA');
    });

    test('fetches only the chunks that contain needed dates', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      const chunkStart = 150 * CHUNK_MS;
      global.fetch.mockResolvedValue(historyResponse([{ date: chunkStart, rate: 100 }]));

      await calculatorCommon.fetchLiveCoinWatchHistory(
        'BTC',
        'USD',
        chunkStart,
        chunkStart + 3 * CHUNK_MS,
        [chunkStart + DAY_MS, chunkStart + 2 * CHUNK_MS + DAY_MS]
      );

      expect(global.fetch).toHaveBeenCalledTimes(2);
      const starts = global.fetch.mock.calls.map((call) => Number(new URL(call[0], 'http://localhost').searchParams.get('start')));
      expect(starts).toEqual([chunkStart, chunkStart + 2 * CHUNK_MS]);
    });

    test('limits concurrent chunk requests to four', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      let inFlight = 0;
      let peak = 0;
      global.fetch.mockImplementation(() => {
        inFlight++;
        peak = Math.max(peak, inFlight);
        return new Promise((resolve) => {
          setTimeout(() => {
            inFlight--;
            resolve(historyResponse([{ date: 100 * CHUNK_MS, rate: 100 }]));
          }, 0);
        });
      });

      await calculatorCommon.fetchLiveCoinWatchHistory('BTC', 'USD', 100 * CHUNK_MS, 100 * CHUNK_MS + 20 * CHUNK_MS);

      expect(global.fetch.mock.calls.length).toBeGreaterThanOrEqual(20);
      expect(peak).toBeLessThanOrEqual(4);
    });

    test('retries a chunk once after a 429 before giving up', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch
        .mockResolvedValueOnce({ ok: false, status: 429, json: jest.fn().mockResolvedValue({ error: 'rate' }) })
        .mockResolvedValueOnce(historyResponse([{ date: 100 * CHUNK_MS, rate: 100 }]));

      const bpi = await calculatorCommon.fetchLiveCoinWatchHistory('BTC', 'USD', 100 * CHUNK_MS, 100 * CHUNK_MS + DAY_MS);

      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(bpi[new Date(100 * CHUNK_MS).toISOString().split('T')[0]]).toBe(100);
    });

    test('rejects when a chunk keeps returning 429 after the retry', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch.mockResolvedValue({ ok: false, status: 429, json: jest.fn().mockResolvedValue({ error: 'rate' }) });

      await expect(calculatorCommon.fetchLiveCoinWatchHistory('BTC', 'USD', 100 * CHUNK_MS, 100 * CHUNK_MS + DAY_MS)).rejects.toBeTruthy();
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test('rejects when the proxy errors or no usable points come back', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch.mockResolvedValueOnce({ ok: false, status: 502, json: jest.fn().mockResolvedValue({ error: 'boom' }) });

      await expect(calculatorCommon.fetchLiveCoinWatchHistory('BTC', 'USD', 100 * CHUNK_MS, 100 * CHUNK_MS + DAY_MS)).rejects.toBeTruthy();

      global.fetch.mockResolvedValueOnce(historyResponse([]));
      await expect(calculatorCommon.fetchLiveCoinWatchHistory('BTC', 'USD', 100 * CHUNK_MS, 100 * CHUNK_MS + DAY_MS)).rejects.toBeTruthy();
    });

    test('marks a successful-but-empty response as no-data so callers can report a date error', async () => {
      const calculatorCommon = loadModule('../js/calculator-common.js');
      global.fetch.mockResolvedValueOnce(historyResponse([]));

      await expect(
        calculatorCommon.fetchLiveCoinWatchHistory('SHIB', 'EUR', 100 * CHUNK_MS, 100 * CHUNK_MS + DAY_MS)
      ).rejects.toMatchObject({ liveCoinWatchNoData: true });

      global.fetch.mockReset();
      global.fetch.mockResolvedValueOnce({ ok: false, status: 502, json: jest.fn().mockResolvedValue({}) });

      await expect(
        calculatorCommon.fetchLiveCoinWatchHistory('SHIB', 'EUR', 100 * CHUNK_MS, 100 * CHUNK_MS + DAY_MS)
      ).rejects.not.toMatchObject({ liveCoinWatchNoData: true });
    });
  });

  test('shows provider API errors without marking user inputs invalid', () => {
    const calculatorCommon = loadModule('../js/calculator-common.js');

    expect(calculatorCommon.isProviderApiError({
      Data: {},
      Err: {
        message: 'API key required',
        http_status_code: 401
      }
    })).toBe(true);

    calculatorCommon.handleError('api');

    expect(document.querySelector('.api-error').classList.contains('is-visible')).toBe(true);
    expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(false);
    expect(document.querySelector('.date-error').classList.contains('is-visible')).toBe(false);
    expect(document.querySelector('#invest-date').classList.contains('input-error')).toBe(false);
    expect(document.querySelector('#invest-currency').classList.contains('input-error')).toBe(false);
  });

  test('highlights the editable coin input for custom currency errors', () => {
    const calculatorCommon = loadModule('../js/calculator-common.js');
    const select = document.querySelector('#invest-currency');
    select.selectedIndex = 1;

    calculatorCommon.handleInvestCurrencyChange();
    calculatorCommon.handleError('currency');

    expect(document.querySelector('.coin-error').classList.contains('is-visible')).toBe(true);
    expect(document.querySelector('.calculator-othercoins').classList.contains('input-error')).toBe(true);
    expect(document.querySelector('#invest-currency').classList.contains('input-error')).toBe(false);
  });

  test('updates the minimum selectable date and can preserve later valid dates', () => {
    const calculatorCommon = loadModule('../js/calculator-common.js');
    const select = document.querySelector('#invest-currency');

    calculatorCommon.updateInputMinDate();

    expect(document.querySelector('#invest-date').min).toBe('2010-07-18');
    expect(document.querySelector('#invest-date').value).toBe('2010-07-18');

    select.options[0].selected = false;
    select.options[1].selected = true;
    document.querySelector('#invest-date').value = '2021-03-01';
    calculatorCommon.updateInputMinDate(true);

    expect(document.querySelector('#invest-date').min).toBe('2020-01-01');
    expect(document.querySelector('#invest-date').value).toBe('2021-03-01');
  });
});
