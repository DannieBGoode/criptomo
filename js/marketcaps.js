// lets use this library https://datatables.net to create dynamic tables that can be sorted and paginated
var marketcapDataArray = new Array();
$.get( "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=300", function( response ) {
    if (window.location.pathname === '/cotizaciones/') {
        // lets try to have something like this https://www.livecoinwatch.com/ use caret-icons for price changes
        $.each(response, function(index, currency) {
            let colRank = currency.rank;
            let colIcon = "/images/general/cryptocurrencies/" + currency.symbol.toLowerCase() + "-64.png";
            let colName = currency.name + "<br/><span class='marketcap-symbol'>(" + currency.symbol + ")</span>";
            let colMarketCap = Math.floor(currency.market_cap_usd).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colTokens = Math.floor(currency.available_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colPrice = parseFloat(currency.price_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            let colChange1h = parseFloat(currency.percent_change_1h).toFixed(1);
            let colChange24h = parseFloat(currency.percent_change_24h).toFixed(1);
            let marketcapDataRow = [colRank, colIcon, colName, colMarketCap, colTokens, colPrice, colChange1h, colChange24h];
            marketcapDataArray.push(marketcapDataRow);
        });
    }
})
.success(function(response) {
    $(document).ready(function() {
        console.log("Adding marketcaps array data (length=" + marketcapDataArray.length + ")");
        $('#marketcaps-table').DataTable( {
            responsive: true,
            data: marketcapDataArray,
            pageLength: 100,
            language: {
                lengthMenu: "Mostrar _MENU_ entradas",
                zeroRecords: "No se han encontrado resultados",
                info: "Página _PAGE_ de _PAGES_",
                infoEmpty: "No records available",
                search: "Buscar:",
                infoFiltered: "(filtrado entre _MAX_ monedas)",
                paginate: {
                    "first":      "Primera",
                    "last":       "Última",
                    "next":       "Siguiente",
                    "previous":   "Anterior"
                }
            },
            columns: [
                {
                    responsivePriority: 3,
                    title: "#"
                },
                { // icon
                    responsivePriority: 2,
                    title: "",
                    render: function ( data, type, row, meta ) {
                        console.log(data);
                        return "<img src=\"" + data + "\" height=\"128\" width=\"128\" onerror=\"this.src='/images/general/cryptocurrencies/unknown-64.png'\" />";
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
                    title: "1h (%)",
                    render: function ( data, type, row, meta ) {
                        if ( data > 0) {
                            return "<div class=\"ticker-price-change-positive\">" + data + " <span class=\"carot-icon\">▲</span></div>";
                        } else {
                            return "<div class=\"ticker-price-change-negative\">" + data + " <span class=\"carot-icon\">▼</span></div>";
                        }
                    }
                },
                {
                    responsivePriority: 1,
                    title: "24h (%)",
                    render: function ( data, type, row, meta ) {
                        if ( data > 0) {
                            return "<div class=\"ticker-price-change-positive\">" + data + " <span class=\"carot-icon\">▲</span></div>";
                        } else {
                            return "<div class=\"ticker-price-change-negative\">" + data + " <span class=\"carot-icon\">▼</span></div>";
                        }
                    }
                }
            ]
        } );
    })
});