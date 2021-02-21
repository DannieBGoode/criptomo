init();

function calculateEarnings() {
  // var currentPrice        = parseFloat($('#sidebar-ticker-bitcoin .ticker-price').html().replace(/,/g, ''));
  var investment          = {
    date: document.getElementById("invest-date").value,
    oldValue: document.getElementById("invest-quantity").value,
    tokenSymbol: document.getElementById("invest-currency").value,
    tokenName: document.getElementById("invest-currency").options[document.getElementById("invest-currency").options.selectedIndex].innerHTML,
    fiat: document.getElementById("invest-fiat").value,
  };

  if (investment.date) {
    loading('on');
    var myDate = investment.date.split('-');
    var newDate = myDate[0] + '/' + myDate[1] + '/' + myDate[2];
    var timestamp = Math.floor(new Date(newDate).getTime() / 1000 );

    document.querySelector(".input-error") ? document.querySelector(".input-error").classList.remove("input-error") : null;
    let errors = document.getElementsByClassName('error');
    let i = 0;
    while (errors.length > i) {
       errors[i].style.display = 'none'  
       i++;
    }

    $.get('https://min-api.cryptocompare.com/data/price?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat)
      .success(function (response) {
        investment.currentPrice = response[investment.fiat];
        // bitcoin api
        if (investment.tokenSymbol === 'BTC') {
          $.get( 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + investment.date + '&end=' + investment.date + '&currency=' + investment.fiat)
            .success(function (data) {
              investment.oldPrice = JSON.parse(data).bpi[investment.date];
              paintResults(investment);
              loading('off');
            })
            .error(function () {
              handleError('date');
              loading('off');
            })
            .always(function () {
              loading('off');
            });
        } else {
          // altcoin api
          $.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat + '&ts=' + timestamp)
            .success(function (data) {
              if ((data.Response !== 'Error') && (data[investment.tokenSymbol][investment.fiat] !== 0)) {
                investment.oldPrice = data[investment.tokenSymbol][investment.fiat];
                paintResults(investment);
              } else if (data.Response === 'Error') {
                handleError('currency');
              } else {
                handleError('date');
              }
            })
            .error(function () {
              handleError('date');
            })
            .always(function () {
              loading('off');
            });
        }
      })
      .error(function (data) {
        handleError('date');
      });
  } else {
    handleError('date');
  }

  function modifyAllClassElementsText(className, text) {
    let elements = document.querySelectorAll('.' + className);
    let i = 0;
    while (elements.length > i) {
       elements[i].innerText = text;  
       i++;
    }
  }
  function modifyAllClassElementsClassName(className, newClassName) {
    let elements = document.querySelectorAll('.' + className);
    let i = 0;
    while (elements.length > i) {
       elements[i].className = newClassName;  
       i++;
    }
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
    modifyAllClassElementsText('result-date', new Date(investment.date).toShortFormat());
    modifyAllClassElementsText('result-invest', investData.oldValue + ' ' + document.getElementById('invest-fiat').value);// $('#invest-fiat').val());

    let change = '';
    modifyAllClassElementsText('gained-percentage', parseFloat(investData.percentageGained).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +  '%');
    if (investData.percentageGained > 0) {
      change = 'positive';
    } else {
      change = 'negative';
    }
    modifyAllClassElementsClassName('gained-percentage', 'gained-percentage gained-percentage-' + change);
    document.getElementById('calculator-results').style.display = 'block';
  }

  function loading(state) {
    if (state === 'on') {      
      document.querySelector('.calculator-result-container').style.display = 'none'; 
      document.querySelector('.calculator-loader-container').style.display = 'block';
    } else {
      document.querySelector('.calculator-loader-container').style.display = 'none'; 
      document.querySelector('.calculator-result-container').style.display = 'block';
    }
  }
}

function init() {
  document.getElementById('invest-date').setAttribute('max', new Date().toISOString().split('T')[0]);
}
