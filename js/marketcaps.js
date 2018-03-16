// lets use this library https://datatables.net to create dynamic tables that can be sorted and paginated
var table = $('#marketcaps-table').DataTable({
    responsive: true,
    pageLength: 100,
    /* l (Length changing), f (Filtering input), t (The Table!), i(Information), p (Pagination), r (pRocessing) */
    dom: '<"marketcaps-table-top"fl>rt<"marketcaps-table-bottom"ip>',
    language: {
                lengthMenu: "Items _MENU_",
                zeroRecords: "No se han encontrado resultados",
                info: "Página _PAGE_ de _PAGES_",
                infoEmpty: "No records available",
                search: "Buscar:",
                infoFiltered: "(filtrado entre _MAX_ monedas)",
                loadingRecords: "Cargando...",
                emptyTable: "No hay información disponible",
                paginate: {
                    "first":      "Primera",
                    "last":       "Última",
                    "next":       "<span class=\"fa-chevron-right\"></span>",
                    "previous":   "<span class=\"fa-chevron-left\"></span>"
                }
            },
    columns: [
        {
            responsivePriority: 3,
            title: "#",
            className: "dt-center"
        },
        { //Icon
            responsivePriority: 2,
            title: "",
            render: function ( data, type, row, meta ) {
                // return "<div class=\"marketcaps-icon\"><img src=\"/images/general/cryptocurrencies/" + data + "-64.png\" onerror=\"this.onerror=null;this.src='https://www.livecoinwatch.com/images/icons32/" + data + ".png'\" /></div>";
                return "<div class=\"marketcaps-icon\"><img src=\"https://www.livecoinwatch.com/images/icons32/" + data + ".png\" /></div>";
            },
            orderable: false
        },
        {
            responsivePriority: 1,
            title: "Nombre",
            render: function ( data, type, row, meta ) {
                if ( type === "filter" ) { return data.symbol+" "+data.name; }
                else if ( type === "sort" ) { return data.symbol; }
                else if ( type === "display" ) {
                    return "<span class='marketcap-symbol'>" + data.symbol + "</span>"+"<br/><span class='marketcaps-coinname'>" + data.name + "</span>";
                }
                else return data.symbol; 
            }
        },
        {
            responsivePriority: 6,
            title: "Cotización",
            className: "dt-right"
        },
        {
            responsivePriority: 1,
            title: "Precio",
            className: "dt-right",
            render: function( data, type, row, meta) {
                if ( type !== "display" ) { return data.price; }
                if ( data.positiveChange > 0) {
                    return "<div class=\"marketcaps-pricechange-positive\">$" + data.price + "&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">$" + data.price + "&nbsp;<span class=\"carot-icon\">▼</span></div>";
                }
            }
        },
        {
            responsivePriority: 7,
            title: "Tokens en Circulación",
            className: "dt-right"
        },
        {
            responsivePriority: 8,
            title: "1h (%)",
            className: "dt-right",
            render: function ( data, type, row, meta ) {
                if ( type !== "display" ) { return data; }
                if ( data > 0) {
                    return "<div class=\"marketcaps-pricechange-positive\">" + data + "%&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">" + data + "%&nbsp;<span class=\"carot-icon\">▼</span></div>";
                }
            }
        },
        {
            responsivePriority: 2,
            title: "24h (%)",
            className: "dt-right",
            render: function ( data, type, row, meta ) {
                if ( type !== "display" ) { return data; }
                if ( data > 0) {
                    return "<div class=\"marketcaps-pricechange-positive\">" + data + "%&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">" + data + "%&nbsp;<span class=\"carot-icon\">▼</span></div>";
                }
            }
        },
        { // Spacer column
            responsivePriority: 100,
            width: "0px",
            title: "",
            orderable: false,
            className: "marketcaps-table-column-spacer"
        }
    ]
});
var marketcapDataArray = new Array();
$.get( "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=300", function( response ) {
    if (window.location.pathname === '/cotizaciones/') {
        $.each(response, function(index, currency) {
            let colSpacer = null;
            let colRank = currency.rank;
            let colIcon = currency.symbol.toLowerCase();
            let colName = {
                symbol: currency.symbol,
                name: currency.name
            };
            let colMarketCap = Math.floor(currency.market_cap_usd).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colTokens = Math.floor(currency.available_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colPrice = {
                price: parseFloat(currency.price_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                positiveChange: (parseFloat(currency.percent_change_1h).toFixed(1) > 0)
            };
            let colChange1h = parseFloat(currency.percent_change_1h).toFixed(1);
            let colChange24h = parseFloat(currency.percent_change_24h).toFixed(1);

            let marketcapDataRow = [colRank, colIcon, colName, colMarketCap, colPrice, colTokens, colChange1h, colChange24h, colSpacer];
            marketcapDataArray.push(marketcapDataRow);
        });
    }
})
.success(function(response) {
    $(document).ready(function() {
        table.clear();
        table.rows.add( marketcapDataArray );
        table.draw();
        table.columns.adjust();
        table.responsive.recalc();
    })
});