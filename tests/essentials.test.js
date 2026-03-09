const { loadModule } = require('./helpers/load-module');

describe('essentials.js', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = `
      <a class="js-toggle" data-container="menu"></a>
      <div id="menu"></div>
      <progress></progress>
      <div class="site-navigation"></div>
      <div id="_progress"></div>
    `;
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      value: 'complete'
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('runs docReady callback and toggles menu container', () => {
    const essentials = loadModule('../js/essentials.js');
    const callback = jest.fn();
    const toggle = document.querySelector('.js-toggle');

    essentials.docReady(callback);
    jest.runAllTimers();
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(document.querySelector('#menu').classList.contains('active')).toBe(true);
  });

  test('formats dates and updates progress css variable', () => {
    const essentials = loadModule('../js/essentials.js');

    Object.defineProperty(document.documentElement, 'scrollTop', { configurable: true, value: 50 });
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 200 });
    Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 100 });
    essentials.updateProgressBar();

    expect(document.querySelector('#_progress').style.getPropertyValue('--scroll')).toBe('50%');
    expect(essentials.toShortFormat(new Date('2024-01-06'))).toBe('6-Jan-2024');
  });
});
