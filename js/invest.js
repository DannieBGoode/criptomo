let investment = {};
var supportedPresetSymbols = ['BTC', 'ETH', 'LTC', 'MIOTA', 'XMR', 'ADA', 'XRP'];
var cryptoCompareMaxHistodayLimit = 2000;

function addDays(date, days) {
    var result = new Date(date.valueOf());
    result.setDate(result.getDate() + days);
    return result;
}

function parseDateAsUtc(dateString) {
  return new Date(dateString + 'T00:00:00Z');
}

function formatDateString(date) {
  return date.toISOString().split('T')[0];
}

function getDateDiffDays(startDate, endDate) {
  var msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((parseDateAsUtc(endDate).getTime() - parseDateAsUtc(startDate).getTime()) / msPerDay);
}

function getCryptoCompareHistodayLimit(startDate, endDate) {
  return Math.max(1, getDateDiffDays(startDate, endDate));
}

function getCryptoCompareCoverageStartDate(endDate) {
  var coverageStartDate = parseDateAsUtc(endDate);

  coverageStartDate.setUTCDate(coverageStartDate.getUTCDate() - cryptoCompareMaxHistodayLimit);
  return formatDateString(coverageStartDate);
}

function getEffectiveInvestMinDate(baseMinDate, endDate) {
  var coverageStartDate = getCryptoCompareCoverageStartDate(endDate);

  if (baseMinDate && baseMinDate > coverageStartDate) {
    return baseMinDate;
  }

  return coverageStartDate;
}

function applyInvestCoverageMinDates(endDate) {
  var investCurrency = document.getElementById('invest-currency');
  var effectiveEndDate = endDate || formatDateString(new Date());

  if (!investCurrency) {
    return '';
  }

  Array.from(investCurrency.options).forEach(function(option) {
    var baseMinDate = option.getAttribute('data-base-min');
    var currentMinDate = option.getAttribute('min');

    if (baseMinDate === null && currentMinDate !== null) {
      option.setAttribute('data-base-min', currentMinDate);
      baseMinDate = currentMinDate;
    }

    option.setAttribute('min', getEffectiveInvestMinDate(baseMinDate || '', effectiveEndDate));
  });

  return getSelectedInvestMinDate(effectiveEndDate);
}

function getSelectedInvestMinDate(endDate) {
  var investCurrency = document.getElementById('invest-currency');
  var selectedOption = investCurrency && investCurrency.selectedOptions ? investCurrency.selectedOptions[0] : null;

  if (!selectedOption) {
    return getCryptoCompareCoverageStartDate(endDate || formatDateString(new Date()));
  }

  return selectedOption.getAttribute('min') || getCryptoCompareCoverageStartDate(endDate || formatDateString(new Date()));
}

function syncInvestDateMin(preserveValue, endDate) {
  var investDate = document.getElementById('invest-date');
  var selectedMinDate;

  if (!investDate) {
    return '';
  }

  selectedMinDate = getSelectedInvestMinDate(endDate);
  investDate.setAttribute('min', selectedMinDate);

  if (preserveValue !== true || !investDate.value || investDate.value < selectedMinDate) {
    investDate.value = selectedMinDate;
  }

  return selectedMinDate;
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

function isInvestProviderApiError(data) {
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

function getInvestAjaxErrorType(response) {
  if (typeof getAjaxErrorType === 'function') {
    return getAjaxErrorType(response);
  }

  return 'api';
}

function fetchCryptoCompareInvestBpi(tokenSymbol, fiat, startDate, endDate) {
  var historicalUrl = buildCryptoCompareHistoricalUrl(tokenSymbol, fiat, startDate, endDate);

  return new Promise(function (resolve, reject) {
    $.get(historicalUrl)
      .success(function (rawData) {
        resolve(normalizeHistoricalResponse(parseHistoricalResponse(rawData)));
      })
      .error(function (response) {
        reject(response);
      });
  });
}

// The DCA walk only reads dates at the selected interval, so list them and
// let the history helper skip chunks that contain none of them (a single
// purchase needs 1 chunk, not the full range).
function buildInvestNeededTimes(startDate, endDate, selectedInterval) {
  var neededTimes = [];
  var date = parseDateAsUtc(startDate);
  var endMs = parseDateAsUtc(endDate).getTime();

  while (date.getTime() <= endMs) {
    neededTimes.push(date.getTime());
    if (!Number.isFinite(selectedInterval) || selectedInterval <= 0) {
      break;
    }
    date = addDays(date, selectedInterval);
  }

  return neededTimes;
}

function fetchInvestHistoricalBpi(tokenSymbol, fiat, startDate, endDate, selectedInterval) {
  if (typeof fetchLiveCoinWatchHistory === 'function') {
    var startMs = parseDateAsUtc(startDate).getTime();
    var endMs = parseDateAsUtc(endDate).getTime();
    var neededTimes = buildInvestNeededTimes(startDate, endDate, selectedInterval);

    return fetchLiveCoinWatchHistory(tokenSymbol, fiat, startMs, endMs, neededTimes)
      .then(function (bpi) {
        // The first purchase date is what the whole calculation hangs on;
        // if LiveCoinWatch has points but not that day (occasional gaps),
        // give CryptoCompare a chance instead of failing with a date error.
        if (!bpi[startDate]) {
          var error = new Error('LiveCoinWatch history is missing the start date');
          error.liveCoinWatchNoData = true;
          throw error;
        }
        return { error: null, bpi: bpi };
      })
      .catch(function (lcwError) {
        var lcwSaidNoData = Boolean(lcwError && lcwError.liveCoinWatchNoData);

        return fetchCryptoCompareInvestBpi(tokenSymbol, fiat, startDate, endDate)
          .then(function (result) {
            // CryptoCompare resolving with an 'api' classification (e.g.
            // its over-quota HTTP-200 error payload) means it could not
            // actually answer either — LiveCoinWatch's authoritative
            // "no data for that range" wins: date problem, not API.
            if (result && result.error === 'api' && lcwSaidNoData) {
              return { error: 'date', bpi: null };
            }
            return result;
          }, function (ccError) {
            if (lcwSaidNoData) {
              return { error: 'date', bpi: null };
            }
            throw ccError;
          });
      });
  }

  return fetchCryptoCompareInvestBpi(tokenSymbol, fiat, startDate, endDate);
}

function fetchInvestPriceData(coin, fiat) {
  if (typeof fetchCurrentPriceData === 'function') {
    return fetchCurrentPriceData(coin, fiat);
  }

  return fetch('/api/market/data/price?fsym=' + encodeURIComponent(coin) + '&tsyms=' + encodeURIComponent(fiat))
    .then(function(response) {
      return response.json();
    });
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

function buildCryptoCompareHistoricalUrl(tokenSymbol, fiat, startDate, endDate) {
  var limit = getCryptoCompareHistodayLimit(startDate, endDate);
  var toTs = Math.floor(parseDateAsUtc(endDate).getTime() / 1000);
  return '/api/market/data/v2/histoday'
    + '?fsym=' + encodeURIComponent(tokenSymbol)
    + '&tsym=' + encodeURIComponent(fiat)
    + '&limit=' + limit
    + '&toTs=' + toTs;
}

function getHistoricalEntries(data) {
  if (!data) { return null; }
  if (Array.isArray(data.Data)) { return data.Data; }
  if (data.Data && Array.isArray(data.Data.Data)) { return data.Data.Data; }
  return null;
}

function hasValue(value) {
  return value !== null && value !== undefined;
}

function getCryptoCompareHistoricalErrorType(data) {
  var message = String(data && data.Message ? data.Message : '').toLowerCase();

  if (message.indexOf('market does not exist') !== -1 || message.indexOf('no data for the symbol') !== -1) {
    return 'currency';
  }

  return 'date';
}

// Usable data wins over error classification: CryptoCompare's over-quota
// "soft serve" responses pair a rate-limit Message with perfectly valid
// candles, so only classify an error when no entries can be extracted.
function normalizeHistoricalResponse(data) {
  var entries;
  var bpi = {};

  if (!data) {
    return { error: 'date', bpi: null };
  }

  entries = getHistoricalEntries(data) || [];
  entries.forEach(function(entry) {
    var rawTimestamp = entry && (hasValue(entry.TIMESTAMP) ? entry.TIMESTAMP : (hasValue(entry.timestamp) ? entry.timestamp : entry.time));
    var rawClose = entry && (hasValue(entry.CLOSE) ? entry.CLOSE : entry.close);
    var timestamp = Number(rawTimestamp);
    var close = Number(rawClose);

    if (Number.isFinite(timestamp) && Number.isFinite(close)) {
      var dateStr = new Date(timestamp * 1000).toISOString().split('T')[0];
      bpi[dateStr] = close;
    }
  });

  if (Object.keys(bpi).length) {
    return { error: null, bpi: bpi };
  }

  if (isInvestProviderApiError(data)) {
    return { error: 'api', bpi: null };
  }
  if (data.Response === 'Error') {
    return { error: getCryptoCompareHistoricalErrorType(data), bpi: null };
  }

  return { error: 'date', bpi: null };
}

function normalizeCoindeskResponse(data) {
  var normalizedData = normalizeHistoricalResponse(data);

  if (!normalizedData || normalizedData.error) {
    return null;
  }

  return { bpi: normalizedData.bpi };
}

function isValidInterval(intervalParam) {
  return intervalParam === 9999 || intervalParam === 1 || intervalParam === 7 || intervalParam === 30 || intervalParam === 365;
}

function isSupportedPresetSymbol(tokenSymbol) {
  return supportedPresetSymbols.indexOf(tokenSymbol) !== -1;
}

function setEditableCoin(tokenSymbol) {
  var otherCoinsInput = document.querySelector('input.calculator-othercoins');
  var otherCoinsContainer = document.querySelector('div.calculator-othercoins');
  var investCurrency = document.getElementById('invest-currency');
  var editableOption = investCurrency && investCurrency.querySelector('.editable');

  if (!otherCoinsInput || !editableOption) {
    return false;
  }

  otherCoinsInput.classList.add('visible');
  if (otherCoinsContainer) {
    otherCoinsContainer.classList.add('visible');
  }
  otherCoinsInput.value = tokenSymbol;
  editableOption.value = tokenSymbol;
  Array.from(investCurrency.options).forEach(function(option) {
    option.selected = false;
  });
  editableOption.selected = true;

  return true;
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

    if (currency === 'USD' && isValidInterval(intervalParam)) {
      document.getElementById('invest-quantity').value = invest;
      document.getElementById('invest-interval').value = intervalParam;
      document.getElementById('invest-date').value = date;

      if (isSupportedPresetSymbol(token)) {
        document.getElementById('invest-currency').value = token;
      } else {
        setEditableCoin(token);
      }

      if (typeof window !== 'undefined' && typeof window.updateInputMinDate === 'function') {
        window.updateInputMinDate(true);
      } else {
        syncInvestDateMin(true, formatDateString(new Date()));
      }
      calculateEarnings();
    }
  }
}

function calculateEarnings() {
  Array.from(document.getElementsByClassName('input-error')).forEach(function(element) {
    element.classList.remove('input-error');
  });
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
      fiat: 'USD',
      today: new Date().toISOString()
  };
  var todayDate = investment.today.split('T')[0];
  var selectedMinDate;

  applyInvestCoverageMinDates(todayDate);
  selectedMinDate = getSelectedInvestMinDate(todayDate);

  if (investment.date < selectedMinDate) {
    handleError('date');
    table.processing(false);
    return;
  }

  fetchInvestHistoricalBpi(investment.tokenSymbol, investment.fiat, investment.date, todayDate, investment.selectedInterval)
    .then(function (data) {
      if (data.error) {
        handleError(data.error);
        return;
      }

      const investmentDataArray = buildInvestmentRows(data.bpi, investment);

      if (!investmentDataArray.length) {
        handleError('date');
        return;
      }

      fetchInvestPriceData(investment.tokenSymbol, investment.fiat)
        .then(function (priceData) {
          const latestResult = investmentDataArray[investmentDataArray.length - 1];
          const parsedCurrentPrice = parseCurrentPriceResponse(priceData, investment.fiat);
          const currentInvestment = buildCurrentInvestment(latestResult, parsedCurrentPrice, investment.today);

          if (!currentInvestment) {
            if (isInvestProviderApiError(priceData)) {
              handleError('api');
            } else {
              handleError(priceData && priceData.Response === 'Error' ? 'currency' : 'date');
            }
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
        .catch(function () {
          handleError('api');
        })
        .then(function () {
          table.processing( false );
        });
    })
    .catch(function (response) {
      handleError(getInvestAjaxErrorType(response));
    })
    .then(function () {
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
  var todayDate = formatDateString(new Date());

  applyInvestCoverageMinDates(todayDate);
  if (typeof window !== 'undefined' && typeof window.updateInputMinDate === 'function') {
    window.updateInputMinDate(true);
  } else {
    syncInvestDateMin(true, todayDate);
  }
  if (window.location.search) {
    preFill();
  }
}

initInvestCalculator();

if (typeof module !== 'undefined') {
  module.exports = {
    buildCoindeskHistoricalUrl: buildCryptoCompareHistoricalUrl,
    buildCryptoCompareHistoricalUrl: buildCryptoCompareHistoricalUrl,
    buildCurrentInvestment: buildCurrentInvestment,
    buildInvestmentRows: buildInvestmentRows,
    buildInvestNeededTimes: buildInvestNeededTimes,
    fetchCryptoCompareInvestBpi: fetchCryptoCompareInvestBpi,
    fetchInvestHistoricalBpi: fetchInvestHistoricalBpi,
    fetchInvestPriceData: fetchInvestPriceData,
    applyInvestCoverageMinDates: applyInvestCoverageMinDates,
    calculateEarnings: calculateEarnings,
    getCryptoCompareCoverageStartDate: getCryptoCompareCoverageStartDate,
    getCryptoCompareHistodayLimit: getCryptoCompareHistodayLimit,
    getDateDiffDays: getDateDiffDays,
    getEffectiveInvestMinDate: getEffectiveInvestMinDate,
    getInvestAjaxErrorType: getInvestAjaxErrorType,
    getSelectedInvestMinDate: getSelectedInvestMinDate,
    initInvestCalculator: initInvestCalculator,
    isValidInterval: isValidInterval,
    isInvestProviderApiError: isInvestProviderApiError,
    isSupportedPresetSymbol: isSupportedPresetSymbol,
    normalizeCoindeskResponse: normalizeCoindeskResponse,
    normalizeHistoricalResponse: normalizeHistoricalResponse,
    parseCurrentPriceResponse: parseCurrentPriceResponse,
    parseHistoricalResponse: parseHistoricalResponse,
    preFill: preFill,
    setEditableCoin: setEditableCoin,
    syncInvestDateMin: syncInvestDateMin
  };
}
