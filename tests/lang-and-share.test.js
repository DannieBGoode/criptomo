const { loadModule } = require('./helpers/load-module');

describe('lang.js and share-calculator-results.js', () => {
  test('builds language dictionaries', () => {
    document.body.innerHTML = '<html lang="en"></html>';
    global.$ = jest.fn(function(selector) {
      return {
        attr: jest.fn().mockReturnValue(selector === 'html' ? 'en' : '')
      };
    });

    const lang = loadModule('../js/lang.js');

    expect(lang.getTableDataLang('en').global.today).toBe('Today');
    expect(lang.getTableDataLang('es').icoColumns.gains).toBe('Ganancias');
  });

  test('builds share urls and opens a window', () => {
    document.body.innerHTML = '<div class="calculator-results-text">Profit result</div>';
    window.open = jest.fn();
    const share = loadModule('../js/share-calculator-results.js');

    expect(share.getShareUrl('twitter', 'http%3A%2F%2Fexample.com', 'Profit')).toContain('twitter.com/intent/tweet');
    expect(share.shareOnSocial('telegram')).toBe(false);
    expect(window.open).toHaveBeenCalled();
  });
});
