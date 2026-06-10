var firstTime = true;
var scriptLoaders = {};

function getCalculatorBlock() {
  return document.querySelector('.calculator-block');
}

function getCalculatorDataAttribute(attributeName) {
  var calculatorBlock = getCalculatorBlock();

  if (!calculatorBlock) {
    return '';
  }

  return calculatorBlock.getAttribute(attributeName) || '';
}

function loadScriptOnce(scriptUrl) {
  var scriptParent;

  if (!scriptUrl) {
    return Promise.resolve(false);
  }

  if (scriptLoaders[scriptUrl]) {
    return scriptLoaders[scriptUrl];
  }

  scriptParent = document.body || document.head || document.documentElement;
  scriptLoaders[scriptUrl] = new Promise(function(resolve, reject) {
    var existingScript = document.querySelector('script[src="' + scriptUrl + '"]');
    var script = existingScript || document.createElement('script');

    function handleLoad() {
      resolve(true);
    }

    function handleError() {
      reject(new Error('Unable to load script: ' + scriptUrl));
    }

    if (existingScript) {
      resolve(true);
      return;
    }

    script.async = true;
    script.onload = handleLoad;
    script.onerror = handleError;
    script.src = scriptUrl;
    scriptParent.appendChild(script);
  });

  return scriptLoaders[scriptUrl];
}

function parseCurrentPriceResponse(response, fiat) {
  const currentPrice = parseFloat(response && response[fiat]);

  if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
    return null;
  }

  return currentPrice;
}

function parseHistoricalPriceResponse(data, tokenSymbol, fiat) {
  if (data && data.Response === 'Error') {
    return { error: 'currency', price: null };
  }

  const tokenHistory = data && data[tokenSymbol];
  const historicalPrice = parseFloat(tokenHistory && tokenHistory[fiat]);

  if (!Number.isFinite(historicalPrice) || historicalPrice === 0) {
    return { error: 'date', price: null };
  }

  return { error: null, price: historicalPrice };
}

function calculateInvestmentResults(oldValue, oldPrice, currentPrice) {
  const tokensBought = parseFloat(parseFloat(oldValue) / parseFloat(oldPrice)).toFixed(3);
  const currentValue = parseFloat(currentPrice * tokensBought).toFixed(2);
  const percentageGained = parseFloat((currentValue - oldValue) / oldValue).toFixed(2) * 100;

  return {
    currentValue: currentValue,
    percentageGained: percentageGained,
    tokensBought: tokensBought
  };
}

function loadRecommendationArticles(tokenSymbol) {
  var recommendationsScriptUrl = getCalculatorDataAttribute('data-recommendations-script');

  if (typeof recommendArticles === 'function') {
    recommendArticles(tokenSymbol);
    return Promise.resolve(true);
  }

  if (!recommendationsScriptUrl) {
    return Promise.resolve(false);
  }

  return loadScriptOnce(recommendationsScriptUrl)
    .then(function() {
      if (typeof recommendArticles === 'function') {
        recommendArticles(tokenSymbol);
      }

      return true;
    })
    .catch(function() {
      return false;
    });
}

function fallbackCopyText(text) {
  var textArea = document.createElement('textarea');

  textArea.value = text;
  textArea.style.cssText = 'position:fixed;opacity:0;top:0;left:0;pointer-events:none';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (error) {
    // Ignore unsupported legacy copy failures.
  }

  document.body.removeChild(textArea);
}

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(function() {
      fallbackCopyText(text);
    });
  }

  fallbackCopyText(text);
  return Promise.resolve();
}

function copyShareText(button) {
  var field = button.closest('.field');
  var input = field ? field.querySelector('.share-text') : null;
  var copyLabel = button.getAttribute('data-copy-label') || button.textContent;
  var copiedLabel = button.getAttribute('data-copied-label') || copyLabel;

  if (!field || !input) {
    return Promise.resolve(false);
  }

  return copyText(input.value).then(function() {
    field.classList.add('active');
    button.textContent = copiedLabel;

    setTimeout(function() {
      field.classList.remove('active');
      button.textContent = copyLabel;
    }, 3000);

    return true;
  });
}

function getShareUrl(social, pageUrl, text) {
  if (social === 'facebook') {
    return 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl + '&amp;t=' + text;
  } else if (social === 'twitter') {
    return 'https://twitter.com/intent/tweet?url=' + pageUrl + '&text=' + text + ' %23criptomo';
  } else if (social === 'whatsapp') {
    return 'https://api.whatsapp.com/send?phone=whatsappphonenumber&text=' + text + ' ' + pageUrl;
  } else if (social === 'telegram') {
    return 'https://telegram.me/share/url?url=' + pageUrl + '&text=' + text;
  } else if (social === 'linkedin') {
    return 'https://www.linkedin.com/shareArticle?mini=true&url=' + pageUrl + '&title=' + text;
  } else if (social === 'reddit') {
    return 'http://www.reddit.com/submit?url=' + pageUrl +' &title=' + text;
  }

  return '';
}

function shareOnSocial(social) {
  var pageUrl = encodeURIComponent(window.location.href);
  var resultsText = document.querySelector('.calculator-results-text');
  var text = encodeURIComponent(resultsText ? resultsText.textContent : '');
  var shareUrl = getShareUrl(social, pageUrl, text);

  if (!shareUrl) {
    return false;
  }

  window.open(shareUrl, 'newWindow', 'width=600,height=300');
  return false;
}

function initShareInteractions() {
  var popup = document.querySelector('.popup');

  if (!popup || popup.getAttribute('data-share-bound') === 'true') {
    return;
  }

  popup.setAttribute('data-share-bound', 'true');
  popup.addEventListener('click', function(event) {
    var shareLink = event.target.closest('[data-social]');
    var copyButton = event.target.closest('button.copy');

    if (shareLink) {
      event.preventDefault();
      shareOnSocial(shareLink.getAttribute('data-social'));
      return;
    }

    if (copyButton) {
      event.preventDefault();
      copyShareText(copyButton);
    }
  });
}

function copyAffiliateCode(box) {
  var codeElement = box.querySelector('.calculator-affiliate-code');
  var code = codeElement ? codeElement.getAttribute('data-code') : '';
  var copiedLabel = box.getAttribute('data-copied') || 'Copied';

  if (!codeElement || !code) {
    return Promise.resolve(false);
  }

  return copyText(code).then(function() {
    codeElement.textContent = copiedLabel;

    setTimeout(function() {
      codeElement.textContent = code;
    }, 2000);

    return true;
  });
}

function initAffiliateCopy() {
  var affiliateBanner = document.querySelector('.calculator-affiliate-banner');

  if (!affiliateBanner || affiliateBanner.getAttribute('data-affiliate-bound') === 'true') {
    return;
  }

  affiliateBanner.setAttribute('data-affiliate-bound', 'true');
  affiliateBanner.addEventListener('click', function(event) {
    var codeBox = event.target.closest('.calculator-affiliate-codebox');

    if (!codeBox) {
      return;
    }

    event.preventDefault();
    copyAffiliateCode(codeBox);
  });
  affiliateBanner.addEventListener('keydown', function(event) {
    var codeBox = event.target.closest('.calculator-affiliate-codebox');

    if (!codeBox || (event.key !== 'Enter' && event.key !== ' ')) {
      return;
    }

    event.preventDefault();
    copyAffiliateCode(codeBox);
  });
}

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
    date: document.getElementById('invest-date').value,
    oldValue: document.getElementById('invest-quantity').value,
    tokenSymbol: document.getElementById('invest-currency').value.replace(/\s/g, '').toUpperCase(),
    tokenName: document.getElementById('invest-currency').options[document.getElementById('invest-currency').options.selectedIndex].innerHTML,
    fiat: document.getElementById('invest-fiat').value,
  };

  if (investment.date) {
    loading('on');
    var myDate = investment.date.split('-');
    var newDate = myDate[0] + '/' + myDate[1] + '/' + myDate[2];
    var timestamp = Math.floor(new Date(newDate).getTime() / 1000 );

    Array.from(document.getElementsByClassName('input-error')).forEach(function(element) {
      element.classList.remove('input-error');
    });
    Array.from(document.getElementsByClassName('error')).forEach(el => el.classList.remove('is-visible'));

    fetch('/api/market/data/price?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat)
      .then(response => response.json())
      .then((response) => {
        const currentPrice = parseCurrentPriceResponse(response, investment.fiat);

        if (currentPrice === null) {
          handleError('currency');
          loading('off');
          return;
        }

        investment.currentPrice = currentPrice;
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
          fetch('/api/market/data/pricehistorical?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat + '&ts=' + timestamp)
            .then(data => data.json())
            .then((data) => {
              const historicalPriceData = parseHistoricalPriceResponse(data, investment.tokenSymbol, investment.fiat);

              if (historicalPriceData.error) {
                handleError(historicalPriceData.error);
              } else {
                investment.oldPrice = historicalPriceData.price;
                paintResults(investment);
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
        loading('off');
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
    const calculatedResults = calculateInvestmentResults(investData.oldValue, investData.oldPrice, investData.currentPrice);

    investData.tokensBought = calculatedResults.tokensBought;
    investData.currentValue = calculatedResults.currentValue;
    investData.percentageGained = calculatedResults.percentageGained;
    modifyAllClassElementsText('result-tokencount', investData.tokensBought);
    modifyAllClassElementsText('result-old-price', investData.oldPrice + ' ' + investData.fiat + '/' + investData.tokenSymbol);
    modifyAllClassElementsText('result-tokentype', investData.tokenSymbol);
    modifyAllClassElementsText('result-currentvalue', investData.currentValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + investData.fiat);
    modifyAllClassElementsText('result-current-price', parseFloat(investData.currentPrice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + investData.fiat);
    modifyAllClassElementsText('result-date', toShortFormat(new Date(investment.date)));
    modifyAllClassElementsText('result-invest', investData.oldValue + ' ' + document.getElementById('invest-fiat').value);

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
    document.getElementsByClassName('share-text')[0].value = window.location.href;

    loadRecommendationArticles(investData.tokenSymbol);

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
      Array.from(document.getElementsByClassName('input-error')).forEach(function(element) {
        element.classList.remove('input-error');
      });
    });
  }

  let exampleDate = document.querySelectorAll('.error.date-error a');

  for (i = 0; i < exampleDate.length; i++) {
    exampleDate[i].addEventListener('click', function(){
      document.querySelector('#invest-date').value = this.innerText;
      Array.from(document.getElementsByClassName('input-error')).forEach(function(element) {
        element.classList.remove('input-error');
      });
    });
  }
}

function init() {
  let investDate = document.getElementById('invest-date');

  initShareInteractions();
  initAffiliateCopy();

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
    calculateInvestmentResults: calculateInvestmentResults,
    calculateEarnings: calculateEarnings,
    copyAffiliateCode: copyAffiliateCode,
    copyShareText: copyShareText,
    getShareUrl: getShareUrl,
    init: init,
    initAffiliateCopy: initAffiliateCopy,
    initializeCalculatorExamples: initializeCalculatorExamples,
    initShareInteractions: initShareInteractions,
    loadRecommendationArticles: loadRecommendationArticles,
    loadScriptOnce: loadScriptOnce,
    parseCurrentPriceResponse: parseCurrentPriceResponse,
    parseHistoricalPriceResponse: parseHistoricalPriceResponse,
    preFill: preFill,
    shareOnSocial: shareOnSocial
  };
}
