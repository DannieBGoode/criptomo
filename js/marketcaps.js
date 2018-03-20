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
            className: "dt-center",
            searchable: false
        },
        { //Icon
            responsivePriority: 2,
            title: "",
            render: function ( data, type, row, meta ) {
                // return "<div class=\"marketcaps-icon\"><img src=\"/images/general/cryptocurrencies/" + data + "-64.png\" onerror=\"this.onerror=null;this.src='https://www.livecoinwatch.com/images/icons32/" + data + ".png'\" /></div>";
                return "<div class=\"marketcaps-icon\"><img src=\"https://www.livecoinwatch.com/images/icons32/" + data + ".png\" /></div>";
            },
            orderable: false,
            searchable: false
        },
        {
            responsivePriority: 1,
            title: "Nombre",
            className: "dt-left marketcaps-table-column-name",
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
            },
            searchable: false
        },
        {
            responsivePriority: 1,
            title: "Precio",
            className: "dt-right",
            render: function( data, type, row, meta) {
                if ( type !== "display" ) { return data.price; }
                if ( data.changeIsPositive ) {
                    return "<div class=\"marketcaps-pricechange-positive\">" + generateCurrencyValueHtml( data.price, marketcapCurrency ) + "&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">" + generateCurrencyValueHtml( data.price, marketcapCurrency ) + "&nbsp;<span class=\"carot-icon\">▼</span></div>";
                }
            },
            searchable: false
        },
        {
            responsivePriority: 7,
            title: "Tokens en Circulación",
            className: "dt-right",
            searchable: false
        },
        {
            responsivePriority: 8,
            title: "1h (%)",
            className: "dt-right",
            render: function ( data, type, row, meta ) {
                if ( type !== "display" ) { return data; }
                if ( data >= 0) {
                    return "<div class=\"marketcaps-pricechange-positive\">" + data + "%&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">" + data + "%&nbsp;<span class=\"carot-icon\">▼</span></div>";
                }
            },
            searchable: false
        },
        {
            responsivePriority: 2,
            title: "24h (%)",
            className: "dt-right",
            render: function ( data, type, row, meta ) {
                if ( type !== "display" ) { return data; }
                if ( data >= 0) {
                    return "<div class=\"marketcaps-pricechange-positive\">" + data + "%&nbsp;<span class=\"carot-icon\">▲</span></div>";
                } else {
                    return "<div class=\"marketcaps-pricechange-negative\">" + data + "%&nbsp;<span class=\"carot-icon\">▼</span></div>";
                }
            },
            searchable: false
        },
        { // Spacer column
            responsivePriority: 100,
            width: "0px",
            title: "",
            orderable: false,
            className: "marketcaps-table-column-spacer",
            searchable: false
        }
    ]
});

function marketcapTableLoad_eur() {
    table.processing( true );
    let currency = "EUR";
    marketcapCurrency = currency;
    let getUrl = "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=300"
    marketcapDataArray = [];
    $("#marketcaps-currency-select").val(currency);
    $.get( getUrl, function( response ) {

        $.each(response, function(index, coin) {
            
            let price_eur = parseFloat(coin["price_eur"]);
            let percent_change_24h = parseFloat(coin["percent_change_24h"]);
            let percent_change_1h = parseFloat(coin["percent_change_1h"]);
            let market_cap_eur = parseFloat(coin["market_cap_eur"]);  
            
            let priceLength = 2;
              
            let colRank = coin.rank;
            let colIcon = coin.symbol.toLowerCase();
            let colName = {
                    symbol: coin.symbol,
                    name: coin.name
                };  
            let colMarketCap = Math.floor(market_cap_eur).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colPrice = {
                price: price_eur.toFixed(priceLength).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                changeIsPositive: ( percent_change_1h >= 0 )
            };
            let colTokens = Math.floor(coin.available_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
            let colChange1h = percent_change_1h.toFixed(2);
            let colChange24h = percent_change_24h.toFixed(2);
            let colSpacer = null;
            let marketcapDataRow = [colRank, colIcon, colName, colMarketCap, colPrice, colTokens, colChange1h, colChange24h, colSpacer];
            marketcapDataArray.push(marketcapDataRow);
        });
        
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

function marketcapTableLoad( currency ) {
    switch( currency ) {
    case "EUR":
        marketcapTableLoad_eur();
        break;
    case "USD":
        marketcapTableLoad_usd();
        break;
    default:
        marketcapTableLoad_criptos( currency );
    }
    //return symbol; 
}

function marketcapTableLoad_usd() {
    table.processing( true );
    let currency = "USD";
    marketcapCurrency = currency;
    let getUrl = "https://api.coinmarketcap.com/v1/ticker/?convert=USD&limit=300"
    marketcapDataArray = [];
    $("#marketcaps-currency-select").val(currency);
    $.get( getUrl, function( response ) {

        $.each(response, function(index, coin) {
            
            let price_usd = parseFloat(coin["price_usd"]);
            let percent_change_24h = parseFloat(coin["percent_change_24h"]);
            let percent_change_1h = parseFloat(coin["percent_change_1h"]);
            let market_cap_usd = parseFloat(coin["market_cap_usd"]);  
            
            let priceLength = 2;
            //let priceCurrent = price_usd.toFixed(priceLength).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
              
            let colRank = coin.rank;
            let colIcon = coin.symbol.toLowerCase();
            let colName = {
                    symbol: coin.symbol,
                    name: coin.name
                };  
            let colMarketCap = Math.floor(market_cap_usd).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colPrice = {
                price: price_usd.toFixed(priceLength).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                changeIsPositive: ( percent_change_1h >= 0 )
            };
            let colTokens = Math.floor(coin.available_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
            let colChange1h = percent_change_1h.toFixed(2);
            let colChange24h = percent_change_24h.toFixed(2);
            let colSpacer = null;
            let marketcapDataRow = [colRank, colIcon, colName, colMarketCap, colPrice, colTokens, colChange1h, colChange24h, colSpacer];
            marketcapDataArray.push(marketcapDataRow);
        });
        
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

function marketcapTableLoad( currency ) {
    switch( currency ) {
    case "EUR":
        marketcapTableLoad_eur();
        break;
    case "USD":
        marketcapTableLoad_usd();
        break;
    default:
        marketcapTableLoad_criptos( currency );
    }
    //return symbol; 
}

function marketcapTableLoad_criptos( currency ) {
    table.processing( true );
    marketcapCurrency = currency;
    let getUrl = "https://api.coinmarketcap.com/v1/ticker/?convert="+ currency +"&limit=300"
    marketcapDataArray = [];
    $("#marketcaps-currency-select").val(currency);
    $.get( getUrl, function( response ) {
        
        let p0_24h_curr_usd = 1.0;
        let p0_1h_curr_usd = 1.0;
        $.each(response, function(index, coin) {
            
            let price_usd = parseFloat(coin["price_usd"]);
            let price_coin = parseFloat(coin["price_"+currency.toLowerCase()]);
            let percent_change_24h = parseFloat(coin["percent_change_24h"]);
            let percent_change_1h = parseFloat(coin["percent_change_1h"]);
            let currentCoinIsSelectedCurrency = ( coin["symbol"].toLowerCase()===currency.toLowerCase() );
            
            // 24h change
            let pf_24h_coin_usd = price_usd;
            let c_24h_coin_usd = percent_change_24h;
            let f_24h_coin_usd = 1;
            if (c_24h_coin_usd >= 0) {
                f_24h_coin_usd = 1 + ( c_24h_coin_usd / 100 );
            } else {
                f_24h_coin_usd = 1 - ( c_24h_coin_usd / 100 );  
            }
            let p0_24h_coin_usd = pf_24h_coin_usd / f_24h_coin_usd;
            if (currentCoinIsSelectedCurrency) {
                p0_24h_curr_usd = p0_24h_coin_usd;
                
                console.log("symbol="+coin["symbol"].toLowerCase());
                console.log("percent_change_24h="+percent_change_24h);
                console.log("percent_change_1h="+percent_change_1h);
                
                
            }
            let pf_24h_coin_curr = price_coin;
            let colChange24hTemp = pf_24h_coin_curr / p0_24h_coin_usd; 
            
            // 1h change
            let pf_1h_coin_usd = price_usd;
            let c_1h_coin_usd = percent_change_1h;
            let f_1h_coin_usd = 1;
            if (c_1h_coin_usd >= 0) {
                f_1h_coin_usd = 1 + ( c_1h_coin_usd / 100 );
            } else {
                f_1h_coin_usd = 1 - ( c_1h_coin_usd / 100 );  
            }
            let p0_1h_coin_usd = pf_1h_coin_usd / f_1h_coin_usd;
            if (currentCoinIsSelectedCurrency) {
                p0_1h_curr_usd = p0_1h_coin_usd;
            }
            let pf_1h_coin_curr = price_coin;
            let colChange1hTemp = pf_1h_coin_curr / p0_1h_coin_usd; 
            

            let priceLength = '';
            if ((currency !== 'USD') && (currency !== 'EUR')) {
                priceLength = 10;
            } else {
                priceLength = 2;  
            }
            let priceCurrent = price_usd.toFixed(priceLength).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            let marketcapCoinString = coin["market_cap_"+currency.toLowerCase()];    
            let colRank = coin.rank;
            let colIcon = coin.symbol.toLowerCase();
            let colName = {
                    symbol: coin.symbol,
                    name: coin.name
                };  
            let colMarketCap = Math.floor(marketcapCoinString).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let colPrice = {
                price: price_coin.toFixed(priceLength).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                changeIsPositive: true
            };
            let colTokens = Math.floor(coin.available_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
            let colChange1h = percent_change_1h.toFixed(1);
            let colChange24h = percent_change_24h.toFixed(1);
            let colSpacer = null;
            let marketcapDataRow = [colRank, colIcon, colName, colMarketCap, colPrice, colTokens, colChange1hTemp, colChange24hTemp, colSpacer];
            marketcapDataArray.push(marketcapDataRow);
        });
        for (i = 0; i < marketcapDataArray.length; i++) { 
        
            // 24h change
            let factor_24h = marketcapDataArray[i][7] * p0_24h_curr_usd;
            let change_24h = 0;
            if ( factor_24h >= 1 ) {
                change_24h = +( factor_24h - 1 ) * 100;
            } else {
                change_24h = -( 1 - factor_24h ) * 100;
            }
            marketcapDataArray[i][7] = change_24h.toFixed(2);
            
            
            // 1h change
            let factor_1h = marketcapDataArray[i][6] * p0_1h_curr_usd;
            let change_1h = 0;
            if ( factor_1h >= 1 ) {
                change_1h = +( factor_1h - 1 ) * 100;
            } else {
                change_1h = -( 1 - factor_1h ) * 100;
            }
            marketcapDataArray[i][6] = change_1h.toFixed(2);

            //changeIsPositive boolean
            marketcapDataArray[i][4].changeIsPositive = ( change_1h >= 0 );
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