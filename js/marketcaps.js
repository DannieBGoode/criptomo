// lets use this library https://datatables.net to create dynamic tables that can be sorted and paginated
var marketcapDataArray = new Array();
$.get( "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=300", function( response ) {
    if (window.location.pathname === '/cotizaciones/') {
        // lets try to have something like this https://www.livecoinwatch.com/ use caret-icons for price changes
        $.each(response, function(index, currency) {
            let colRank = ""+currency.rank;
            let colIcon = "/images/general/cryptocurrencies/" + currency.symbol.toLowerCase() + "-64.png";
            let colName = currency.name+" (" + currency.symbol + ")";
            let colMarketCap = parseFloat(currency.market_cap_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            let colTokens = currency.available_supply.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            let colPrice = parseFloat(currency.price_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            let colChange1h = currency.percent_change_1h;
            let colChange24h = currency.percent_change_24h;
            let marketcapDataRow = [colRank,colIcon,colName,colMarketCap,colTokens,colPrice,colChange1h,colChange24h];
            marketcapDataArray.push(marketcapDataRow);
        });
    }
})
.success(function(response) {
    $(document).ready(function() {
        console.log("Adding marketcaps array data (length="+marketcapDataArray.length+")");
        $('#marketcaps-table').DataTable( {
            responsive: true,
            data: marketcapDataArray,
            columns: [
                {
                    responsivePriority: 3,
                    title: "#"
                },
                { //Icono
                    responsivePriority: 2,
                    title: "",
                    render: function ( data, type, row, meta ) {
                        return "<img src=\""+data+"\" height=\"32\" width=\"32\" onerror=\"this.src='/images/general/cryptocurrencies/btc-64.png'\" />";
                    }
                },
                {
                    responsivePriority: 1,
                    title: "Nombre"
                },
                {
                    responsivePriority: 6,
                    title: "Cotización"
                },
                {
                    responsivePriority: 7,
                    title: "Tokens en Circulación"
                },
                {
                    responsivePriority: 2,
                    title: "Precio"
                },
                {
                    responsivePriority: 8,
                    title: "1h",
                    render: function ( data, type, row, meta ) {
                        if ( data > 0) {
                            return "<div class=\"ticker-price-change-positive\">"+data+"</div>";
                        } else {
                            return "<div class=\"ticker-price-change-negative\">"+data+"</div>";
                        }
                    }
                },
                {
                    responsivePriority: 1,
                    title: "24h",
                    render: function ( data, type, row, meta ) {
                        if ( data > 0) {
                            return "<div class=\"ticker-price-change-positive\">"+data+"</div>";
                        } else {
                            return "<div class=\"ticker-price-change-negative\">"+data+"</div>";
                        }
                    }
                }
            ]
        } );
    })
});