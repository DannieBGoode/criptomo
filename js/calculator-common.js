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

// Current prices come from the keyless LiveCoinWatch list (top ranks cover every
// preset coin; IOTA trades under code IOTA there, not MIOTA). CryptoCompare's
// metered /data/price proxy only serves coins outside that list, so the
// 100-calls/month key is reserved for historical lookups and rare tickers.
var liveCoinWatchPriceListLimit = 200;
var liveCoinWatchCodeAliases = { MIOTA: 'IOTA' };
// "Current" prices must not outlive a long-open tab: re-fetch after 5 minutes
// (the same freshness window the old CryptoCompare CDN profile gave).
var liveCoinWatchPriceListTtlMs = 300000;
var liveCoinWatchPriceListCache = {};

function buildLiveCoinWatchPriceListUrl(fiat) {
  return 'https://http-api.livecoinwatch.com/coins'
    + '?offset=0&limit=' + liveCoinWatchPriceListLimit
    + '&sort=rank&order=ascending&currency=' + encodeURIComponent(fiat);
}

function lookupLiveCoinWatchPrice(coins, coin) {
  var targetCode = liveCoinWatchCodeAliases[coin] || coin;
  var list = Array.isArray(coins) ? coins : [];

  for (var i = 0; i < list.length; i++) {
    if (list[i] && list[i].code === targetCode) {
      var price = parseFloat(list[i].price);
      return Number.isFinite(price) && price > 0 ? price : null;
    }
  }

  return null;
}

function fetchLiveCoinWatchPriceList(fiat) {
  var cached = liveCoinWatchPriceListCache[fiat];
  if (cached && Date.now() - cached.fetchedAt < liveCoinWatchPriceListTtlMs) {
    return cached.request;
  }

  var request = fetch(buildLiveCoinWatchPriceListUrl(fiat))
    .then(function(response) {
      if (response.ok === false) {
        throw new Error('LiveCoinWatch returned HTTP ' + response.status);
      }
      return response.json();
    })
    .then(function(payload) {
      var coins = payload && payload.data;
      if (!Array.isArray(coins) || !coins.length) {
        throw new Error('LiveCoinWatch list is empty');
      }
      return coins;
    })
    .catch(function(error) {
      delete liveCoinWatchPriceListCache[fiat];
      throw error;
    });

  liveCoinWatchPriceListCache[fiat] = { request: request, fetchedAt: Date.now() };
  return request;
}

function fetchCryptoComparePriceData(coin, fiat) {
  return fetch('/api/market/data/price?fsym=' + encodeURIComponent(coin) + '&tsyms=' + encodeURIComponent(fiat))
    .then(function(response) {
      return response.json().then(function(data) {
        var price = parseFloat(data && data[fiat]);

        // Usable data wins: over-quota "soft serve" responses pair a
        // rate-limit Message with a valid price.
        if (Number.isFinite(price) && price > 0) {
          return data;
        }

        if (response.ok === false || isProviderApiError(data)) {
          var error = new Error('Provider API error');
          error.calculatorErrorType = 'api';
          throw error;
        }
        return data;
      });
    });
}

// Historical prices come from the official LiveCoinWatch API through the
// Netlify proxy (/api/market/lcw/history). The upstream caps every response
// at ~101 points, so ranges are split into 100-day chunks; chunk boundaries
// are aligned to a fixed epoch grid so every visitor requests identical URLs
// and Netlify's immutable CDN cache absorbs the repeats.
var liveCoinWatchHistoryDayMs = 86400000;
var liveCoinWatchHistoryChunkMs = 100 * liveCoinWatchHistoryDayMs;

// neededTimesMs is optional: when the caller only reads specific dates (a
// single purchase, yearly DCA intervals), chunks containing none of them are
// skipped — the common single-purchase case costs 1 request instead of ~21.
function buildLiveCoinWatchHistoryChunks(startMs, endMs, neededTimesMs) {
  var chunks = [];
  var firstChunkStart = Math.floor(startMs / liveCoinWatchHistoryChunkMs) * liveCoinWatchHistoryChunkMs;

  for (var chunkStart = firstChunkStart; chunkStart <= endMs; chunkStart += liveCoinWatchHistoryChunkMs) {
    chunks.push({ start: chunkStart, end: chunkStart + liveCoinWatchHistoryChunkMs });
  }

  if (Array.isArray(neededTimesMs) && neededTimesMs.length) {
    chunks = chunks.filter(function(chunk) {
      return neededTimesMs.some(function(timeMs) {
        return timeMs >= chunk.start && timeMs < chunk.end;
      });
    });
  }

  return chunks;
}

// All visitors share one upstream key through the proxy, so chunk requests
// are throttled client-side (max 4 in flight, one retry after a 429) to stay
// under LiveCoinWatch's burst rate limit even when the CDN cache is cold.
var liveCoinWatchHistoryMaxConcurrentChunks = 4;
var liveCoinWatchHistoryRetryDelayMs = 750;

function fetchLiveCoinWatchHistoryChunk(code, fiat, chunk, attempt) {
  var url = '/api/market/lcw/history'
    + '?code=' + encodeURIComponent(code)
    + '&currency=' + encodeURIComponent(fiat)
    + '&start=' + chunk.start
    + '&end=' + chunk.end;

  return fetch(url).then(function(response) {
    if (response.status === 429 && !attempt) {
      // Jittered so parallel workers that got throttled together don't all
      // retry in the same instant and trip the burst limit again.
      var retryDelay = liveCoinWatchHistoryRetryDelayMs + Math.floor(Math.random() * liveCoinWatchHistoryRetryDelayMs);
      return new Promise(function(resolve) {
        setTimeout(resolve, retryDelay);
      }).then(function() {
        return fetchLiveCoinWatchHistoryChunk(code, fiat, chunk, 1);
      });
    }

    return response.json().then(function(data) {
      var points = data && data.history;

      if (response.ok === false || !Array.isArray(points)) {
        throw new Error('LiveCoinWatch history chunk failed');
      }

      return points;
    });
  });
}

function fetchLiveCoinWatchHistoryChunks(code, fiat, chunks) {
  var pointLists = [];
  var nextIndex = 0;
  var failed = false;

  function drainQueue() {
    // Once any chunk fails the whole attempt is discarded in favor of the
    // fallback, so surviving workers stop instead of spending more quota
    // on results nobody will read.
    if (failed || nextIndex >= chunks.length) {
      return Promise.resolve();
    }

    var chunkIndex = nextIndex++;
    return fetchLiveCoinWatchHistoryChunk(code, fiat, chunks[chunkIndex]).then(function(points) {
      pointLists[chunkIndex] = points;
      return drainQueue();
    }).catch(function(error) {
      failed = true;
      throw error;
    });
  }

  var workers = [];
  var workerCount = Math.min(liveCoinWatchHistoryMaxConcurrentChunks, chunks.length);
  for (var i = 0; i < workerCount; i++) {
    workers.push(drainQueue());
  }

  return Promise.all(workers).then(function() {
    return pointLists;
  });
}

// Resolves { 'YYYY-MM-DD': rate } for the requested range (UTC milliseconds).
// Rejects when nothing usable comes back so callers can fall back to the
// metered CryptoCompare endpoints.
function fetchLiveCoinWatchHistory(coin, fiat, startMs, endMs, neededTimesMs) {
  var code = liveCoinWatchCodeAliases[coin] || coin;
  var chunks = buildLiveCoinWatchHistoryChunks(startMs, endMs, neededTimesMs);

  return fetchLiveCoinWatchHistoryChunks(code, fiat, chunks).then(function(pointLists) {
    var bpi = {};

    pointLists.forEach(function(points) {
      points.forEach(function(point) {
        var rate = point && parseFloat(point.rate);
        var timestamp = point && Number(point.date);

        if (Number.isFinite(rate) && rate > 0 && Number.isFinite(timestamp)) {
          bpi[new Date(timestamp).toISOString().split('T')[0]] = rate;
        }
      });
    });

    if (!Object.keys(bpi).length) {
      // Every chunk answered successfully with zero points: the provider is
      // up and authoritatively has no data for this coin/range (e.g. a date
      // before the coin existed). Callers use the flag to report a date
      // error instead of an API error when the fallback can't answer either.
      var error = new Error('LiveCoinWatch history is empty');
      error.liveCoinWatchNoData = true;
      throw error;
    }

    return bpi;
  });
}

// Resolves a CryptoCompare-shaped payload ({ USD: 85000 }) so every existing
// parseCurrentPriceResponse caller keeps working unchanged.
function fetchCurrentPriceData(coin, fiat) {
  return fetchLiveCoinWatchPriceList(fiat)
    .then(function(coins) {
      return lookupLiveCoinWatchPrice(coins, coin);
    })
    .catch(function() {
      return null;
    })
    .then(function(price) {
      if (price === null) {
        return fetchCryptoComparePriceData(coin, fiat);
      }
      var data = {};
      data[fiat] = price;
      return data;
    });
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
    buildLiveCoinWatchHistoryChunks: buildLiveCoinWatchHistoryChunks,
    fetchCurrentPriceData: fetchCurrentPriceData,
    fetchCryptoComparePriceData: fetchCryptoComparePriceData,
    fetchLiveCoinWatchHistory: fetchLiveCoinWatchHistory,
    fetchLiveCoinWatchPriceList: fetchLiveCoinWatchPriceList,
    lookupLiveCoinWatchPrice: lookupLiveCoinWatchPrice,
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
