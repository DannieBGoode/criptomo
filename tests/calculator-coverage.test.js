const { loadModule } = require('./helpers/load-module');
const { buildCalculatorDom } = require('./helpers/page-builders');

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe('calculator.js extra coverage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', 'http://localhost/');
    buildCalculatorDom();
    window.history.replaceState = jest.fn();
    global.handleError = jest.fn();
    global.recommendArticles = jest.fn();
    global.toShortFormat = jest.fn().mockReturnValue('1-Jan-2024');
    global.fetch = jest.fn()
      .mockResolvedValue({ json: jest.fn().mockResolvedValue({ USD: 200, BTC: { USD: 100 } }) });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('prefills supported query params and triggers calculation', async () => {
    window.history.pushState({}, '', 'http://localhost/?invest=500&currency=usd&crypto=btc&date=2024-02-01');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 100 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.preFill();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(document.getElementById('invest-currency').value).toBe('BTC');
    expect(document.getElementById('invest-quantity').value).toBe('500');
    expect(document.getElementById('invest-fiat').value).toBe('USD');
    expect(global.fetch).toHaveBeenCalled();
  });

  test('prefills unsupported token into editable input', () => {
    window.history.pushState({}, '', 'http://localhost/?invest=500&currency=eur&crypto=doge&date=2024-02-01');
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ EUR: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ DOGE: { EUR: 100 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.preFill();

    expect(document.querySelector('input.calculator-othercoins').classList.contains('visible')).toBe(true);
    expect(document.querySelector('div.calculator-othercoins').classList.contains('visible')).toBe(true);
    expect(document.querySelector('.editable').value).toBe('DOGE');
  });

  test('shows date error when date is missing or historical fetch fails', async () => {
    const calculator = loadModule('../js/calculator.js');
    document.getElementById('invest-date').value = '';

    calculator.calculateEarnings();
    expect(global.handleError).toHaveBeenCalledWith('date');

    global.handleError.mockClear();
    document.getElementById('invest-date').value = '2024-01-01';
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 0 } }) });

    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('date');
  });

  test('shows currency error when historical api returns an error response', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ Response: 'Error' }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('currency');
  });

  test('marks negative returns and malformed current-price responses as errors', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ USD: 100 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 200 } }) });

    const calculator = loadModule('../js/calculator.js');
    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();
    await flushPromises();

    expect(document.querySelector('.gained-percentage').className).toBe('gained-percentage gained-percentage-negative');
    expect(document.querySelector('.gained-percentage').innerText).toBe('-50.00%');
    expect(document.querySelector('.result-currentvalue').innerText).toBe('500.00 USD');

    global.handleError.mockClear();
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ EUR: 200 }) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ BTC: { USD: 100 } }) });

    calculator.calculateEarnings();
    await flushPromises();
    await flushPromises();

    expect(global.handleError).toHaveBeenCalledWith('currency');
  });

  test('example links update inputs and init exits cleanly without calculator date field', () => {
    const calculator = loadModule('../js/calculator.js');

    calculator.initializeCalculatorExamples();
    document.querySelector('.error.coin-error a').innerText = 'ETH';
    document.querySelector('.error.date-error a').innerText = '2024-02-02';
    document.querySelector('.error.coin-error a').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.querySelector('.error.date-error a').dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(document.querySelector('input.calculator-othercoins').value).toBe('ETH');
    expect(document.getElementById('invest-date').value).toBe('2024-02-02');

    document.body.innerHTML = '<div>No calculator here</div>';
    expect(() => calculator.init()).not.toThrow();
  });

  test('handles share interactions and affiliate copy without extra page scripts', async () => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <div class="popup">
        <div class="calculator-results-text">Profit result</div>
        <ul class="icons">
          <a href="#" data-social="telegram"><span>Telegram</span></a>
        </ul>
        <div class="field">
          <input type="text" class="share-text" value="http://localhost/result" />
          <button class="copy" data-copy-label="Copy" data-copied-label="Copied">Copy</button>
        </div>
      </div>
      <div class="calculator-affiliate-banner">
        <div class="calculator-affiliate-codebox" data-copied="Copied now" tabindex="0">
          <span class="calculator-affiliate-code" data-code="SAVE20">SAVE20</span>
        </div>
      </div>
    `;
    window.open = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: jest.fn().mockResolvedValue(undefined)
      }
    });

    const calculator = loadModule('../js/calculator.js');
    calculator.initShareInteractions();
    calculator.initAffiliateCopy();

    document.querySelector('button.copy').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await Promise.resolve();
    await Promise.resolve();

    expect(navigator.clipboard.writeText).toHaveBeenNthCalledWith(1, 'http://localhost/result');
    expect(document.querySelector('button.copy').textContent).toBe('Copied');

    jest.advanceTimersByTime(3000);
    expect(document.querySelector('button.copy').textContent).toBe('Copy');

    document.querySelector('[data-social="telegram"]').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(window.open).toHaveBeenCalled();

    document.querySelector('.calculator-affiliate-codebox').dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      key: ' '
    }));
    navigator.clipboard.writeText.mockClear();
    await calculator.copyAffiliateCode(document.querySelector('.calculator-affiliate-codebox'));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('SAVE20');
    expect(document.querySelector('.calculator-affiliate-code').textContent).toBe('Copied now');

    jest.advanceTimersByTime(2000);
    expect(document.querySelector('.calculator-affiliate-code').textContent).toBe('SAVE20');
  });

  test('covers deferred loaders, share urls and clipboard fallbacks', async () => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <div class="calculator-block"></div>
      <div class="calculator-results-text">Profit result</div>
      <div class="field">
        <input type="text" class="share-text" value="fallback-result" />
        <button class="copy" data-copy-label="Copy" data-copied-label="Copied">Copy</button>
      </div>
    `;
    document.execCommand = jest.fn();
    window.open = jest.fn();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: jest.fn().mockRejectedValue(new Error('blocked'))
      }
    });

    const calculator = loadModule('../js/calculator.js');

    expect(await calculator.loadScriptOnce('')).toBe(false);

    const existingScript = document.createElement('script');
    existingScript.setAttribute('src', '/js/existing.js');
    document.body.appendChild(existingScript);
    expect(await calculator.loadScriptOnce('/js/existing.js')).toBe(true);
    expect(await calculator.loadScriptOnce('/js/existing.js')).toBe(true);

    const failingScriptPromise = calculator.loadScriptOnce('/js/fail.js');
    const failingScript = Array.from(document.querySelectorAll('script')).find((element) => {
      return element.getAttribute('src') === '/js/fail.js';
    });
    failingScript.onerror();
    await expect(failingScriptPromise).rejects.toThrow('Unable to load script: /js/fail.js');

    global.recommendArticles = undefined;
    expect(await calculator.loadRecommendationArticles('BTC')).toBe(false);
    expect(await calculator.copyShareText(document.createElement('button'))).toBe(false);
    expect(await calculator.copyShareText(document.querySelector('button.copy'))).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');

    expect(calculator.getShareUrl('facebook', 'u', 't')).toContain('facebook.com');
    expect(calculator.getShareUrl('twitter', 'u', 't')).toContain('twitter.com');
    expect(calculator.getShareUrl('whatsapp', 'u', 't')).toContain('whatsapp.com');
    expect(calculator.getShareUrl('telegram', 'u', 't')).toContain('telegram.me');
    expect(calculator.getShareUrl('linkedin', 'u', 't')).toContain('linkedin.com');
    expect(calculator.getShareUrl('reddit', 'u', 't')).toContain('reddit.com');
    expect(calculator.getShareUrl('unknown', 'u', 't')).toBe('');
    expect(calculator.shareOnSocial('unknown')).toBe(false);
    expect(calculator.shareOnSocial('telegram')).toBe(false);
    expect(window.open).toHaveBeenCalled();

    expect(await calculator.copyAffiliateCode(document.createElement('div'))).toBe(false);
  });

  test('lazy-loads recommendation data only when the helper is missing', async () => {
    document.body.innerHTML = '<div class="calculator-block" data-recommendations-script="/js/recommendations.js?123"></div>';
    global.recommendArticles = undefined;

    const calculator = loadModule('../js/calculator.js');
    const loadPromise = calculator.loadRecommendationArticles('BTC');
    const recommendationScript = Array.from(document.querySelectorAll('script')).find((element) => {
      return element.getAttribute('src') === '/js/recommendations.js?123';
    });

    expect(recommendationScript).toBeTruthy();

    global.recommendArticles = jest.fn();
    recommendationScript.onload();
    await loadPromise;

    expect(global.recommendArticles).toHaveBeenCalledWith('BTC');

    document.body.innerHTML = '<div class="calculator-block" data-recommendations-script="/js/recommendations.js?error"></div>';
    global.recommendArticles = undefined;

    const failingRecommendationPromise = calculator.loadRecommendationArticles('ETH');
    const failingRecommendationScript = Array.from(document.querySelectorAll('script')).find((element) => {
      return element.getAttribute('src') === '/js/recommendations.js?error';
    });

    failingRecommendationScript.onerror();
    await expect(failingRecommendationPromise).resolves.toBe(false);
  });
});

