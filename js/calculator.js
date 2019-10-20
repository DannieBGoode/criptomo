init();

function calculateEarnings() {
  var currentPrice        = parseFloat($('#sidebar-ticker-bitcoin .ticker-price').html().replace(/,/g, ''));
  var investment          = {
    date: $('#invest-date').val(),
    oldValue: $('#invest-quantity').val(),
    tokenSymbol: $('#invest-currency').val(),
    tokenName: $( '#invest-currency option:selected' ).text(),
    fiat: $('#invest-fiat').val()
  };

  if (investment.date) {
    loading('on');
    var myDate = investment.date.split('-');
    var newDate = myDate[0] + '/' + myDate[1] + '/' + myDate[2];
    var timestamp = Math.floor(new Date(newDate).getTime() / 1000 );

    $('.input-error').removeClass('input-error');
    $('.error').hide();

    $.get('https://min-api.cryptocompare.com/data/price?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat)
      .success(function (response) {
        investment.currentPrice = response[investment.fiat];
        // bitcoin api
        if (investment.tokenSymbol === 'BTC') {
          $.get( 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + investment.date + '&end=' + investment.date + '&currency=' + investment.fiat)
            .success(function (data) {
              investment.oldPrice = JSON.parse(data).bpi[investment.date];
              paintResults(investment);
            })
            .error(function () {
              handleError('date');
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
      .error(function () {
        handleError('date');
      });
  } else {
    handleError('date');
  }

  function paintResults(investData) {
    investData.tokensBought = parseFloat(parseFloat(investData.oldValue) / parseFloat(investData.oldPrice)).toFixed(3);
    investData.currentValue = parseFloat(investData.currentPrice * investData.tokensBought).toFixed(2);
    investData.percentageGained = parseFloat((investData.currentValue - investData.oldValue) / investData.oldValue).toFixed(2) * 100;
    $('#result-tokencount').html(investData.tokensBought);
    $('#result-old-price').html(investData.oldPrice + ' ' + investData.fiat + '/' + investData.tokenSymbol);
    $('#result-tokentype1').html(investData.tokenSymbol);
    $('#result-tokentype2').html(investData.tokenSymbol);
    $('#result-currentvalue').html(investData.currentValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + investData.fiat);

    $('#result-date').html(investData.date);
    $('#result-invest').html(investData.oldValue + ' ' + $('#invest-fiat').val());


    let change = '';
    $('#gained-percentage').html(investData.percentageGained +  '%');
    if (investData.percentageGained > 0) {
      change = 'positive';
    } else {
      change = 'negative';
    }
    $('#gained-percentage').removeClass().addClass('gained-percentage-' + change);
    $('#calculator-results').show();
  }

  function loading(state) {
    if (state === 'on') {
      $('.calculator-result-container').hide();
      $('.calculator-loader-container').show();
    } else {
      $('.calculator-loader-container').hide();
      $('.calculator-result-container').show();
    }
  }
}

function init() {
  document.getElementById('invest-date').setAttribute('max', new Date().toISOString().split('T')[0]);
}
