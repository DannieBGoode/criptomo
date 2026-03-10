const { loadModule } = require('./helpers/load-module');
const { buildIcosDom, buildInvestDom, buildMarketcapsDom, createDataTableStub } = require('./helpers/page-builders');
const { setupGet, setupGetQueue, setupJQuery } = require('./helpers/jquery-test-env');

describe('provider edge branches', () => {
  beforeEach(() => {
    window.history.pushState({}, '', 'http://localhost/');
    window.history.replaceState = jest.fn();
    global.handleError = jest.fn();
  });

  test('invest preFill accepts valid params and ignores invalid ones', () => {
    const table = createDataTableStub();

    buildInvestDom();
    setupJQuery(table);
    setupGetQueue([
      {
        response: JSON.stringify({
          bpi: {
            '2024-01-01': 100,
            '2024-01-31': 200
          }
        })
      },
      {
        response: { EUR: 300 }
      }
    ]);
    window.history.pushState({}, '', 'http://localhost/?invest=250&currency=eur&crypto=btc&interval=30&date=2024-01-01');

    loadModule('../js/invest.js');

    expect(document.getElementById('invest-quantity').value).toBe('250');
    expect(document.getElementById('invest-fiat').value).toBe('EUR');
    expect(document.getElementById('invest-currency').value).toBe('BTC');
    expect(document.getElementById('invest-interval').value).toBe('30');
    expect($.get).toHaveBeenCalled();

    buildInvestDom();
    setupJQuery(table);
    setupGetQueue([{ response: JSON.stringify({ bpi: {} }) }]);
    window.history.pushState({}, '', 'http://localhost/?invest=250&currency=usd&crypto=eth&interval=14&date=2024-01-01');

    loadModule('../js/invest.js');

    expect(document.getElementById('invest-currency').value).toBe('BTC');
    expect($.get).not.toHaveBeenCalled();
  });

  test('invest handles historical and current price error callbacks', () => {
    let table = createDataTableStub();

    buildInvestDom();
    setupJQuery(table);
    setupGetQueue([
      {
        response: { message: 'historical failed' },
        trigger: 'error',
        invokeCallback: false
      }
    ]);

    let invest = loadModule('../js/invest.js');
    invest.calculateEarnings();

    expect(global.handleError).toHaveBeenCalledWith('date');
    expect(table.processing).toHaveBeenLastCalledWith(false);
    expect(table.rows.add).not.toHaveBeenCalled();

    global.handleError.mockClear();
    table = createDataTableStub();
    buildInvestDom();
    setupJQuery(table);
    setupGetQueue([
      {
        response: JSON.stringify({
          bpi: {
            '2024-01-01': 100,
            '2024-01-08': 200
          }
        })
      },
      {
        response: { message: 'price failed' },
        trigger: 'error',
        invokeCallback: false
      }
    ]);

    invest = loadModule('../js/invest.js');
    invest.calculateEarnings();

    expect(global.handleError).toHaveBeenCalledWith('date');
    expect(table.rows.add).not.toHaveBeenCalled();
  });

  test('marketcaps falls back cleanly when storage or row data is invalid', () => {
    const table = createDataTableStub();

    buildMarketcapsDom();
    setupJQuery(table);
    setupGet({ data: [] });
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error('blocked');
    });
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();

    const marketcaps = loadModule('../js/marketcaps.js');
    marketcaps.initMarketcapsPage();
    const columns = $.fn.DataTable.mock.calls[0][0].columns;

    expect($.get.mock.calls[$.get.mock.calls.length - 1][0]).toContain('currency=USD');
    expect(Storage.prototype.getItem).not.toHaveBeenCalled();
    expect(marketcaps.createMarketcapRow(null, 'USD')).toBeNull();
    expect(marketcaps.createMarketcapRow({
      cap: 10,
      circulating: 20,
      code: 'BTC',
      name: 'Bitcoin',
      price: 0,
      rank: 1,
      delta: { second: 0.99 }
    }, 'USD')[4].bet1000).toBe('0.00');
    expect(columns[6].render(Number.NaN, 'display')).toContain('-%');
    expect(columns[7].render(-2, 'display')).toContain('marketcaps-pricechange-negative');

    marketcaps.marketcapTableLoad('BTC');
    expect(columns[4].render({
      price: '1.0000000000',
      positiveChange: false,
      extreme: { usd: '70000', date: '2024-01-01' },
      bet1000: '1400.00'
    }, 'display')).toContain('USD');
  });

  test('icos handles invalid provider payloads and fallback render branches', () => {
    const table = createDataTableStub();

    buildIcosDom();
    setupJQuery(table);
    setupGetQueue([
      {
        response: []
      },
      {
        response: { message: 'failed' },
        trigger: 'error',
        invokeCallback: false
      }
    ]);

    const icos = loadModule('../js/icos.js');
    const columns = $.fn.DataTable.mock.calls[0][0].columns;

    icos.marketcapTableLoad();
    expect(document.querySelector('.api-error').style.display).not.toBe('none');
    expect(table.rows.add).not.toHaveBeenCalled();

    document.querySelector('.api-error').style.display = 'none';
    icos.marketcapTableLoad();
    expect(document.querySelector('.api-error').style.display).not.toBe('none');

    expect(columns[6].render('-5.000', 'display')).toContain('marketcaps-pricechange-negative');
    expect(columns[6].render('oops', 'sort')).toBe(Number.NEGATIVE_INFINITY);
    expect(icos.calculateIcoGain(100, 0)).toBe('N/A');
  });
});