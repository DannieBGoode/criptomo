const { loadModule } = require('./helpers/load-module');
const { buildIcosDom, buildMarketcapsDom, createDataTableStub } = require('./helpers/page-builders');
const { setupGet, setupJQuery } = require('./helpers/jquery-test-env');

describe('jquery-driven page scripts', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('filters.js toggles active filter classes', () => {
    document.body.innerHTML = `
      <div id="filters"><a class="filter-active" data-filter="*"></a><a id="alt-filter" data-filter=".alt"></a></div>
      <input id="cryptocurrencies-filter-input" value="" />
      <div class="grid"></div>
    `;
    document.querySelector('.grid').scrollIntoView = jest.fn();
    setupJQuery();
    const filters = loadModule('../js/filters.js');

    filters.setActiveFilter(document.querySelector('#alt-filter'));

    expect(document.querySelector('#alt-filter').classList.contains('filter-active')).toBe(true);
  });

  test('icos.js formats values, renders gain states, and loads exact row data', () => {
    buildIcosDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGet({ BTC: { USD: 100 } });

    const icos = loadModule('../js/icos.js');
    icos.marketcapTableLoad();
    const columns = $.fn.DataTable.mock.calls[0][0].columns;

    expect(icos.generateCurrencyValueHtml('10', 'USD')).toBe('$10');
    expect(icos.calculateIcoGain(100, 0.5)).toBe('19900.000');
    expect(icos.calculateIcoGain(100, 'X')).toBe('N/A');
    expect(columns[1].render('btc', 'display')).toContain('btc.png');
    expect(columns[2].render({ symbol: 'btc', name: 'Bitcoin' }, 'filter')).toBe('btc Bitcoin');
    expect(columns[3].render(1000, 'display')).toBe('$1,000');
    expect(columns[4].render(0.5, 'display')).toBe('$0.5');
    expect(columns[5].render(100, 'display')).toBe('$100');
    expect(columns[6].render('19900.000', 'display')).toContain('marketcaps-pricechange-positive');
    expect(columns[6].render('N/A', 'display')).toContain('N/A');
    expect(table.rows.add).toHaveBeenCalledWith([
      [1, 'btc', { name: 'Bitcoin', symbol: 'btc' }, 1000, 0.5, 100, '19900.000', null]
    ]);
  });

  test('marketcaps.js formats values and loads selected currency', () => {
    buildMarketcapsDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGet({
      data: [{
        cap: 123456,
        circulating: 21000000,
        code: 'BTC',
        delta: { day: 1.02, hour: 1.01, week: 0.98, year: 1.5, second: 1.02 },
        extremes: { all: { max: { date: '2024-01-01', usd: 70000 } } },
        name: 'Bitcoin',
        price: 60000,
        rank: 1
      }]
    });
    Storage.prototype.getItem = jest.fn().mockReturnValue(null);
    Storage.prototype.setItem = jest.fn();

    const marketcaps = loadModule('../js/marketcaps.js');
    marketcaps.marketcapTableLoad('USD');

    expect(marketcaps.generateCurrencyValueHtml('10', 'EUR')).toContain('&nbsp;');
    expect(marketcaps.createMarketcapRow({
      cap: 123456,
      circulating: 21000000,
      code: 'BTC',
      delta: { day: 1.02, hour: 1.01, week: 0.98, year: 1.5, second: 1.02 },
      extremes: { all: { max: { date: '2024-01-01', usd: 70000 } } },
      name: 'Bitcoin',
      price: 60000,
      rank: 1
    }, 'USD')[4]).toEqual({
      price: '60,000.00',
      positiveChange: true,
      extreme: { date: '2024-01-01', usd: 70000 },
      bet1000: '1,166.67'
    });
    expect(table.rows.add).toHaveBeenCalledWith([
      [1, 'btc', { symbol: 'BTC', name: 'Bitcoin' }, '123,456', {
        price: '60,000.00',
        positiveChange: true,
        extreme: { date: '2024-01-01', usd: 70000 },
        bet1000: '1,166.67'
      }, '21,000,000', 1, 2, -2, 50, null]
    ]);
  });
});