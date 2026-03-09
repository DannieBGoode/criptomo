const { loadModule } = require('./helpers/load-module');
const { setupGet, setupJQuery } = require('./helpers/jquery-test-env');

describe('filters.js extra coverage', () => {
  test('registers click and search filtering behavior', () => {
    document.body.innerHTML = `
      <div id="filters">
        <a class="filter-active" data-filter=".alt"></a>
        <a id="all-filter" data-filter="*"></a>
      </div>
      <input id="cryptocurrencies-filter-input" value="Bit" />
      <div class="grid"></div>
      <div class="item alt"><span class="coinlist-name">Bitcoin</span><span class="weight">(1.5)</span></div>
      <div class="item defi"><span class="coinlist-name">Ethereum</span><span class="weight">(2.0)</span></div>
    `;
    document.querySelector('.grid').scrollIntoView = jest.fn();
    setupJQuery();

    const filters = loadModule('../js/filters.js');
    const gridOptions = document.querySelector('.grid').__isotopeOptions;
    document.getElementById('all-filter').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.getElementById('cryptocurrencies-filter-input').dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));

    const searchFilter = $.fn.isotope.mock.calls[$.fn.isotope.mock.calls.length - 1][0].filter;

    expect(gridOptions.getSortData.weight(document.querySelector('.item'))).toBe(1.5);
    expect($.fn.isotope).toHaveBeenCalledWith({ filter: '*' });
    expect(searchFilter.call(document.querySelector('.item.alt'))).toBe(true);
    expect(searchFilter.call(document.querySelector('.item.defi'))).toBe(false);
    expect(filters.createGrid($('.grid'))[0]).toBe(document.querySelector('.grid'));
  });
});

describe('marketcaps.js extra coverage', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <table id="marketcaps-table"></table>
      <input id="marketcaps-filter-input" />
      <select id="marketcaps-currency-select"><option value="USD">USD</option><option value="BTC">BTC</option></select>
      <select id="marketcaps-pagelength-select"><option value="25">25</option><option value="100">100</option></select>
      <div class="api-error" style="display:none"></div>
    `;
    global.tableDataLang = {
      general: {},
      marketcapColumns: { marketcap: 'Marketcap', name: 'Name', price: 'Price', tokens: 'Tokens' },
      priceColumns: { bet: 'Bet ', date: 'Date', maximum: 'Maximum', price: 'Price' }
    };
    global.coins = {
      btc: {
        icon: 'btc.png',
        symbol: 'BTC',
        website: 'https://bitcoin.org'
      }
    };
    global.iconsBaseUrl = 'https://img/';
    global.marketcapsCoinsLimit = 1;
    global.toShortFormat = jest.fn().mockReturnValue('1-Jan-2024');
    Storage.prototype.getItem = jest.fn().mockReturnValue(JSON.stringify({ currency: 'BTC' }));
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
  });

  test('formats renderer output, handles controls, and reads saved currency', () => {
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
        delta: { day: 0.98, hour: 1.01, week: 1, year: 0.5, second: 1.02 },
        extremes: { all: { max: { date: '2024-01-01', usd: 70000 } } },
        name: 'Bitcoin',
        price: 60000,
        rank: 1
      }]
    });

    const marketcaps = loadModule('../js/marketcaps.js');
    marketcaps.initMarketcapsPage();
    const columns = $.fn.DataTable.mock.calls[0][0].columns;
    const iconHtml = columns[1].render('btc', 'display');
    const nameHtml = columns[2].render({ symbol: 'BTC', name: 'Bitcoin' }, 'display');
    const filterValue = columns[2].render({ symbol: 'BTC', name: 'Bitcoin' }, 'filter');
    const maxPriceHtml = columns[4].render({
      price: '60000.00',
      positiveChange: true,
      extreme: { usd: '60000.00', date: '2024-01-01' },
      bet1000: '1000.00'
    }, 'display');
    const negativePriceHtml = columns[4].render({
      price: '50000.00',
      positiveChange: false,
      extreme: { usd: '70000.00', date: '2024-01-01' },
      bet1000: '1400.00'
    }, 'display');
    const neutralWeekHtml = columns[8].render(Number.NaN, 'display');
    const positiveDayHtml = columns[7].render(3.2, 'display');

    document.getElementById('marketcaps-filter-input').value = 'Bit';
    document.getElementById('marketcaps-filter-input').dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    document.getElementById('marketcaps-currency-select').value = 'USD';
    document.getElementById('marketcaps-currency-select').dispatchEvent(new Event('change', { bubbles: true }));
    document.getElementById('marketcaps-pagelength-select').value = '25';
    document.getElementById('marketcaps-pagelength-select').dispatchEvent(new Event('change', { bubbles: true }));

    expect($.get.mock.calls.some((call) => call[0].includes('currency=BTC'))).toBe(true);
    expect(iconHtml).toContain('btc.png');
    expect(nameHtml).toContain('https://bitcoin.org');
    expect(filterValue).toBe('BTC Bitcoin');
    expect(maxPriceHtml).toContain('MAX');
    expect(negativePriceHtml).toContain('tooltip');
    expect(neutralWeekHtml).toContain('-%');
    expect(positiveDayHtml).toContain('marketcaps-pricechange-positive');
    expect(table.search).toHaveBeenCalledWith('Bit');
    expect(Storage.prototype.setItem).toHaveBeenCalled();
    expect(table.page.len).toHaveBeenCalledWith(25);
    expect(marketcaps.generateCurrencyValueHtml('10', 'DOGE')).toBe('10&nbsp;DOGE');
  });

  test('reports localStorage unavailability when storage throws', () => {
    setupJQuery();
    setupGet({ data: [] });
    const marketcaps = loadModule('../js/marketcaps.js');
    Storage.prototype.setItem = jest.fn(() => {
      throw new Error('blocked');
    });

    expect(marketcaps.isLocalStorageAvailable()).toBe(false);
  });
});
