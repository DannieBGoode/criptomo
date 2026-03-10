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
    expect(invest.buildCurrentInvestment(rows[2], 300, '2024-01-20T00:00:00.000Z')).toEqual({
      investmentValue: '1200.00',
      totalSpent: 300,
      totalCC: '4.000000',
      purchasePrice: 300,
      date: '2024-01-20T00:00:00.000Z'
    });
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

  test('invest.js computes exact DCA investment rows and summary output', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));

    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: JSON.stringify({
          Data: [
            { TIMESTAMP: new Date('2024-01-01').getTime() / 1000, CLOSE: 100 },
            { TIMESTAMP: new Date('2024-01-08').getTime() / 1000, CLOSE: 200 },
            { TIMESTAMP: new Date('2024-01-15').getTime() / 1000, CLOSE: 50 }
          ]
        })
      },
      {
        response: { USD: 300 }
      }
    ]);

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();
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

  test('invest.js reports malformed historical data instead of crashing', () => {
    buildInvestDom();
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: 'not-json'
      },
      {
        response: { USD: 300 }
      }
    ]);

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();

    expect(invest.parseHistoricalResponse('not-json')).toBeNull();
    expect(global.handleError).toHaveBeenCalledWith('date');
    expect(table.rows.add).not.toHaveBeenCalled();
  });

  test('invest.js uses CryptoCompare histoday for EUR and builds rows correctly', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));

    buildInvestDom();
    document.getElementById('invest-fiat').value = 'EUR';
    const table = createDataTableStub();
    setupJQuery(table);
    setupGetQueue([
      {
        response: JSON.stringify({
          Data: {
            Data: [
              { time: new Date('2024-01-01').getTime() / 1000, close: 90 },
              { time: new Date('2024-01-08').getTime() / 1000, close: 180 },
              { time: new Date('2024-01-15').getTime() / 1000, close: 45 }
            ]
          }
        })
      },
      {
        response: { EUR: 270 }
      }
    ]);

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();

    expect($.get).toHaveBeenCalledWith(expect.stringContaining('cryptocompare.com/data/v2/histoday'));
    expect($.get).toHaveBeenCalledWith(expect.stringContaining('tsym=EUR'));
    expect(table.rows.add).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ date: '2024-01-01', purchasePrice: 90 }),
      expect.objectContaining({ date: '2024-01-08', purchasePrice: 180 }),
      expect.objectContaining({ date: '2024-01-15', purchasePrice: 45 })
    ]));
  });

  test('invest.js reports invalid current-price payloads', () => {
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
      },
      {
        response: { EUR: 300 }
      }
    ]);

    const invest = loadModule('../js/invest.js');
    invest.calculateEarnings();

    expect(global.handleError).toHaveBeenCalledWith('date');
    expect(table.rows.add).not.toHaveBeenCalled();
  });
});