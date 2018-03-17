let marketcapDataArray = new Array(),
    marketcapCurrency = '',
    table = $('#marketcaps-table').DataTable({
    responsive: true,
    pageLength: 100,
    processing: true,
    /* l (Length changing), f (Filtering input), t (The Table!), i(Information), p (Pagination), r (pRocessing) */
    dom: 'rt<"marketcaps-table-bottom"ip>',
    language: {
                lengthMenu: "Items _MENU_",
                zeroRecords: "No se han encontrado resultados",
                info: "Página _PAGE_ de _PAGES_",
                infoEmpty: "No hay información disponible",
                search: "Buscar:",
                infoFiltered: "(filtrado entre _MAX_ monedas)",
                loadingRecords: "Cargando...",
                emptyTable: "Tabla vacía",
                paginate: {
                    "first":      "Primera",
                    "last":       "Última",
                    "next":       "<span class=\"fa-chevron-right\"></span>",
                    "previous":   "<span class=\"fa-chevron-left\"></span>"
                },
                processing: "<div class='loader' style='display:block'></div>"
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
            className: "dt-right",
            render: function (data) {
                return generateCurrencyValueHtml( data, marketcapCurrency );
            }
        },
        {
            responsivePriority: 1,
            title: "Precio",
            className: "dt-right",
            render: function( data, type, row, meta) {
                if ( type !== "display" ) { return data.price; }
                if ( data.positiveChange > 0) {
                    return "<div class=\"marketcaps-pricechange-positive\">" + generateCurrencyValueHtml( data.price, marketcapCurrency ) + "&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">" + generateCurrencyValueHtml( data.price, marketcapCurrency ) + "&nbsp;<span class=\"carot-icon\">▼</span></div>";
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
function marketcapTableLoad( currency ) {
    table.processing( true );
    marketcapCurrency = currency;
    let getUrl = "https://api.coinmarketcap.com/v1/ticker/?convert="+ currency +"&limit=300"
    marketcapDataArray = [];

    $("#marketcaps-currency-select").val(currency);
    $.get( getUrl, function( response ) {
        if (window.location.pathname === '/cotizaciones/') {
            $.each(response, function(index, coin) {
                let colSpacer = null,
                    priceLength = '',
                    colRank = coin.rank,
                    colIcon = coin.symbol.toLowerCase(),
                    colName = {
                        symbol: coin.symbol,
                        name: coin.name
                    },
                    marketCapString = coin["market_cap_"+currency.toLowerCase()],
                    colMarketCap = Math.floor(marketCapString).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    colTokens = Math.floor(coin.available_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    priceString = coin["price_"+currency.toLowerCase()];

                if ((currency !== 'USD') && (currency !== 'EUR')) {
                    priceLength = 10;
                } else {
                    priceLength = 2;  
                }

                let colPrice = {
                    price: parseFloat(priceString).toFixed(priceLength).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                    positiveChange: (parseFloat(coin.percent_change_1h).toFixed(1) > 0)
                },
                colChange1h = parseFloat(coin.percent_change_1h).toFixed(1),
                colChange24h = parseFloat(coin.percent_change_24h).toFixed(1),
                marketcapDataRow = [colRank, colIcon, colName, colMarketCap, colPrice, colTokens, colChange1h, colChange24h, colSpacer];

                marketcapDataArray.push(marketcapDataRow);
            });
        }
    })
    .success(function(response) {
        table.clear();
        table.rows.add( marketcapDataArray );
        table.draw();
        table.columns.adjust();
        table.responsive.recalc();
    })
    .always(function() {
        table.processing( false );
    });
}

$('#marketcaps-filter-input').keyup(function(){
      table.search($(this).val()).draw() ;
})

$('#marketcaps-currency-select').change(function() {
    let selectedCurrency = $("#marketcaps-currency-select").val();

    if (localStorageAvailable) {
        let criptomo = {};
        criptomo.currency = selectedCurrency;
        localStorage.setItem('criptomo', JSON.stringify(criptomo));
    }
    marketcapTableLoad(selectedCurrency);
});

$('#marketcaps-pagelength-select').change(function() {
    let selected = $("#marketcaps-pagelength-select").val(),
        pageLength = parseInt(selected) || 100;
    table.page.len( pageLength ).draw();
});

$(document).ready(function() {
    let selectedCurrency = '';
    if (localStorageAvailable) {
        let criptomo = JSON.parse(localStorage.getItem('criptomo'))
        if (criptomo && criptomo.currency) {
            selectedCurrency = criptomo.currency

        }
    }
    selectedCurrency = selectedCurrency || 'USD';
    marketcapTableLoad(selectedCurrency);
    
});

function generateCurrencyValueHtml( price, currency ) {
    switch( currency ) {
    case "EUR":
        symbol = price+"&nbsp;€";
        break;
    case "USD":
        symbol = "$"+price;
        break;
    case "BTC":
        symbol = "₿"+price;
        break;
    case "ETH":
        symbol = "Ξ"+price;
        break;
    default:
        symbol = price+"&nbsp;"+currency.toUpperCase();
    }
    return symbol;
}

function localStorageAvailable() {
    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}