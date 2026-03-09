const { loadModule } = require('./helpers/load-module');

describe('fi.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="fi-savings-ratio" value="50" />
      <input id="fi-salary" value="120000" />
      <input id="fi-fiat" value="USD" />
      <input id="fi-investment-returns" value="7" />
      <input id="fi-method" type="checkbox" />
      <input id="fi-desired-networth" value="1000000" />
      <input id="fi-yearly-spending" value="40000" />
      <input id="fi-swr" value="4" />
      <input id="fi-age" value="30" />
      <input id="fi-accumulated" value="50000" />
      <span id="savings-ratio-text"></span>
      <span id="savings-ratio-yearly-text"></span>
      <span id="savings-ratio-monthly-text"></span>
      <span id="returns-ratio-text"></span>
      <span id="monthly-salary-text"></span>
      <span id="monthly-income-text"></span>
      <span class="currency-text"></span>
      <span class="currency-text"></span>
      <div class="active"></div>
      <div class="savings-50"></div>
      <div id="fi-results-table"><table><tbody></tbody></table></div>
      <div><input id="proxy-yearly" value="40000" /><span></span></div>
    `;
  });

  test('updates ratios and currency labels', () => {
    const fi = loadModule('../js/fi.js');

    fi.updateSavingsRatio();
    fi.updateReturnsRatio();
    fi.updateMonthlyRevenue();
    fi.updateCurrency();

    expect(document.querySelector('#savings-ratio-text').innerHTML).toBe('50');
    expect(document.querySelector('#returns-ratio-text').innerHTML).toBe('7');
    expect(document.querySelectorAll('.currency-text')[0].innerHTML).toBe('USD');
  });

  test('calculates FI rows and desired net worth', () => {
    const fi = loadModule('../js/fi.js');

    fi.updateDesiredNetworth();
    fi.calculateFI();

    expect(document.querySelector('#monthly-income-text').innerHTML).not.toBe('');
    expect(document.querySelectorAll('#fi-results-table tbody tr').length).toBeGreaterThan(0);
  });
});
