function syncEditableCoinInput() {
  let editText = document.querySelector('.calculator-othercoins').value;
  document.querySelector('.editable').value = editText;
  document.querySelector('.calculator-othercoins').focus();
}

function handleInvestCurrencyChange() {
  var selected = document.querySelector('#invest-currency').selectedOptions[0].classList.value;
  var otherCoinsInput = document.querySelector('.calculator-othercoins');
  var otherCoinsContainer = document.querySelector('div.calculator-othercoins');

  if (selected === 'editable') {
    otherCoinsInput.classList.add('visible');
    otherCoinsContainer.classList.add('visible');
    otherCoinsInput.addEventListener('keyup', syncEditableCoinInput);
  } else {
    otherCoinsInput.classList.remove('visible');
    otherCoinsInput.value = '';
    otherCoinsContainer.classList.remove('visible');
  }
}

function initCalculatorCommon() {
  var investCurrency = document.querySelector('#invest-currency');
  if (investCurrency) {
    investCurrency.addEventListener('change', handleInvestCurrencyChange);
  }
}

function clearCalculatorErrors() {
  Array.from(document.getElementsByClassName('input-error')).forEach(function(element) {
    element.classList.remove('input-error');
  });
  Array.from(document.getElementsByClassName('error')).forEach(function(element) {
    element.classList.remove('is-visible');
  });
}

function getCurrencyErrorTarget() {
  var investCurrency = document.querySelector('#invest-currency');
  var otherCoinsInput = document.querySelector('.calculator-othercoins');
  var selectedOption = investCurrency && investCurrency.selectedOptions ? investCurrency.selectedOptions[0] : null;

  if (otherCoinsInput && (otherCoinsInput.classList.contains('visible') || (selectedOption && selectedOption.classList.contains('editable')))) {
    return otherCoinsInput;
  }

  return investCurrency;
}

function isProviderApiError(data) {
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

function getAjaxErrorType(response) {
  var status = Number(response && response.status);

  if (Number.isFinite(status) && status >= 400) {
    return 'api';
  }

  return 'api';
}

// handle errors and apply red colors
function handleError(type) {
  clearCalculatorErrors();

  if (type === 'currency') {
    var currencyErrorTarget = getCurrencyErrorTarget();

    if (currencyErrorTarget) {
      currencyErrorTarget.classList.add('input-error');
    }
    if (document.querySelector('.coin-error')) {
      document.querySelector('.coin-error').classList.add('is-visible');
    }
  } else if (type === 'api') {
    if (document.querySelector('.api-error')) {
      document.querySelector('.api-error').classList.add('is-visible');
    }
  } else {
    if (document.querySelector('#invest-date')) {
      document.querySelector('#invest-date').classList.add('input-error');
    }
    if (document.querySelector('.date-error')) {
      document.querySelector('.date-error').classList.add('is-visible');
    }
    if (document.querySelector(".suggestedDate")) {
      let suggestedDate = new Date();
      suggestedDate.setDate(suggestedDate.getDate() - 1);
      document.querySelector(".suggestedDate").innerHTML = suggestedDate.toISOString().split('T')[0];
    }
  }
  if (document.querySelector('#calculator-results')) {
    document.querySelector('#calculator-results').classList.remove('is-visible');
  }
  
}

// update minimum data selectable
function updateInputMinDate(preserveValue) {
  let investCurrency = document.querySelector('#invest-currency');
  let investDate = document.querySelector('#invest-date');
  let minDate = '';
  let selectedOption = investCurrency && investCurrency.selectedOptions ? investCurrency.selectedOptions[0] : null;

  if (!investDate) {
    return;
  }
  if (selectedOption && selectedOption.attributes.min) {
    minDate = selectedOption.attributes.min.value;
  }

  investDate.setAttribute('min', minDate);
  if (!minDate) {
    return;
  }

  if (preserveValue === true) {
    if (!investDate.value || investDate.value < minDate) {
      investDate.value = minDate;
    }
    return;
  }

  investDate.value = minDate;
}

initCalculatorCommon();

if (typeof module !== 'undefined') {
  module.exports = {
    clearCalculatorErrors: clearCalculatorErrors,
    getAjaxErrorType: getAjaxErrorType,
    getCurrencyErrorTarget: getCurrencyErrorTarget,
    handleError: handleError,
    handleInvestCurrencyChange: handleInvestCurrencyChange,
    initCalculatorCommon: initCalculatorCommon,
    isProviderApiError: isProviderApiError,
    syncEditableCoinInput: syncEditableCoinInput,
    updateInputMinDate: updateInputMinDate
  };
}
