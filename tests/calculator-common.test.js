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
