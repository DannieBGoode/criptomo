var $grid = $('.grid').isotope({
  itemSelector: '.item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});

// bind filter button click
$('#filters').on( 'click', 'a', function() {
  var filterValue = $( this ).attr('data-filter');
  $grid.isotope({ filter: filterValue });
  $(".grid").goTo('slow');
});

// add active class when clicking on filter
var setActiveFilter = function(element) {
  $(".filter-active").removeClass("filter-active");
  $(element).addClass("filter-active");

} 