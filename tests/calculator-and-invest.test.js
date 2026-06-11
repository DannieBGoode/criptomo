const { loadModule } = require('./helpers/load-module');
const { buildCalculatorDom, buildInvestDom, createDataTableStub } = require('./helpers/page-builders');
const { setupGetQueue, setupJQuery } = require('./helpers/jquery-test-env');

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function readText(selector) {
  const element = document.querySelector(selector);
  return element.innerText || element.textContent;
}

describe('calculator.js and invest.js', () => {
  beforeEach(() => {
    window.history.pushState({}, '', 'http://localhost/');
    window.history.replaceState = jest.fn();
    global.handleError = jest.fn();
    global.recommendArticles = jest.fn();
    global.toShortFormat = jest.fn().mockReturnValue('1-Jan-2024');
  });

  afterEach(() => {
    jest.useRealTimers();
    delete global.fetchCurrentPriceData;
    delete global.fetchLiveCoinWatchHistory;
  });

  test('calculator.js pure helpers normalize provider payloads and compute results', () => {
    document.body.innerHTML = '';

    const calculator = loadModule('../js/calculator.js');

    expect(calculator.parseCurrentPriceResponse({ USD: '200' }, 'USD')).toBe(200);
    expect(calculator.parseCurrentPriceResponse({ EUR: 200 }, 'USD')).toBeNull();
    expect(calculator.parseHistoricalPriceResponse({ Response: 'Error' }, 'BTC', 'USD')).toEqual({
      error: 'currency',
      price: null
    });
    expect(calculator.parseHistoricalPriceResponse({
      Data: {},
      Err: {
        message: 'API key required',
        http_status_code: 401
      }
    }, 'BTC', 'USD')).toEqual({
      error: 'api',
      price: null
    });
    expect(calculator.parseHistoricalPriceResponse({ BTC: { USD: '100' } }, 'BTC', 'USD')).toEqual({
      error: null,
      price: 100
    });
    expect(calculator.calculateInvestmentResults('1000', 100, 200)).toEqual({
      currentValue: '2000.00',
      percentageGained: 100,
      tokensBought: '10.000'
    });
  });

  test('invest.js pure helpers build rows across sparse history', () => {
    buildInvestDom();
    setupJQuery(createDataTableStub());

    const invest = loadModule('../js/invest.js');
    const rows = invest.buildInvestmentRows({
      '2024-01-01': 100,
      '2024-01-15': 50
    }, {
      amount: 100,
      date: '2024-01-01',
      selectedInterval: 7,
      today: '2024-01-20T00:00:00.000Z'
    });

    expect(invest.isValidInterval(7)).toBe(true);
    expect(invest.isValidInterval(14)).toBe(false);
    expect(invest.isSupportedPresetSymbol('ETH')).toBe(true);
    expect(invest.isSupportedPresetSymbol('DOGE')).toBe(false);
    expect(rows).toEqual([
      {
        totalCC: '1.000000',
        totalSpent: 100,
        date: '2024-01-01',
        purchasePrice: 100,
        investmentValue: '100.00'
      },
      {
        totalCC: '2.000000',
        totalSpent: 200,
        date: '2024-01-08',
        purchasePrice: 100,
        investmentValue: '200.00'
      },
      {
        totalCC: '4.000000',
        totalSpent: 300,
        date: '2024-01-15',
        purchasePrice: 50,
        investmentValue: '200.00'
      }
    ]);
    expect(invest.parseCurrentPriceResponse({ EUR: 300 }, 'USD')).toBeNull();
    expect(invest.parseHistoricalResponse({ Data: [] })).toEqual({ Data: [] });
    expect(invest.getDateDiffDays('2024-01-01', '2024-01-10')).toBe(9);
    expect(invest.getCryptoCompareHistodayLimit('2024-01-01', '2024-01-10')).toBe(9);
    expect(invest.getCryptoCompareCoverageStartDate('2026-03-17')).toBe('2020-09-24');
    expect(invest.getEffectiveInvestMinDate('2017-10-01', '2026-03-17')).toBe('2020-09-24');
    expect(invest.normalizeHistoricalResponse({
      Data: {
        Data: [
          { timestamp: new Date('2024-01-22').getTime() / 1000, close: 75 }
        ]
      }
    })).toEqual({
      error: null,
      bpi: {
        '2024-01-22': 75
      }
    });
    expect(invest.normalizeHistoricalResponse({
      Response: 'Success',
      Message: 'You are over your rate limit please upgrade your account!',
      HasWarning: true,
      Type: 101,
      Data: {
        Data: [
          { time: new Date('2024-01-22').getTime() / 1000, close: 75 }
        ]
      }
    })).toEqual({
      error: null,
      bpi: {
        '2024-01-22': 75
      }
    });
    expect(invest.normalizeHistoricalResponse({
      Response: 'Error',
      Message: 'limit is larger than max value.'
    })).toEqual({
      error: 'date',
      bpi: null
    });
    expect(invest.normalizeHistoricalResponse({
      Response: 'Error',
      Message: 'CCCAGG market does not exist for this coin pair (UNKNOWN-USD)'
    })).toEqual({
      error: 'currency',
      bpi: null
    });
    expect(invest.normalizeHistoricalResponse({
      Data: {},
      Err: {
        message: 'API key required',
        http_status_code: 401
      }
    })).toEqual({
      error: 'api',
      bpi: null
    });
    expect(invest.buildCryptoCompareHistoricalUrl('ETH', 'USD', '2024-01-01', '2024-01-10')).toContain('/data/v2/histoday');
    expect(invest.buildCryptoCompareHistoricalUrl('ETH', 'USD', '2024-01-01', '2024-01-10')).toContain('limit=9');
    expect(invest.setEditableCoin('DOGE')).toBe(true);
    expect(document.querySelector('input.calculator-othercoins').value).toBe('DOGE');
    expect(document.querySelector('#invest-currency .editable').value).toBe('DOGE');
    expect(invest.buildCurrentInvestment(rows[2], 300, '2024-01-20T00:00:00.000Z')).toEqual({
      investmentValue: '1200.00',
      totalSpent: 300,
      totalCC: '4.000000',
      purchasePrice: 300,
      date: '2024-01-20T00:00:00.000Z'
    });
  });

  test('invest.js clamps the default date to the current API coverage floor', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-17T12:00:00.000Z'));

    buildInvestDom();
    document.getElementById('invest-date').value = '2014-12-10';
    setupJQuery(createDataTableStub());

    loadModule('../js/invest.js');

    expect(document.getElementById('invest-date').min).toBe('2020-09-24');
    expect(document.getElementById('invest-date').value).toBe('2020-09-24');
    expect(document.querySelector('#invest-currency option[value="BTC"]').getAttribute('min')).toBe('2020-09-24');
    expect(document.querySelector('#invest-currency option[value="ADA"]').getAttribute('min')).toBe('2020-09-24');
  });

  test('calculator.js computes exact earnings outputs', async () => {
    buildCalculatorDom();
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 100 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(readText('.result-tokencount')).toBe('10.000');
    expect(readText('.result-old-price')).toBe('100 USD/BTC');
    expect(readText('.result-currentvalue')).toBe('2,000.00 USD');
    expect(readText('.result-current-price')).toBe('200.00 USD');
    expect(readText('.result-date')).toBe('1-Jan-2024');
    expect(readText('.result-invest')).toBe('1000 USD');
    expect(readText('.gained-percentage')).toBe('100.00%');
    expect(document.querySelector('.gained-percentage').className).toBe('gained-percentage gained-percentage-positive');
    expect(document.querySelector('#calculator-results').classList.contains('is-visible')).toBe(true);
    expect(document.querySelector('.share-text').value).toContain('http://localhost/');
    expect(window.history.replaceState).toHaveBeenCalled();
    expect(global.recommendArticles).toHaveBeenCalledWith('BTC');
  });

  test('calculator.js takes the historical price from LiveCoinWatch when the helper is loaded', async () => {
    buildCalculatorDom();
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) });
    global.fetchLiveCoinWatchHistory = jest.fn().mockResolvedValue({ '2024-01-01': 100 });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(global.fetchLiveCoinWatchHistory).toHaveBeenCalledWith(
      'BTC',
      'USD',
      Date.parse('2024-01-01T00:00:00Z'),
      Date.parse('2024-01-01T00:00:00Z') + 86399999
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch.mock.calls[0][0]).not.toContain('pricehistorical');
    expect(readText('.result-tokencount')).toBe('10.000');
    expect(document.querySelector('#calculator-results').classList.contains('is-visible')).toBe(true);
  });

  test('calculator.js reports a date error when no provider has data for the date', async () => {
    buildCalculatorDom();
    const noData = new Error('LiveCoinWatch history is empty');
    noData.liveCoinWatchNoData = true;
    global.fetchLiveCoinWatchHistory = jest.fn().mockRejectedValue(noData);
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ ok: false, status: 401, json: jest.fn().mockResolvedValue({ Err: { message: 'API key required', http_status_code: 401 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('date');
    expect(global.handleError).not.toHaveBeenCalledWith('api');
  });

  test('invest.js reports a date error when no provider has data for the range', async () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: { message: 'over quota' },
        trigger: 'error',
        invokeCallback: false
      }
    ]);
    const noData = new Error('LiveCoinWatch history is empty');
    noData.liveCoinWatchNoData = true;
    global.fetchLiveCoinWatchHistory = jest.fn().mockRejectedValue(noData);

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('date');
    expect(global.handleError).not.toHaveBeenCalledWith('api');
    expect(table.rows.add).not.toHaveBeenCalled();
  });

  test('calculator.js serves rate-limited responses that still contain valid data', async () => {
    buildCalculatorDom();
    const softServeWarning = 'You are over your rate limit please upgrade your account!';
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200, Message: softServeWarning, HasWarning: true }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 100 }, Message: softServeWarning, HasWarning: true }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(global.handleError).not.toHaveBeenCalled();
    expect(readText('.result-tokencount')).toBe('10.000');
    expect(document.querySelector('#calculator-results').classList.contains('is-visible')).toBe(true);

    expect(calculator.parseHistoricalPriceResponse({
      BTC: { USD: 30000 },
      Message: softServeWarning,
      HasWarning: true
    }, 'BTC', 'USD')).toEqual({ error: null, price: 30000 });
  });

  test('invest.js computes exact DCA investment rows and summary output', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));

    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: {
          Data: [
            { TIMESTAMP: new Date('2024-01-01').getTime() / 1000, CLOSE: 100 },
            { TIMESTAMP: new Date('2024-01-08').getTime() / 1000, CLOSE: 200 },
            { TIMESTAMP: new Date('2024-01-15').getTime() / 1000, CLOSE: 50 }
          ]
        }
      }
    ]);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ USD: 300 })
    });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await jest.advanceTimersByTimeAsync(0);
    const columns = $.fn.DataTable.mock.calls[0][0].columns;

    expect(document.querySelector('#calculator-results').style.display).not.toBe('none');
    expect(document.querySelector('#result-tokencount').innerHTML).toBe('3.500000');
    expect(document.querySelector('#result-currentvalue').innerHTML).toBe('1,050.00');
    expect(columns[0].render('2024-01-15T12:00:00.000Z', 'display')).toContain('Today');
    expect(columns[1].render(300, 'display')).toContain('USD');
    expect(columns[2].render('3.500000', 'display')).toContain('BTC');
    expect(columns[3].render(300, 'display')).toContain('USD/BTC');
    expect(columns[4].render('1050.00', 'display')).toContain('USD');
    expect(window.history.replaceState).toHaveBeenCalled();
    expect(table.rows.add).toHaveBeenCalledWith([
      {
        totalCC: '1.000000',
        totalSpent: 100,
        date: '2024-01-01',
        purchasePrice: 100,
        investmentValue: '100.00'
      },
      {
        totalCC: '1.500000',
        totalSpent: 200,
        investmentValue: '300.00',
        purchasePrice: 200,
        date: '2024-01-08'
      },
      {
        totalCC: '3.500000',
        totalSpent: 300,
        investmentValue: '175.00',
        purchasePrice: 50,
        date: '2024-01-15'
      },
      {
        investmentValue: '1050.00',
        totalSpent: 300,
        totalCC: '3.500000',
        purchasePrice: 300,
        date: '2024-01-15T12:00:00.000Z'
      }
    ]);
  });

  test('invest.js reports malformed historical data instead of crashing', async () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: 'not-json'
      }
    ]);

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    expect(invest.parseHistoricalResponse('not-json')).toBeNull();
    expect(global.handleError).toHaveBeenCalledWith('date');
    expect(table.rows.add).not.toHaveBeenCalled();
  });

  test('invest.js uses CryptoCompare histoday for non-BTC assets and builds rows correctly', async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));

    buildInvestDom();
    document.getElementById('invest-currency').value = 'ETH';
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: {
          Data: {
            Data: [
              { time: new Date('2024-01-01').getTime() / 1000, close: 90 },
              { time: new Date('2024-01-08').getTime() / 1000, close: 180 },
              { time: new Date('2024-01-15').getTime() / 1000, close: 45 }
            ]
          }
        }
      }
    ]);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ USD: 270 })
    });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await jest.advanceTimersByTimeAsync(0);

    expect($.get).toHaveBeenCalledWith(expect.stringContaining('/api/market/data/v2/histoday'));
    expect($.get).toHaveBeenCalledWith(expect.stringContaining('fsym=ETH'));
    expect($.get).toHaveBeenCalledWith(expect.stringContaining('tsym=USD'));
    expect(table.rows.add).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ date: '2024-01-01', purchasePrice: 90 }),
      expect.objectContaining({ date: '2024-01-08', purchasePrice: 180 }),
      expect.objectContaining({ date: '2024-01-15', purchasePrice: 45 })
    ]));
  });

  test('invest.js reports invalid current-price payloads', async () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: JSON.stringify({
          Data: [
            { TIMESTAMP: new Date('2024-01-01').getTime() / 1000, CLOSE: 100 },
            { TIMESTAMP: new Date('2024-01-08').getTime() / 1000, CLOSE: 200 }
          ]
        })
      }
    ]);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ EUR: 300 })
    });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('date');
    expect(table.rows.add).not.toHaveBeenCalled();
  });

  test('invest.js builds rows from LiveCoinWatch history without touching CryptoCompare', async () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([]);
    global.fetchLiveCoinWatchHistory = jest.fn().mockResolvedValue({
      '2024-01-01': 100,
      '2024-01-08': 200
    });
    global.fetchCurrentPriceData = jest.fn().mockResolvedValue({ USD: 300 });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    expect(global.fetchLiveCoinWatchHistory).toHaveBeenCalledWith(
      'BTC',
      'USD',
      Date.parse('2024-01-01T00:00:00Z'),
      expect.any(Number),
      expect.arrayContaining([Date.parse('2024-01-01T00:00:00Z')])
    );
    expect($.get).not.toHaveBeenCalled();
    expect(table.rows.add).toHaveBeenCalled();
  });

  test('invest.js requests only the purchase date for single-purchase calculations', async () => {
    buildInvestDom();
    document.getElementById('invest-interval').value = '9999';
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([]);
    global.fetchLiveCoinWatchHistory = jest.fn().mockResolvedValue({ '2024-01-01': 100 });
    global.fetchCurrentPriceData = jest.fn().mockResolvedValue({ USD: 300 });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    const neededTimes = global.fetchLiveCoinWatchHistory.mock.calls[0][4];
    expect(neededTimes).toEqual([Date.parse('2024-01-01T00:00:00Z')]);
    expect(table.rows.add).toHaveBeenCalled();
  });

  test('invest.js falls back to CryptoCompare when LiveCoinWatch lacks the start date', async () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: {
          Data: [
            { TIMESTAMP: new Date('2024-01-01').getTime() / 1000, CLOSE: 100 },
            { TIMESTAMP: new Date('2024-01-08').getTime() / 1000, CLOSE: 200 }
          ]
        }
      }
    ]);
    global.fetchLiveCoinWatchHistory = jest.fn().mockResolvedValue({ '2024-01-08': 200 });
    global.fetchCurrentPriceData = jest.fn().mockResolvedValue({ USD: 300 });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    expect($.get).toHaveBeenCalledWith(expect.stringContaining('/api/market/data/v2/histoday'));
    expect(table.rows.add).toHaveBeenCalled();
    expect(global.handleError).not.toHaveBeenCalled();
  });

  test('invest.js falls back to CryptoCompare histoday when LiveCoinWatch history fails', async () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: {
          Data: [
            { TIMESTAMP: new Date('2024-01-01').getTime() / 1000, CLOSE: 100 },
            { TIMESTAMP: new Date('2024-01-08').getTime() / 1000, CLOSE: 200 }
          ]
        }
      }
    ]);
    global.fetchLiveCoinWatchHistory = jest.fn().mockRejectedValue(new Error('lcw down'));
    global.fetchCurrentPriceData = jest.fn().mockResolvedValue({ USD: 300 });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    expect($.get).toHaveBeenCalledWith(expect.stringContaining('/api/market/data/v2/histoday'));
    expect(table.rows.add).toHaveBeenCalled();
  });

  test('invest.js prefers the shared fetchCurrentPriceData helper for the current price', async () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: {
          Data: [
            { TIMESTAMP: new Date('2024-01-01').getTime() / 1000, CLOSE: 100 },
            { TIMESTAMP: new Date('2024-01-08').getTime() / 1000, CLOSE: 200 }
          ]
        }
      }
    ]);
    global.fetch = jest.fn();
    global.fetchCurrentPriceData = jest.fn().mockResolvedValue({ USD: 300 });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    expect(global.fetchCurrentPriceData).toHaveBeenCalledWith('BTC', 'USD');
    expect(global.fetch).not.toHaveBeenCalled();
    expect(table.rows.add).toHaveBeenCalled();
  });

  test('invest.js reports provider API failures separately from date coverage', async () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: {
          Data: {},
          Err: {
            message: 'API key required',
            http_status_code: 401
          }
        }
      }
    ]);

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('api');
    expect(table.rows.add).not.toHaveBeenCalled();
  });

  test('invest.js treats manually entered dates before the API coverage floor as date errors', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-03-17T12:00:00.000Z'));

    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([{ response: {} }]);
    const invest = loadModule('../js/invest.js');

    document.getElementById('invest-date').value = '2020-09-23';
    global.handleError.mockClear();
    $.get.mockClear();

    invest.calculateEarnings();

    expect(global.handleError).toHaveBeenCalledWith('date');
    expect($.get).not.toHaveBeenCalled();
    expect(table.processing).toHaveBeenLastCalledWith(false);
  });
});
