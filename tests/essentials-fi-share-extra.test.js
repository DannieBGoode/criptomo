const { loadModule } = require('./helpers/load-module');

describe('essentials.js extra coverage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <a class="js-toggle" data-container="menu"></a>
      <div id="menu" class="active"></div>
      <div class="site-navigation"></div>
      <progress></progress>
    `;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('waits for DOMContentLoaded and closes menu on transition end', () => {
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      value: 'loading'
    });

    const essentials = loadModule('../js/essentials.js');
    const callback = jest.fn();
    const menu = document.getElementById('menu');

    essentials.docReady(callback);
    document.dispatchEvent(new Event('DOMContentLoaded'));
    document.querySelector('.js-toggle').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    menu.dispatchEvent(new Event('transitionend'));

    expect(callback).toHaveBeenCalled();
    expect(menu.classList.contains('active')).toBe(false);
  });

  test('detects mobile user agent and skips progress listener without progress bar', () => {
    Object.defineProperty(navigator, 'userAgent', {
      configurable: true,
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)'
    });
    document.body.innerHTML = '<div class="site-navigation"></div>';
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const essentials = loadModule('../js/essentials.js');

    essentials.initializeProgressBar();

    expect(essentials.mobileAndTabletcheck()).toBe(true);
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
  });
});

describe('fi.js extra coverage', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="fi-savings-ratio" value="50" />
      <input id="fi-salary" value="120000" />
      <input id="fi-fiat" value="USD" />
      <input id="fi-investment-returns" value="7" />
      <input id="fi-method" type="checkbox" />
      <div><input id="fi-desired-networth" value="1000000" /><span></span></div>
      <div><input id="fi-yearly-spending" value="40000" /><span></span></div>
      <div><input id="fi-swr" value="4" /><span></span></div>
      <input id="fi-age" value="30" />
      <input id="fi-accumulated" value="50000" />
      <span id="savings-ratio-text"></span>
      <span id="savings-ratio-yearly-text"></span>
      <span id="savings-ratio-monthly-text"></span>
      <span id="returns-ratio-text"></span>
      <span id="monthly-salary-text"></span>
      <span id="monthly-income-text"></span>
      <span class="currency-text"></span>
      <div class="active"></div>
      <div class="savings-50"></div>
      <div id="fi-results-table"><table><tbody></tbody></table></div>
    `;
  });

  test('toggles fi method fields and validates swr inputs', () => {
    const fi = loadModule('../js/fi.js');
    document.getElementById('fi-method').checked = true;
    fi.updateFIMethod();

    expect(document.getElementById('fi-desired-networth').disabled).toBe(true);
    expect(document.getElementById('fi-yearly-spending').disabled).toBe(false);
    expect(document.getElementById('fi-swr').disabled).toBe(false);

    document.getElementById('fi-yearly-spending').value = '';
    document.getElementById('fi-swr').value = '';
    fi.updateSWR();
    expect(document.getElementById('fi-yearly-spending').classList.contains('input-error')).toBe(true);
    expect(document.getElementById('fi-swr').classList.contains('input-error')).toBe(true);

    document.getElementById('fi-yearly-spending').value = '48000';
    document.getElementById('fi-swr').value = '4';
    fi.updateSWR();
    expect(document.getElementById('fi-desired-networth').value).toBe('1200000.00');
  });

  test('marks missing desired net worth as input error', () => {
    const fi = loadModule('../js/fi.js');
    document.getElementById('fi-desired-networth').value = '';

    fi.calculateFI();

    expect(document.getElementById('fi-desired-networth').classList.contains('input-error')).toBe(true);
  });
});

describe('share-calculator-results.js extra coverage', () => {
  test('builds all supported share URLs and returns blank for unknown providers', () => {
    document.body.innerHTML = '<div class="calculator-results-text">Profit result</div>';
    window.open = jest.fn();
    const share = loadModule('../js/share-calculator-results.js');

    expect(share.getShareUrl('facebook', 'u', 't')).toContain('facebook.com');
    expect(share.getShareUrl('twitter', 'u', 't')).toContain('twitter.com');
    expect(share.getShareUrl('whatsapp', 'u', 't')).toContain('whatsapp.com');
    expect(share.getShareUrl('telegram', 'u', 't')).toContain('telegram.me');
    expect(share.getShareUrl('linkedin', 'u', 't')).toContain('linkedin.com');
    expect(share.getShareUrl('reddit', 'u', 't')).toContain('reddit.com');
    expect(share.getShareUrl('mastodon', 'u', 't')).toBe('');
  });
});
