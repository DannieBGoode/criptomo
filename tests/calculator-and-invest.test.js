const { loadModule } = require('./helpers/load-module');
const { setupGet, setupJQuery } = require('./helpers/jquery-test-env');

describe('calculator.js and invest.js', () => {
  beforeEach(() => {
    window.history.replaceState = jest.fn();
    global.handleError = jest.fn();
    global.recommendArticles = jest.fn();
    global.toShortFormat = jest.fn().mockReturnValue('1-Jan-2024');
  });

  test('calculator.js computes and renders earnings', async () => {
    document.body.innerHTML = `
      <input id="invest-date" value="2024-01-01" />
      <input id="invest-quantity" value="1000" />
      <select id="invest-currency"><option value="BTC" selected>Bitcoin</option></select>
      <select id="invest-fiat"><option value="USD" selected>USD</option></select>
      <div class="calculator-result-container"></div>
      <div class="calculator-loader-container" style="display:none"></div>
      <div id="calculator-results" style="display:none"></div>
      <input class="share-text" />
      <div class="result-tokencount"></div>
      <div class="result-old-price"></div>
      <div class="result-tokentype"></div>
      <div class="result-currentvalue"></div>
      <div class="result-current-price"></div>
      <div class="result-date"></div>
      <div class="result-invest"></div>
      <div class="gained-percentage"></div>
      <div class="error coin-error"><a>ETH</a></div>
      <div class="error date-error"><a>2024-01-02</a></div>
      <input class="calculator-othercoins" />
      <input class="editable" />
    `;
    document.getElementById('calculator-results').scrollIntoView = jest.fn();
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 100 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.querySelector('#calculator-results').classList.contains('is-visible')).toBe(true);
    expect(document.querySelector('.share-text').value).toContain('http://localhost/');
    expect(window.history.replaceState).toHaveBeenCalled();
    expect(global.recommendArticles).toHaveBeenCalledWith('BTC');
  });

  test('invest.js computes DCA investment rows', () => {
    document.body.innerHTML = `
      <table id="investment-table"></table>
      <input id="invest-date" value="2024-01-01" />
      <input id="invest-quantity" value="100" />
      <select id="invest-currency"><option value="BTC" selected>Bitcoin</option></select>
      <select id="invest-interval"><option value="7" selected>7</option></select>
      <select id="invest-fiat"><option value="USD" selected>USD</option></select>
      <div id="calculator-results" style="display:none"></div>
      <span id="result-tokencount"></span>
      <span id="result-tokentype"></span>
      <span id="result-fiat"></span>
      <span id="result-currentvalue"></span>
      <div class="error" style="display:none"></div>
    `;
    global.tableDataLang = {
      general: {},
      global: { today: 'Today' },
      investmentColumns: {
        date: 'Date',
        investmentValue: 'Value',
        purchasePrice: 'Price',
        totalCC: 'CC',
        totalSpent: 'Spent'
      }
    };
    const table = {
      clear: jest.fn().mockReturnThis(),
      columns: { adjust: jest.fn() },
      draw: jest.fn().mockReturnThis(),
      processing: jest.fn().mockReturnThis(),
      responsive: { recalc: jest.fn() },
      rows: { add: jest.fn().mockReturnThis() }
    };
    setupJQuery(table);
    $.get = jest.fn()
      .mockImplementationOnce(function() {
        return {
          success: function(fn) {
            fn(JSON.stringify({ bpi: { '2024-01-01': 100, '2024-01-08': 200 } }));
            return this;
          },
          error: function() { return this; },
          always: function(fn) { fn(); return this; }
        };
      })
      .mockImplementationOnce(function() {
        return {
          success: function(fn) {
            fn({ USD: 300 });
            return this;
          },
          error: function() { return this; },
          always: function(fn) { fn(); return this; }
        };
      });

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();

    expect(document.querySelector('#calculator-results').style.display).not.toBe('none');
    expect(table.rows.add).toHaveBeenCalled();
    expect(window.history.replaceState).toHaveBeenCalled();
  });
});
