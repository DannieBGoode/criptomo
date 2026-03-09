const { loadModule } = require('./helpers/load-module');
const { setupJQuery } = require('./helpers/jquery-test-env');

describe('post.js, recommendations.js and tags.js', () => {
  test('opens and closes popup images', () => {
    jest.useFakeTimers();
    document.body.innerHTML = '<div class="img-container"><img src="/demo.jpg" width="100" height="50"></div>';
    const post = loadModule('../js/post.js');
    const image = document.querySelector('img');

    image.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    jest.runAllTimers();

    expect(document.querySelector('.popupContainer')).not.toBeNull();

    document.querySelector('.popUpBackground').dispatchEvent(new MouseEvent('click', { bubbles: true }));
    jest.runAllTimers();
    expect(document.querySelector('.popupContainer')).toBeNull();
    jest.useRealTimers();
  });

  test('renders recommendations for matching language and tag', () => {
    document.documentElement.lang = 'en';
    document.body.innerHTML = `
      <div class="recommended-articles"></div>
      <div class="recommended-articles-wrapper" style="display:none"></div>
    `;
    const recommendations = loadModule('../js/recommendations.js');

    recommendations.recommendArticles('BTC');

    expect(document.querySelector('.recommended-articles').innerHTML).toContain('buy-bitcoin-2021');
    expect(document.querySelector('.recommended-articles-wrapper').style.display).toBe('block');
  });

  test('switches visible tag section from location hash', () => {
    document.body.innerHTML = `
      <div class="archive-tags-list"><a class="tag-selector-btc active"></a><a class="tag-selector-eth"></a></div>
      <div class="tag tag-btc" style="display:block"></div>
      <div class="tag tag-eth" style="display:none"></div>
    `;
    setupJQuery();
    window.location.hash = '#eth';
    const tags = loadModule('../js/tags.js');

    tags.changeTagSection();

    expect(document.querySelector('.tag-eth').style.display).not.toBe('none');
    expect(document.querySelector('.tag-selector-eth').classList.contains('active')).toBe(true);
  });
});
