function getSimulatorCoin() {
  var select = document.querySelector('#invest-currency');
  var selected = select && select.selectedOptions[0];
  if (selected && selected.classList.contains('editable')) {
    var other = document.querySelector('.calculator-othercoins');
    return other ? other.value.trim().toUpperCase() : '';
  }
  return selected ? selected.value : '';
}

function formatCurrency(amount, fiat) {
  return fiat + ' ' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPercentage(pct) {
  return (pct >= 0 ? '+' : '') + pct.toFixed(2) + '%';
}

function isSimulatorProviderApiError(data) {
  if (typeof isProviderApiError === 'function') {
    return isProviderApiError(data);
  }

  var err = data && data.Err;
  var statusCode = Number(err && (err.http_status_code || err.status || err.code));
  var message = String(
    (err && err.message) ||
    (data && (data.Message || data.message || data.error)) ||
    ''
  ).toLowerCase();

  if (err && (Number.isFinite(statusCode) ? statusCode >= 400 : true)) {
    return true;
  }

  return message.indexOf('api key') !== -1 ||
    message.indexOf('unauthorized') !== -1 ||
    message.indexOf('forbidden') !== -1 ||
    message.indexOf('rate limit') !== -1 ||
    message.indexOf('too many requests') !== -1 ||
    message.indexOf('temporarily unavailable') !== -1 ||
    message.indexOf('service unavailable') !== -1;
}

function parseSimulatorJson(response) {
  return response.json().then(function(data) {
    if (response.ok === false || isSimulatorProviderApiError(data)) {
      var error = new Error('Provider API error');
      error.calculatorErrorType = 'api';
      throw error;
    }

    return data;
  });
}

function showSimulatorError(type) {
  var apiError = document.querySelector('.api-error');
  var coinError = document.querySelector('.coin-error');

  if (apiError) {
    apiError.classList.toggle('is-visible', type === 'api');
  }
  if (coinError) {
    coinError.classList.toggle('is-visible', type !== 'api');
  }
  document.querySelector('#simulator-results').classList.remove('is-visible');
  document.querySelector('.calculator-loader-container').classList.remove('is-visible');
  document.querySelector('.calculator-result-container').classList.add('is-visible');
}

function hideSimulatorError() {
  document.querySelector('.coin-error').classList.remove('is-visible');
  if (document.querySelector('.api-error')) {
    document.querySelector('.api-error').classList.remove('is-visible');
  }
  if (document.querySelector('.calculator-othercoins')) {
    document.querySelector('.calculator-othercoins').classList.remove('input-error');
  }
}

function showSimulatorLoading() {
  document.querySelector('.calculator-loader-container').classList.add('is-visible');
  document.querySelector('.calculator-result-container').classList.remove('is-visible');
  document.querySelector('#simulator-results').classList.remove('is-visible');
  hideSimulatorError();
}

function showSimulatorResults() {
  document.querySelector('.calculator-loader-container').classList.remove('is-visible');
  document.querySelector('.calculator-result-container').classList.add('is-visible');
  document.querySelector('#simulator-results').classList.add('is-visible');
}

function paintSimulatorResults(coin, quantity, fiat, currentPrice, targetPrice) {
  var currentValue = quantity * currentPrice;
  var futureValue = quantity * targetPrice;
  var gain = futureValue - currentValue;
  var gainPct = currentValue > 0 ? ((futureValue / currentValue) - 1) * 100 : 0;

  var currentPriceLabelEl = document.querySelector('.label-current-price');
  if (currentPriceLabelEl) {
    var prefix = currentPriceLabelEl.getAttribute('data-prefix') || '';
    currentPriceLabelEl.textContent = prefix + ' 1 ' + coin;
  }

  document.querySelector('.result-coin').textContent = coin;
  document.querySelector('.result-quantity').textContent = quantity;
  document.querySelector('.result-current-price').textContent = formatCurrency(currentPrice, fiat);
  document.querySelector('.result-current-value').textContent = formatCurrency(currentValue, fiat);
  document.querySelector('.result-target-price').textContent = formatCurrency(targetPrice, fiat);
  document.querySelector('.result-future-value').textContent = formatCurrency(futureValue, fiat);
  document.querySelector('.result-gain').textContent = formatCurrency(gain, fiat);

  var gainPctEl = document.querySelector('.gained-percentage');
  gainPctEl.textContent = formatPercentage(gainPct);
  gainPctEl.className = 'gained-percentage ' + (gainPct >= 0 ? 'gained-percentage-positive' : 'gained-percentage-negative');
}

function calculateSimulator() {
  var coin = getSimulatorCoin();
  var quantityInput = document.querySelector('#invest-quantity');
  var targetPriceInput = document.querySelector('#invest-target-price');
  var fiatSelect = document.querySelector('#invest-fiat');

  var quantity = quantityInput ? parseFloat(quantityInput.value) : NaN;
  var targetPrice = targetPriceInput ? parseFloat(targetPriceInput.value) : NaN;
  var fiat = fiatSelect ? fiatSelect.value : 'USD';

  if (!coin || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(targetPrice) || targetPrice <= 0) {
    showSimulatorError();
    return;
  }

  showSimulatorLoading();

  var url = '/api/market/data/price?fsym=' + encodeURIComponent(coin) + '&tsyms=' + encodeURIComponent(fiat);

  fetch(url)
    .then(function(response) {
      return parseSimulatorJson(response);
    })
    .then(function(data) {
      if (isSimulatorProviderApiError(data)) {
        showSimulatorError('api');
        return;
      }
      if (data && data.Response === 'Error') {
        showSimulatorError();
        return;
      }
      var currentPrice = parseFloat(data && data[fiat]);
      if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
        showSimulatorError();
        return;
      }
      paintSimulatorResults(coin, quantity, fiat, currentPrice, targetPrice);
      showSimulatorResults();
    })
    .catch(function() {
      showSimulatorError('api');
    });
}

if (typeof module !== 'undefined') {
  module.exports = {
    formatCurrency: formatCurrency,
    formatPercentage: formatPercentage,
    getSimulatorCoin: getSimulatorCoin,
    isSimulatorProviderApiError: isSimulatorProviderApiError,
    paintSimulatorResults: paintSimulatorResults,
    parseSimulatorJson: parseSimulatorJson,
    showSimulatorLoading: showSimulatorLoading,
    showSimulatorResults: showSimulatorResults,
    showSimulatorError: showSimulatorError,
    hideSimulatorError: hideSimulatorError,
    calculateSimulator: calculateSimulator
  };
}
