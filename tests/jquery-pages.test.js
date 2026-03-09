const { loadModule } = require('./helpers/load-module');
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

  test('icos.js formats values and loads rows', () => {
    document.body.innerHTML = `
      <table id="marketcaps-table"></table>
      <input id="marketcaps-filter-input" />
      <select id="marketcaps-pagelength-select"><option>100</option></select>
    `;
    global.tableDataLang = {
      general: {},
      icoColumns: {
        gains: 'Gains',
        icoPrice: 'ICO',
        name: 'Name',
        price: 'Price',
        raised: 'Raised'
      }
    };
    global.coins = {
      btc: {
        icon: 'btc.png',
        name: 'Bitcoin',
        'ico-price': '0.5',
        'ico-raised': '1000',
        website: 'https://bitcoin.org'
      }
    };
    global.iconsBaseUrl = 'https://img/';
    global.icos = ['BTC'];
    const table = {
      clear: jest.fn().mockReturnThis(),
      columns: { adjust: jest.fn() },
      draw: jest.fn().mockReturnThis(),
      processing: jest.fn().mockReturnThis(),
      responsive: { recalc: jest.fn() },
      rows: { add: jest.fn().mockReturnThis() },
      search: jest.fn().mockReturnValue({ draw: jest.fn() }),
      page: { len: jest.fn().mockReturnValue({ draw: jest.fn() }) }
    };
    setupJQuery(table);
    setupGet({ BTC: { USD: 100 } });

    const icos = loadModule('../js/icos.js');
    icos.marketcapTableLoad();

    expect(icos.generateCurrencyValueHtml('10', 'USD')).toBe('$10');
    expect(table.rows.add).toHaveBeenCalled();
  });

  test('marketcaps.js formats values and loads selected currency', () => {
    document.body.innerHTML = `
      <table id="marketcaps-table"></table>
      <input id="marketcaps-filter-input" />
      <select id="marketcaps-currency-select"><option>USD</option></select>
      <select id="marketcaps-pagelength-select"><option>100</option></select>
      <div class="api-error" style="display:none"></div>
    `;
    global.tableDataLang = {
      general: {},
      global: { today: 'Today' },
      marketcapColumns: { marketcap: 'Marketcap', name: 'Name', price: 'Price', tokens: 'Tokens' },
      priceColumns: { bet: 'Bet', date: 'Date', maximum: 'Maximum', price: 'Price' }
    };
    global.coins = {
      btc: {
        website: 'https://bitcoin.org',
        symbol: 'BTC'
      }
    };
    global.iconsBaseUrl = 'https://img/';
    global.marketcapsCoinsLimit = 1;
    Date.prototype.toShortFormat = jest.fn().mockReturnValue('1-Jan-2024');
    const table = {
      clear: jest.fn().mockReturnThis(),
      columns: { adjust: jest.fn() },
      draw: jest.fn().mockReturnThis(),
      processing: jest.fn().mockReturnThis(),
      responsive: { recalc: jest.fn() },
      rows: { add: jest.fn().mockReturnThis() },
      search: jest.fn().mockReturnValue({ draw: jest.fn() }),
      page: { len: jest.fn().mockReturnValue({ draw: jest.fn() }) }
    };
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
    expect(table.rows.add).toHaveBeenCalled();
  });
});
