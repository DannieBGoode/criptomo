// lets use this library https://datatables.net to create dynamic tables that can be sorted and paginated

$.get( "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=300", function( response ) {
    if (window.location.pathname === '/cotizaciones/') {
        // lets try to have something like this https://www.livecoinwatch.com/ use caret-icons for price changes
        $.each(response, function(index, currency) {
            let className = '';
            let templatedMarketcap  = '<tr><td>' + currency.rank + '</td>';
                templatedMarketcap += '<td class="coinlist-icon" style="background-image: url(/images/general/cryptocurrencies/' + currency.symbol.toLowerCase() + '-64.png);"></td>';
                templatedMarketcap += '<td>' + currency.name + '<br/>(' + currency.symbol + ')</td>';
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
});