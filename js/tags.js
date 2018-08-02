$(window).on('hashchange', function () {
  changeTagSection();
});

var changeTagSection = function () {
  if (window.location.hash) {
    let tag = window.location.hash.replace('#', '');
    $('.tag').hide();
    $('.tag-' + tag).show();
    $('.archive-tags-list .active').removeClass('active');
    $('.tag-selector-' + tag).addClass('active');
  } else {
    $('.archive-tags-list').children('a')[0].click();
  }
};

changeTagSection();
