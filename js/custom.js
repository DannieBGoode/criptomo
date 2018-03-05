/**
 * Main JS file for theme behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){
        // Responsive video embeds
        $('.entry-content').fitVids();

        // Navigation
        $('#menu-toggle').click(function(){
            var _this = $(this);
            _this.toggleClass( 'toggled-on' ).attr('aria-expanded', _this.attr('aria-expanded') === 'false' ? 'true' : 'false');
            $('.nav-menu').slideToggle();
        });
        $(window).bind('resize orientationchange', function() {
            if ( $('#menu-toggle').is(':hidden') ) {
                $('#menu-toggle').removeClass('toggled-on').attr('aria-expanded', 'false');
                $('.nav-menu').removeAttr('style');
            }
        });

        // Scroll to top
        $('#top-link').on('click', function(e) {
            $('html, body').animate({'scrollTop': 0});
            e.preventDefault();
        });

        // mgnific
        $('.image-link').magnificPopup({type:'image'});
        $('.popup-link').magnificPopup({
          type: 'image'
          // other options
        });

        // Scrolling progress coloring
        var getMax = function(){
        return $(document).height() - $(window).height();
        }
        
        var getValue = function(){
            return $(window).scrollTop();
        }
        
        if('max' in document.createElement('progress')){
            // Browser supports progress element
            var progressBar = $('progress');
            
            // Set the Max attr for the first time
            progressBar.attr({ max: getMax() });

            $(document).on('scroll', function(){
                // On scroll only Value attr needs to be calculated
                progressBar.attr({ value: getValue() });
            });
          
            $(window).resize(function(){
                // On resize, both Max/Value attr needs to be calculated
                progressBar.attr({ max: getMax(), value: getValue() });
            });   
        }
        else {
            var progressBar = $('.progress-bar'), 
                max = getMax(), 
                value, width;
            
            var getWidth = function(){
                // Calculate width in percentage
                value = getValue();            
                width = (value/max) * 100;
                width = width + '%';
                return width;
            }
            
            var setWidth = function(){
                progressBar.css({ width: getWidth() });
            }
            
            $(document).on('scroll', setWidth);
            $(window).on('resize', function(){
                // Need to reset the Max attr
                max = getMax();
                setWidth();
            });
        }

        // scroll to element
        $.fn.goTo = function(velocity) {
            $('html, body').animate({
                scrollTop: $(this).offset().top + 'px'
            }, velocity);
            return this; // for chaining...
        }


        // sidebar currencies marketcaps
        $.get( "https://api.coinmarketcap.com/v1/ticker/", function( response ) {
            var displayedCurrencies = $('[data-currency]'),
                result = '',
                currencySelector = '';
            console.log(response);
            // var aux = JSON.stringify(response);
            // console.log(aux);
            // localStorage.setItem('marketcaps', aux);

            if (window.location.pathname === '/cotizaciones/') {
                // lets try to have something like this https://www.livecoinwatch.com/ use caret-icons for price changes
                $.each(response, function(index, currency) {
                    let className = '';
                    let templatedMarketcap  = '<tr><td>' + currency.rank + '</td>';
                        templatedMarketcap += '<td class="coinlist-icon" style="background-image: url(/images/general/cryptocurrencies/' + currency.symbol.toLowerCase() + '-64.png);"></td>';
                        templatedMarketcap += '<td>' + currency.name + '(' + currency.symbol + ')</td>';
                        templatedMarketcap += '<td>' + parseFloat(currency.market_cap_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + '$' + '</td>';
                        templatedMarketcap += '<td>' + currency.available_supply.replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + '</td>';
                        templatedMarketcap += '<td>' + parseFloat(currency.price_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,") + '$' + '</td>';
                        if ( currency.percent_change_1h > 0) {
                            className = 'ticker-price-change-positive';
                        } else {
                            className = 'ticker-price-change-negative';
                        }
                        templatedMarketcap += '<td class=' + className + '>' + currency.percent_change_1h + '</td>';
                        if ( currency.percent_change_24h > 0) {
                            className = 'ticker-price-change-positive';
                        } else {
                            className = 'ticker-price-change-negative';
                        }
                        templatedMarketcap += '<td class=' + className + '>' + currency.percent_change_24h + '</td></tr>';
                    $("#marketcaps-panel").append(templatedMarketcap);
                });
            }

            $.each(displayedCurrencies, function(index, currency) {
                result = response.filter(function( obj ) {
                  return obj.id === currency.title;
                });
                currencySelector = $("." + currency.title + "-ticker-price-change");
                $("#sidebar-ticker-" + currency.title + " .ticker-price").html(parseFloat(result[0].price_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '$');
                if ( result[0].percent_change_24h > 0) {
                    $(currencySelector).addClass('ticker-price-change-positive');
                } else {
                    $(currencySelector).addClass('ticker-price-change-negative');
                }
                $(currencySelector).html('(' + result[0].percent_change_24h + '%)');
            });
        });

    });

}(jQuery));