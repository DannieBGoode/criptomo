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
                    "next":       "Siguiente",
                    "previous":   "Anterior"
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
                return "<div class=\"marketcaps-icon\"><img src=\"/images/general/cryptocurrencies/" + data + "-64.png\" onerror=\"this.src='https://www.livecoinwatch.com/images/icons32/" + data + ".png'\" /></div>";
            },
            orderable: false
        },
        {
            responsivePriority: 1,
            title: "Nombre"
        },
        {
            responsivePriority: 6,
            title: "Cotización",
            className: "dt-right"
        },
        {
            responsivePriority: 7,
            title: "Tokens en Circulación",
            className: "dt-right"
        },
        {
            responsivePriority: 2,
            title: "Precio",
            className: "dt-right"
        },
        {
            responsivePriority: 8,
            title: "1h (%)",
            className: "dt-right",
            render: function ( data, type, row, meta ) {
                if ( data > 0) {
                    return "<div class=\"marketcaps-pricechange-positive\">" + data + "%&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">" + data + "%&nbsp;<span class=\"carot-icon\">▼</span></div>";
                }
            }
        },
        {
            responsivePriority: 1,
            title: "24h (%)",
            className: "dt-right",
            render: function ( data, type, row, meta ) {
                if ( data > 0) {
                    return "<div class=\"marketcaps-pricechange-positive\">" + data + "%&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">" + data + "%&nbsp;<span class=\"carot-icon\">▼</span></div>";
                }
            }
        },
        { //Columna espaciadora
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
        // lets try to have something like this https://www.livecoinwatch.com/ use caret-icons for price changes
        $.each(response, function(index, currency) {
            let colSpacer = null;
            let colRank = currency.rank;
            let colIcon = currency.symbol.toLowerCase();
            let colName = currency.name + "<br/><span class='marketcap-symbol'>(" + currency.symbol + ")</span>";
            let colMarketCap = Math.floor(currency.market_cap_usd).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colTokens = Math.floor(currency.available_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colPrice = parseFloat(currency.price_usd).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            let colChange1h = parseFloat(currency.percent_change_1h).toFixed(1);
            let colChange24h = parseFloat(currency.percent_change_24h).toFixed(1);
            let marketcapDataRow = [colRank, colIcon, colName, colMarketCap, colTokens, colPrice, colChange1h, colChange24h, colSpacer];
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