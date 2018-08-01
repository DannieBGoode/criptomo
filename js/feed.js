function toggleGridView(mode) {
  if (mode) {
    if (mode === 'list') {
      $('.grid-view').hide();
      $('.list-view').show();
    } else {
      $('.grid-view').show();
      $('.list-view').hide();
    }
  } else {
    $('.grid-view').toggle();
    $('.list-view').toggle();
  }
  if (isLocalStorageAvailable()) {
    let criptomo = JSON.parse(localStorage.getItem('criptomo'));
    if (!criptomo) {
      criptomo = {};
    }
    if ($('.list-view').is(':hidden')) {
      criptomo.view = 'grid';
      $('.toggle-grid').children('a').removeClass('icon-grid');
      $('.toggle-grid').children('a').addClass('icon-stop2');
    } else {
      criptomo.view = 'list';
      $('.toggle-grid').children('a').addClass('icon-grid');
      $('.toggle-grid').children('a').removeClass('icon-stop2');
    }
    localStorage.setItem('criptomo', JSON.stringify(criptomo));
  }
}

if (isLocalStorageAvailable()) {
  let criptomo = JSON.parse(localStorage.getItem('criptomo'));

  if (!criptomo) {
    criptomo = {};
  }

  if (criptomo.view === 'list') {
    toggleGridView('list');
  } else {
    toggleGridView('grid');
  }
}
