/**
 * Main JS file for theme behaviours
 */

docReady(function() {
  'use strict';

  $(document).ready(function () {
    // Responsive video embeds
    $('.entry-content').fitVids();

    // Navigation
    $('#menu-toggle').click(function () {
      var _this = $(this);
      _this.toggleClass( 'toggled-on' ).attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');
      $('.nav-menu').slideToggle();
    });
    $(window).bind('resize orientationchange', function () {
      if ( $('#menu-toggle').is(':hidden') ) {
        $('#menu-toggle').removeClass('toggled-on').attr('aria-expanded', 'false');
        $('.nav-menu').removeAttr('style');
      }
    });

    // mgnific
    $('.image-link').magnificPopup({type: 'image'});
    $('.popup-link').magnificPopup({
      type: 'image'
      // other options
    });

    // Scrolling progress coloring
    if (document.getElementById("_progress")) {
      document.addEventListener(
        "scroll",
        function() {
          var scrollTop =
            document.documentElement["scrollTop"] || document.body["scrollTop"];
          var scrollBottom =
            (document.documentElement["scrollHeight"] ||
              document.body["scrollHeight"]) - document.documentElement.clientHeight;
          var scrollPercent = scrollTop / scrollBottom * 100 + "%";
            document
              .getElementById("_progress")
              .style.setProperty("--scroll", scrollPercent);
        },
        { passive: true }
      );
    }

    // sidebar currencies marketcaps
    // $.get('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=20', function ( response ) {
    //   var displayedCurrencies = $('[data-currency]');
    //   var result = '';
    //   var currencySelector = '';

    //   $.each(displayedCurrencies, function (index, currency) {
    //     result = response.filter(function ( obj ) {
    //       return obj.id === currency.title;
    //     });
    //     currencySelector = $('.' + currency.title + '-ticker-price-change');
    //     $('#sidebar-ticker-' + currency.title + ' .ticker-price').html(parseFloat(result[0].price_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '$');
    //     if ( result[0].percent_change_24h > 0) {
    //       $(currencySelector).addClass('ticker-price-change-positive');
    //     } else {
    //       $(currencySelector).addClass('ticker-price-change-negative');
    //     }
    //     $(currencySelector).html('(' + result[0].percent_change_24h + '%)');
    //   });
    //   $(".marketcaps").show();
    // }).fail(function() {
    //   $(".marketcaps").hide();
    // });
  });
});
