var firstTime = true;

function preFill () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const currencyParam = urlParams.get('currency');
  const tokenParam = urlParams.get('crypto');
  const date = urlParams.get('date');
  const parsedInvestment = parseInt(urlParams.get('invest'), 10);

  if (!Number.isNaN(parsedInvestment) && currencyParam && tokenParam && date) {
    const currency = currencyParam.toUpperCase();
    const token = tokenParam.toUpperCase();

    if ((currency === 'USD' || currency === 'EUR')) {

      if ((token === 'BTC')
       || (token === 'ETH')
       || (token === 'LTC')
       || (token === 'MIOTA')
       || (token === 'XMR')
       || (token === 'ADA')
       || (token === 'XRP')) {
        document.getElementById('invest-currency').value = token;
      } else {
        document.querySelector('input.calculator-othercoins').classList.add('visible');
        document.querySelector('div.calculator-othercoins').classList.add('visible');
        document.getElementsByClassName('calculator-othercoins ')[0].value = token;
        document.getElementById('invest-currency').getElementsByTagName('option')[document.getElementById('invest-currency').length - 1].selected = 'selected';
        let editText = document.querySelector('.calculator-othercoins').value;
        document.querySelector('.editable').value = editText;
      }
      document.getElementById('invest-quantity').value = parsedInvestment;
      document.getElementById('invest-fiat').value = currency;
      document.getElementById('invest-date').value = date;

      calculateEarnings();
    }
  }
}

function calculateEarnings() {
  var investment          = {
    date: document.getElementById("invest-date").value,
    oldValue: document.getElementById("invest-quantity").value,
    tokenSymbol: document.getElementById("invest-currency").value.replace(/\s/g, '').toUpperCase(),
    tokenName: document.getElementById("invest-currency").options[document.getElementById("invest-currency").options.selectedIndex].innerHTML,
    fiat: document.getElementById("invest-fiat").value,
  };

  if (investment.date) {
    loading('on');
    var myDate = investment.date.split('-');
    var newDate = myDate[0] + '/' + myDate[1] + '/' + myDate[2];
    var timestamp = Math.floor(new Date(newDate).getTime() / 1000 );

    document.querySelector(".input-error") ? document.querySelector(".input-error").classList.remove("input-error") : null;
    Array.from(document.getElementsByClassName('error')).forEach(el => el.classList.remove('is-visible'));

    fetch('https://min-api.cryptocompare.com/data/price?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat)
      .then(response => response.json())
      .then((response) => {
        investment.currentPrice = response[investment.fiat];
        // bitcoin api
        // if (investment.tokenSymbol === 'BTC') {
        //   fetch( 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + investment.date + '&end=' + investment.date + '&currency=' + investment.fiat)
        //     .then(data => data.json())
        //     .then((data) => {
        //       investment.oldPrice = data.bpi[investment.date];
        //       paintResults(investment);
        //       loading('off');
        //     })
        //     .catch(function () {
        //       handleError('date');
        //       loading('off');
        //     });
        // } else {
          // altcoin api
          fetch('https://min-api.cryptocompare.com/data/pricehistorical?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat + '&ts=' + timestamp)
            .then(data => data.json())
            .then((data) => {
              if ((data.Response !== 'Error') && (data[investment.tokenSymbol][investment.fiat] !== 0)) {
                investment.oldPrice = data[investment.tokenSymbol][investment.fiat];
                paintResults(investment);
              } else if (data.Response === 'Error') {
                handleError('currency');
              } else {
                handleError('date');
              }
              loading('off');
            })
            .catch(function () {
              handleError('date');
              loading('off');
            });
        // }
      })
      .catch(function () {
        handleError('date');
      });
  } else {
    handleError('date');
  }

  function modifyAllClassElementsText(className, text) {
    document.querySelectorAll('.' + className).forEach(el => { el.innerText = text; });
  }
  function modifyAllClassElementsClassName(className, newClassName) {
    document.querySelectorAll('.' + className).forEach(el => { el.className = newClassName; });
  }

  function paintResults(investData) {
    investData.tokensBought = parseFloat(parseFloat(investData.oldValue) / parseFloat(investData.oldPrice)).toFixed(3);
    investData.currentValue = parseFloat(investData.currentPrice * investData.tokensBought).toFixed(2);
    investData.percentageGained = parseFloat((investData.currentValue - investData.oldValue) / investData.oldValue).toFixed(2) * 100;
    modifyAllClassElementsText('result-tokencount', investData.tokensBought);
    modifyAllClassElementsText('result-old-price', investData.oldPrice + ' ' + investData.fiat + '/' + investData.tokenSymbol);
    modifyAllClassElementsText('result-tokentype', investData.tokenSymbol);
    modifyAllClassElementsText('result-currentvalue', investData.currentValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + investData.fiat);
    modifyAllClassElementsText('result-current-price', parseFloat(investData.currentPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + investData.fiat);
    modifyAllClassElementsText('result-date', toShortFormat(new Date(investment.date)));
    modifyAllClassElementsText('result-invest', investData.oldValue + ' ' + document.getElementById('invest-fiat').value);// $('#invest-fiat').val());

    let change = '';
    modifyAllClassElementsText('gained-percentage', parseFloat(investData.percentageGained).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +  '%');
    if (investData.percentageGained > 0) {
      change = 'positive';
    } else {
      change = 'negative';
    }
    modifyAllClassElementsClassName('gained-percentage', 'gained-percentage gained-percentage-' + change);
    document.getElementById('calculator-results').classList.add('is-visible');

    let newParams = '?invest='+ document.getElementById('invest-quantity').value 
                  + '&currency=' + document.getElementById('invest-fiat').value 
                  + '&crypto=' + document.getElementById('invest-currency').value 
                  + '&date=' + document.getElementById('invest-date').value + '';

    history.replaceState({}, null, window.location.pathname + newParams);
    document.getElementsByClassName("share-text")[0].value = window.location.href;

    if (typeof recommendArticles === 'function') {
      recommendArticles(investData.tokenSymbol);
    }

  }

  function loading(state) {
    if (state === 'on') {
      document.querySelector('.calculator-result-container').classList.add('hidden');
      document.querySelector('.calculator-loader-container').classList.add('is-loading');
    } else {
      document.querySelector('.calculator-loader-container').classList.remove('is-loading');
      document.querySelector('.calculator-result-container').classList.remove('hidden');
      if (firstTime === true) {
        document.getElementById('calculator-results').scrollIntoView({behavior: 'smooth' });
        firstTime = false;
      }
    }
  }
}

function initializeCalculatorExamples() {
  let exampleCoins = document.querySelectorAll('.error.coin-error a');
  let i;

  for (i = 0; i < exampleCoins.length; i++) {
    exampleCoins[i].addEventListener('click', function(){
      document.querySelector('.calculator-othercoins').value = this.innerText;
      document.querySelector('.editable').value = this.innerText;
      if (document.querySelector('.input-error')) {
        document.querySelector('.input-error').classList.remove('input-error');
      }
    });
  }

  let exampleDate = document.querySelectorAll('.error.date-error a');

  for (i = 0; i < exampleDate.length; i++) {
    exampleDate[i].addEventListener('click', function(){
      document.querySelector('#invest-date').value = this.innerText;
      if (document.querySelector('.input-error')) {
        document.querySelector('.input-error').classList.remove('input-error');
      }
    });
  }
}

function init() {
  let investDate = document.getElementById('invest-date');
  if (!investDate) {
    return;
  }
  investDate.setAttribute('max', new Date().toISOString().split('T')[0]);
  initializeCalculatorExamples();
  if (window.location.search) {
    preFill();
  }
}

init();

if (typeof module !== 'undefined') {
  module.exports = {
    calculateEarnings: calculateEarnings,
    init: init,
    initializeCalculatorExamples: initializeCalculatorExamples,
    preFill: preFill
  };
}
