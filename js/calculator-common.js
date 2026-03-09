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
    otherCoinsInput.style.display = 'inline-block';
    otherCoinsContainer.style.display = 'inline';
    otherCoinsInput.addEventListener('keyup', syncEditableCoinInput);
  } else {
    otherCoinsInput.style.display = 'none';
    otherCoinsInput.value = '';
    otherCoinsContainer.style.display = 'none';
  }
}

function initCalculatorCommon() {
  var investCurrency = document.querySelector('#invest-currency');
  if (investCurrency) {
    investCurrency.addEventListener('change', handleInvestCurrencyChange);
  }
}


// handle errors and apply red colors
function handleError(type) {
  if (type === 'currency') {
    document.querySelector('.calculator-othercoins').classList.add('input-error');
    document.querySelector('.coin-error').style.display = 'block';
  } else {
    document.querySelector('#invest-date').classList.add('input-error');
    document.querySelector('.date-error').style.display = 'block';
    if (document.querySelector(".suggestedDate")) {
      let suggestedDate = new Date()
      suggestedDate.setDate(suggestedDate.getDate() - 1);
      document.querySelector(".suggestedDate").innerHTML = suggestedDate.toISOString().split('T')[0];  
    }
  }
  document.querySelector('#calculator-results').style.display = 'none';
  
}

// update minimum data selectable
function updateInputMinDate() {
  let min = document.querySelector('#invest-currency').selectedOptions[0].attributes.min;
  let minDate = '';
  if (min) {
    minDate = min.value;
  }
  let investDate = document.querySelector('#invest-date');
  investDate.attributes.min.value = minDate;
  if (investDate.value < minDate) {
    investDate.value = minDate;
  }
}

initCalculatorCommon();

if (typeof module !== 'undefined') {
  module.exports = {
    handleError: handleError,
    handleInvestCurrencyChange: handleInvestCurrencyChange,
    initCalculatorCommon: initCalculatorCommon,
    syncEditableCoinInput: syncEditableCoinInput,
    updateInputMinDate: updateInputMinDate
  };
}
