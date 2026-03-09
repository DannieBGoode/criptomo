const { loadModule } = require('./helpers/load-module');

describe('calculator-common.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <select id="invest-currency">
        <option class="btc">BTC</option>
        <option class="editable" min="2020-01-01">Other</option>
      </select>
      <input class="calculator-othercoins" />
      <div class="calculator-othercoins"></div>
      <input class="editable" />
      <input id="invest-date" min="" value="2019-01-01" />
      <div class="coin-error error" style="display:none"></div>
      <div class="date-error error" style="display:none"><span class="suggestedDate"></span></div>
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

    expect(document.querySelector('.calculator-othercoins').style.display).toBe('inline-block');
    expect(document.querySelector('.editable').value).toBe('DOGE');
  });

  test('applies currency and date errors', () => {
    const calculatorCommon = loadModule('../js/calculator-common.js');

    calculatorCommon.handleError('currency');
    expect(document.querySelector('.coin-error').style.display).toBe('block');
    expect(document.querySelector('.calculator-othercoins').classList.contains('input-error')).toBe(true);

    calculatorCommon.handleError('date');
    expect(document.querySelector('.date-error').style.display).toBe('block');
    expect(document.querySelector('#calculator-results').style.display).toBe('none');
    expect(document.querySelector('.suggestedDate').textContent).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  test('updates the minimum selectable date', () => {
    const calculatorCommon = loadModule('../js/calculator-common.js');
    const select = document.querySelector('#invest-currency');
    select.selectedIndex = 1;

    calculatorCommon.updateInputMinDate();

    expect(document.querySelector('#invest-date').min).toBe('2020-01-01');
    expect(document.querySelector('#invest-date').value).toBe('2020-01-01');
  });
});
