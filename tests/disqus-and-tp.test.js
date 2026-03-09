const { loadModule } = require('./helpers/load-module');

describe('disqus-loader.js and tp.js', () => {
  test('registers disqus loader and appends script when target is in view', () => {
    document.body.innerHTML = '<div class="disqus"></div>';
    document.querySelector('.disqus').getBoundingClientRect = jest.fn().mockReturnValue({ top: 0, left: 0 });
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 });
    Object.defineProperty(window, 'pageYOffset', { configurable: true, value: 0 });

    loadModule('../js/disqus-loader.js');

    expect(typeof window.disqusLoader).toBe('function');
    expect(document.querySelector('script[src="//criptomo.disqus.com/embed.js"]')).not.toBeNull();
  });

  test('builds ad markup and initializes ads collection', () => {
    document.body.innerHTML = '<div class="lazy-load-ad" data-slot="123"></div>';
    global.navigator.__defineGetter__('userAgent', function() {
      return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
    });
    const adElement = document.querySelector('.lazy-load-ad');

    const tp = loadModule('../js/tp.js');

    expect(tp.getAdsenseCode(adElement)).toContain('data-ad-slot="123"');
    expect(document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')).not.toBeNull();
  });
});
