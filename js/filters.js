function createGrid($gridElement) {
  return $gridElement.isotope({
    itemSelector: '.item',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function (itemElem) {
        var weight = $(itemElem).find('.weight').text();
        return parseFloat(weight.replace( /[\(\)]/g, ''));
      }
    }
  });
}

var $grid = createGrid($('.grid'));

function registerFilterEvents() {
  $('#filters').on('click', 'a', function () {
    let filterValue = $(this).attr('data-filter');
    $('#cryptocurrencies-filter-input').val('');
    $grid.isotope({ filter: filterValue });
    document.querySelector('.grid').scrollIntoView({behavior: 'smooth' });
  });

  $('#cryptocurrencies-filter-input').keyup(function () {
    let filter = $('.filter-active').attr('data-filter').replace('.', '');
    $grid.isotope({
      filter: function () {
        if (($(this).hasClass(filter)) || (filter === '*') ) {
          let name = $(this).find('.coinlist-name').text().toUpperCase();
          let searchedWord = $('#cryptocurrencies-filter-input').val().toUpperCase();
          return name.includes(searchedWord);
        }
        return false;
      }
    });
  });
}

// add active class when clicking on filter
var setActiveFilter = function (element) {
  $('.filter-active').removeClass('filter-active');
  $(element).addClass('filter-active');
};

registerFilterEvents();

if (typeof module !== 'undefined') {
  module.exports = {
    createGrid: createGrid,
    registerFilterEvents: registerFilterEvents,
    setActiveFilter: setActiveFilter
  };
}
