let investment = {};

function addDays(date, days) {
    var result = new Date(date.valueOf());
    result.setDate(result.getDate() + days);
    return result;
}

function parseHistoricalResponse(data) {
  if (!data) {
    return null;
  }

  if (typeof data === 'object') {
    return data;
  }

  try {
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

function parseCurrentPriceResponse(priceData, fiat) {
  const parsedCurrentPrice = parseFloat(priceData && priceData[fiat]);

  if (!Number.isFinite(parsedCurrentPrice)) {
    return null;
  }

  return parsedCurrentPrice;
}

function buildCurrentInvestment(latestResult, currentPrice, today) {
  if (!latestResult || !Number.isFinite(currentPrice)) {
    return null;
  }

  return {
    investmentValue: parseFloat(currentPrice * latestResult.totalCC).toFixed(2),
    totalSpent: latestResult.totalSpent,
    totalCC: latestResult.totalCC,
    purchasePrice: currentPrice,
    date: today
  };
}

function buildInvestmentRows(bpi, investmentData) {
  let results = [];
  let date = new Date(investmentData.date);
  let dateFormatted = date.toISOString().split('T')[0];
  let currentPrice;

  if (!bpi || !bpi[dateFormatted]) {
    return [];
  }

  currentPrice = bpi[dateFormatted];

  results[0] = {
      totalCC: parseFloat(investmentData.amount / bpi[dateFormatted]).toFixed(6),
      totalSpent: investmentData.amount,
      date: dateFormatted,
      purchasePrice: currentPrice
  };

  results[0].investmentValue = parseFloat(results[0].totalCC * bpi[dateFormatted]).toFixed(2);

  date = addDays(date, investmentData.selectedInterval);
  dateFormatted =  date.toISOString().split('T')[0];

  for (let resultIndex = 1; date.toISOString() < investmentData.today; resultIndex++) {
      if (bpi[dateFormatted]) {
        currentPrice = bpi[dateFormatted];
      }

      if (currentPrice) {
        results[resultIndex] = {};
        results[resultIndex].totalCC = parseFloat(parseFloat(results[resultIndex - 1].totalCC) + parseFloat(investmentData.amount / currentPrice)).toFixed(6);

        results[resultIndex].totalSpent = parseInt(results[resultIndex - 1].totalSpent) + investmentData.amount;
        results[resultIndex].investmentValue = parseFloat(results[resultIndex].totalCC * currentPrice).toFixed(2);
        results[resultIndex].purchasePrice = currentPrice;
        results[resultIndex].date = dateFormatted;
      }

      date = addDays(date, investmentData.selectedInterval);
      dateFormatted =  date.toISOString().split('T')[0];
  }

  return results;
}

function buildCryptoCompareHistoricalUrl(startDate, endDate, fiat) {
  var startMs = new Date(startDate).getTime();
  var endMs = new Date(endDate).getTime();
  var limit = Math.ceil((endMs - startMs) / (1000 * 60 * 60 * 24)) + 2;
  var toTs = Math.floor(endMs / 1000);
  return 'https://min-api.cryptocompare.com/data/v2/histoday'
    + '?fsym=BTC&tsym=' + fiat
    + '&limit=' + limit
    + '&toTs=' + toTs;
}

function normalizeCryptoCompareHistoricalResponse(data) {
  if (!data || !data.Data || !Array.isArray(data.Data.Data)) { return null; }
  var bpi = {};
  data.Data.Data.forEach(function(entry) {
    if (entry.time && entry.close) {
      var dateStr = new Date(entry.time * 1000).toISOString().split('T')[0];
      bpi[dateStr] = entry.close;
    }
  });
  return { bpi: bpi };
}

function buildCoindeskHistoricalUrl(startDate, endDate, fiat) {
  var startMs = new Date(startDate).getTime();
  var endMs = new Date(endDate).getTime();
  var limit = Math.ceil((endMs - startMs) / (1000 * 60 * 60 * 24)) + 2;
  var instrument = (fiat === 'EUR') ? 'XBX-EUR' : 'XBX-USD';
  var toTs = Math.floor(endMs / 1000);
  return 'https://data-api.coindesk.com/index/cc/v1/historical/days'
    + '?market=sda&instrument=' + instrument
    + '&limit=' + limit
    + '&groups=OHLC'
    + '&to_ts=' + toTs;
}

function getCoindeskHistoricalEntries(data) {
  if (!data) { return null; }
  if (Array.isArray(data.Data)) { return data.Data; }
  if (data.Data && Array.isArray(data.Data.Data)) { return data.Data.Data; }
  return null;
}

function normalizeCoindeskResponse(data) {
  var entries = getCoindeskHistoricalEntries(data);

  if (!entries) { return null; }

  var bpi = {};
  entries.forEach(function(entry) {
    var rawTimestamp = entry && (entry.TIMESTAMP != null ? entry.TIMESTAMP : (entry.timestamp != null ? entry.timestamp : entry.time));
    var rawClose = entry && (entry.CLOSE != null ? entry.CLOSE : entry.close);
    var timestamp = Number(rawTimestamp);
    var close = Number(rawClose);

    if (Number.isFinite(timestamp) && Number.isFinite(close)) {
      var dateStr = new Date(timestamp * 1000).toISOString().split('T')[0];
      bpi[dateStr] = close;
    }
  });
  return { bpi: bpi };
}

function isValidInterval(intervalParam) {
  return intervalParam === 9999 || intervalParam === 1 || intervalParam === 7 || intervalParam === 30 || intervalParam === 365;
}

function preFill () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const currencyParam = urlParams.get('currency');
  const tokenParam = urlParams.get('crypto');
  const intervalParam = parseInt(urlParams.get('interval'), 10);
  const date = urlParams.get('date');
  const invest = parseInt(urlParams.get('invest'), 10);

  if (!Number.isNaN(invest) && currencyParam && tokenParam && date) {
    const currency = currencyParam.toUpperCase();
    const token = tokenParam.toUpperCase();

    if ((currency === 'USD' || currency === 'EUR') && token === 'BTC' && isValidInterval(intervalParam)) {
      document.getElementById('invest-quantity').value = invest;
      document.getElementById('invest-fiat').value = currency;
      document.getElementById('invest-currency').value = token;
      document.getElementById('invest-interval').value = intervalParam;
      document.getElementById('invest-date').value = date;

      calculateEarnings();
    }
  }
}

function calculateEarnings() {
  if (document.querySelector('.input-error')) {
   document.querySelector('.input-error').classList.remove('input-error');
  }
  Array.from(document.getElementsByClassName('error')).forEach(el => el.classList.remove('is-visible'));

  document.getElementById('calculator-results').classList.remove('is-visible');
  table.clear().draw();
  table.processing(true);
  investment = {
      date: $('#invest-date').val(),
      amount: parseInt($('#invest-quantity').val()),
      tokenSymbol: $('#invest-currency').val(),
      tokenName: $('#invest-currency option:selected' ).text(),
      selectedInterval: parseInt($('#invest-interval').val()),
      fiat: $('#invest-fiat').val(),
      today: new Date().toISOString()
  };

  var isEur = investment.fiat === 'EUR';
  var historicalUrl = isEur
    ? buildCryptoCompareHistoricalUrl(investment.date, investment.today.split('T')[0], investment.fiat)
    : buildCoindeskHistoricalUrl(investment.date, investment.today.split('T')[0], investment.fiat);

  $.get(historicalUrl)
    .success(function (rawData) {
      const parsed = parseHistoricalResponse(rawData);
      const data = isEur
        ? normalizeCryptoCompareHistoricalResponse(parsed)
        : normalizeCoindeskResponse(parsed);
      const investmentDataArray = buildInvestmentRows(data && data.bpi, investment);

      if (!investmentDataArray.length) {
        handleError('date');
        return;
      }

      $.get('https://min-api.cryptocompare.com/data/price?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat)
        .success(function (priceData) {
          const latestResult = investmentDataArray[investmentDataArray.length - 1];
          const parsedCurrentPrice = parseCurrentPriceResponse(priceData, investment.fiat);
          const currentInvestment = buildCurrentInvestment(latestResult, parsedCurrentPrice, investment.today);

          if (!currentInvestment) {
            handleError('date');
            return;
          }
          investmentDataArray.push(currentInvestment);

          $('#result-tokencount').html(latestResult.totalCC.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
          $('#result-tokentype').html(investment.tokenSymbol);
          $('#result-fiat').html(investment.fiat);
          $('#result-currentvalue').html(currentInvestment.investmentValue.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
          $('#calculator-results').show();

          table.clear();
          table.rows.add( investmentDataArray );
          table.draw();
          table.columns.adjust();
          table.responsive.recalc();

          let newParams = '?invest='+ document.getElementById('invest-quantity').value 
                        + '&currency=' + document.getElementById('invest-fiat').value 
                        + '&crypto=' + document.getElementById('invest-currency').value 
                        + '&interval=' + document.getElementById('invest-interval').value 
                        + '&date=' + document.getElementById('invest-date').value + '';
          history.replaceState({}, null, window.location.pathname + newParams);
        })
        .error(function () {
          handleError('date');
        })
        .always(function () {
          table.processing( false );
        });
    })
    .error(function () {
      handleError('date');
      table.processing( false );
    })
    .always(function () {
      table.processing( false );
    });
}
 
let table = $('#investment-table').DataTable({
  responsive: true,
  pageLength: 100,
  processing: true,
  language: tableDataLang.general,
  columns: [
    { 
      responsivePriority: 1,
      data:  'date',
      title: tableDataLang.investmentColumns.date,
      render: function (data, type, row) {
        if ((data === investment.today) && (type === 'display')) {
          return '<div class="highlighted-row">' + tableDataLang.global.today + '</div>';
        }
        return '<small>' + data + '</small>';
      },
    },
    {
      responsivePriority: 4,
      data:  'totalSpent',
      title: tableDataLang.investmentColumns.totalSpent,
      render: function (data, type) {
        if ( type !== 'display' ) { return data; }
        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + '<small>' + investment.fiat + '</small>';
      },
    },
    {
      responsivePriority: 3,
      data:  'totalCC',
      title: tableDataLang.investmentColumns.totalCC,
      render: function (data, type) {
        if ( type !== 'display' ) { return data; }
        return data.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + '<small>' + investment.tokenSymbol + '</small>';
      },
    },
    {
      responsivePriority: 5,
      data:  'purchasePrice',
      title: tableDataLang.investmentColumns.purchasePrice,
      render: function (data, type) {
        if ( type !== 'display' ) { return data; }
        return parseFloat(data).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + '<small>' + investment.fiat + '/' + investment.tokenSymbol + '</small>';
      },
    },
    {
      responsivePriority: 2,
      data:  'investmentValue',
      title: tableDataLang.investmentColumns.investmentValue,
      render: function (data, type) {
        if ( type !== 'display' ) { return data; }
        return data.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + '<small>' + investment.fiat + '</small>';
      },
    }
  ]
});

function initInvestCalculator() {
  if (window.location.search) {
    preFill();
  }
}

initInvestCalculator();

if (typeof module !== 'undefined') {
  module.exports = {
    buildCoindeskHistoricalUrl: buildCoindeskHistoricalUrl,
    buildCryptoCompareHistoricalUrl: buildCryptoCompareHistoricalUrl,
    buildCurrentInvestment: buildCurrentInvestment,
    buildInvestmentRows: buildInvestmentRows,
    calculateEarnings: calculateEarnings,
    initInvestCalculator: initInvestCalculator,
    isValidInterval: isValidInterval,
    normalizeCoindeskResponse: normalizeCoindeskResponse,
    normalizeCryptoCompareHistoricalResponse: normalizeCryptoCompareHistoricalResponse,
    parseCurrentPriceResponse: parseCurrentPriceResponse,
    parseHistoricalResponse: parseHistoricalResponse,
    preFill: preFill
  };
}