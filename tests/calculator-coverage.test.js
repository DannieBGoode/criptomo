const { loadModule } = require('./helpers/load-module');
const { buildCalculatorDom } = require('./helpers/page-builders');

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('calculator.js extra coverage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', 'http://localhost/');
    buildCalculatorDom();
    window.history.replaceState = jest.fn();
    global.handleError = jest.fn();
    global.recommendArticles = jest.fn();
    global.toShortFormat = jest.fn().mockReturnValue('1-Jan-2024');
    global.fetch = jest.fn()
      .mockResolvedValue({ json: jest.fn().mockResolvedValue({ USD: 200, BTC: { USD: 100 } }) });
  });

  test('prefills supported query params and triggers calculation', async () => {
    window.history.pushState({}, '', 'http://localhost/?invest=500&currency=usd&crypto=btc&date=2024-02-01');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 100 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.preFill();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(document.getElementById('invest-currency').value).toBe('BTC');
    expect(document.getElementById('invest-quantity').value).toBe('500');
    expect(document.getElementById('invest-fiat').value).toBe('USD');
    expect(global.fetch).toHaveBeenCalled();
  });

  test('prefills unsupported token into editable input', () => {
    window.history.pushState({}, '', 'http://localhost/?invest=500&currency=eur&crypto=doge&date=2024-02-01');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ EUR: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ DOGE: { EUR: 100 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.preFill();

    expect(document.querySelector('input.calculator-othercoins').classList.contains('visible')).toBe(true);
    expect(document.querySelector('div.calculator-othercoins').classList.contains('visible')).toBe(true);
    expect(document.querySelector('.editable').value).toBe('DOGE');
  });

  test('shows date error when date is missing or historical fetch fails', async () => {
    const calculator = loadModule('../js/calculator.js');
    document.getElementById('invest-date').value = '';

    calculator.calculateEarnings();
    expect(global.handleError).toHaveBeenCalledWith('date');

    global.handleError.mockClear();
    document.getElementById('invest-date').value = '2024-01-01';
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 0 } }) });

    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('date');
  });

  test('shows currency error when historical api returns an error response', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ Response: 'Error' }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('currency');
  });

  test('marks negative returns and malformed current-price responses as errors', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 100 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 200 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(document.querySelector('.gained-percentage').className).toBe('gained-percentage gained-percentage-negative');
    expect(document.querySelector('.gained-percentage').innerText).toBe('-50.00%');
    expect(document.querySelector('.result-currentvalue').innerText).toBe('500.00 USD');

    global.handleError.mockClear();
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ EUR: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 100 } }) });

    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('currency');
  });

  test('example links update inputs and init exits cleanly without calculator date field', () => {
    const calculator = loadModule('../js/calculator.js');

    calculator.initializeCalculatorExamples();
    document.querySelector('.error.coin-error a').innerText = 'ETH';
    document.querySelector('.error.date-error a').innerText = '2024-02-02';
    document.querySelector('.error.coin-error a').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.querySelector('.error.date-error a').dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(document.querySelector('input.calculator-othercoins').value).toBe('ETH');
    expect(document.getElementById('invest-date').value).toBe('2024-02-02');

    document.body.innerHTML = '<div>No calculator here</div>';
    expect(() => calculator.init()).not.toThrow();
  });
});