function createDataTableStub() {
  return {
    clear: jest.fn().mockReturnThis(),
    columns: { adjust: jest.fn() },
    draw: jest.fn().mockReturnThis(),
    processing: jest.fn().mockReturnThis(),
    responsive: { recalc: jest.fn() },
    rows: { add: jest.fn().mockReturnThis() },
    search: jest.fn().mockReturnValue({ draw: jest.fn() }),
    page: { len: jest.fn().mockReturnValue({ draw: jest.fn() }) }
  };
}

function buildCalculatorDom() {
  document.body.innerHTML = `
    <input id="invest-date" value="2024-01-01" />
    <input id="invest-quantity" value="1000" />
    <select id="invest-currency">
      <option value="BTC" selected>Bitcoin</option>
      <option value="ETH">Ethereum</option>
      <option value="Other">Other</option>
    </select>
    <select id="invest-fiat">
      <option value="USD" selected>USD</option>
      <option value="EUR">EUR</option>
    </select>
    <div class="calculator-result-container"></div>
    <div class="calculator-loader-container"></div>
    <div id="calculator-results"></div>
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
    <div class="error date-error"><a>2024-02-02</a></div>
    <input class="calculator-othercoins" />
    <div class="calculator-othercoins"></div>
    <input class="editable" />
  `;
  document.getElementById('calculator-results').scrollIntoView = jest.fn();
}

function buildInvestDom() {
  document.body.innerHTML = `
    <table id="investment-table"></table>
    <input id="invest-date" value="2024-01-01" />
    <input id="invest-quantity" value="100" />
    <select id="invest-currency"><option value="BTC" selected>Bitcoin</option></select>
    <select id="invest-interval">
      <option value="1">1</option>
      <option value="7" selected>7</option>
      <option value="30">30</option>
      <option value="365">365</option>
      <option value="9999">9999</option>
    </select>
    <select id="invest-fiat"><option value="USD" selected>USD</option><option value="EUR">EUR</option></select>
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
}

function buildMarketcapsDom() {
  document.body.innerHTML = `
    <table id="marketcaps-table"></table>
    <input id="marketcaps-filter-input" />
    <select id="marketcaps-currency-select"><option value="USD">USD</option><option value="BTC">BTC</option></select>
    <select id="marketcaps-pagelength-select"><option value="25">25</option><option value="100">100</option></select>
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
      icon: 'btc.png',
      symbol: 'BTC',
      website: 'https://bitcoin.org'
    }
  };
  global.iconsBaseUrl = 'https://img/';
  global.marketcapsCoinsLimit = 1;
  global.toShortFormat = jest.fn().mockReturnValue('1-Jan-2024');
}

function buildIcosDom() {
  document.body.innerHTML = `
    <table id="marketcaps-table"></table>
    <input id="marketcaps-filter-input" />
    <select id="marketcaps-pagelength-select"><option>100</option></select>
    <div class="api-error" style="display:none"></div>
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
}

module.exports = {
  buildCalculatorDom: buildCalculatorDom,
  buildIcosDom: buildIcosDom,
  buildInvestDom: buildInvestDom,
  buildMarketcapsDom: buildMarketcapsDom,
  createDataTableStub: createDataTableStub
};