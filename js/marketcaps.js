let marketcapDataArray = [];
let marketcapCurrency = '';
let table = $('#marketcaps-table').DataTable({
  responsive: true,
  pageLength: 100,
  processing: true,
  /* l (Length changing), f (Filtering input), t (The Table!), i(Information), p (Pagination), r (pRocessing) */
  dom: 'rt<"marketcaps-table-bottom"ip>',
  language: {
    lengthMenu: 'Items _MENU_',
    zeroRecords: 'No se han encontrado resultados',
    info: 'Página _PAGE_ de _PAGES_',
    infoEmpty: 'No hay información disponible',
    search: 'Buscar:',
    infoFiltered: '(filtrado entre _MAX_ monedas)',
    loadingRecords: 'Cargando...',
    emptyTable: 'Error de conexión, tu Adblock bloquea la API de cotizaciones.',
    paginate: {
      'first': 'Primera',
      'last': 'Última',
      'next': '<span class="icon-chevron-right"></span>',
      'previous': '<span class="icon-chevron-left"></span>'
    },
    processing: "<div class='loader' style='display:block'></div>"
  },
  columns: [
    {
      responsivePriority: 3,
      title: '#',
      className: 'dt-center',
      searchable: false
    },
    { // Icon
      responsivePriority: 2,
      title: '',
      render: function ( data, type, row, meta ) {
        let imageSrc = '';
        if (coins[data]) {
          imageSrc = '/images/general/cryptocurrencies/' + coins[data].icon;
        } else {
          imageSrc = 'https://www.livecoinwatch.com/public/currencies/32/' + data + '.png';
        }
        return '<div class="marketcaps-icon"><img src="' + imageSrc + '" /></div>';
      },
      orderable: false,
      searchable: false
    },
    {
      responsivePriority: 1,
      title: 'Nombre',
      className: 'dt-left marketcaps-table-column-name',
      render: function ( data, type, row, meta ) {
        if ( type === 'filter' ) { return data.symbol + ' ' + data.name; } else if ( type === 'sort' ) { return data.symbol; } else if ( type === 'display' ) {
          let name = data.name;
          if (coins[data.symbol.toLowerCase()]) {
            name = "<a rel='nofollow' href='" + coins[data.symbol.toLowerCase()].website + "'>" + data.name + '</a>';
          }
          return "<span class='marketcap-symbol'>" + data.symbol + '</span>' + "<br/><span class='marketcaps-coinname'>" + name + '</span>';
        }
        return data.symbol;
      }
    },
    {
      responsivePriority: 6,
      title: 'Cotización',
      className: 'dt-right',
      render: function (data) {
        return generateCurrencyValueHtml( data, marketcapCurrency );
      },
      searchable: false
    },
    {
      responsivePriority: 1,
      title: 'Precio',
      className: 'dt-right',
      render: function ( data, type, row, meta) {
        if ( type !== 'display' ) { return data.price; }
        if ( data.positiveChange > 0) {
          return '<div class="marketcaps-pricechange-positive">' + generateCurrencyValueHtml( data.price, marketcapCurrency ) + '&nbsp;<span class="carot-icon">▲</span></div>';
        }
        return '<div class="marketcaps-pricechange-negative">' + generateCurrencyValueHtml( data.price, marketcapCurrency ) + '&nbsp;<span class="carot-icon">▼</span></div>';
      },
      searchable: false
    },
    {
      responsivePriority: 7,
      title: 'Tokens en Circulación',
      className: 'dt-right',
      searchable: false
    },
    {
      responsivePriority: 8,
      title: '1h (%)',
      className: 'dt-right',
      render: function ( data, type, row, meta ) {
        if ( type !== 'display' ) { return data; }
        if ( data > 0) {
          return '<div class="marketcaps-pricechange-positive">' + data + '%&nbsp;<span class="carot-icon">▲</span></div>';
        }
        return '<div class="marketcaps-pricechange-negative">' + data + '%&nbsp;<span class="carot-icon">▼</span></div>';
      },
      searchable: false
    },
    {
      responsivePriority: 2,
      title: '24h (%)',
      className: 'dt-right',
      render: function ( data, type, row, meta ) {
        if ( type !== 'display' ) { return data; }
        if ( data > 0) {
          return '<div class="marketcaps-pricechange-positive">' + data + '%&nbsp;<span class="carot-icon">▲</span></div>';
        }
        return '<div class="marketcaps-pricechange-negative">' + data + '%&nbsp;<span class="carot-icon">▼</span></div>';
      },
      searchable: false
    },
    { // Spacer column
      responsivePriority: 100,
      width: '0px',
      title: '',
      orderable: false,
      className: 'marketcaps-table-column-spacer',
      searchable: false
    }
  ]
});
function marketcapTableLoad( currency ) {
  table.processing( true );
  marketcapCurrency = currency;
  let getUrl = 'https://api.coinmarketcap.com/v1/ticker/?convert=' + currency + '&limit=300';
  marketcapDataArray = [];

  $('#marketcaps-currency-select').val(currency);
  $.get( getUrl, function ( response ) {
    if (window.location.pathname === '/cotizaciones/') {
      $.each(response, function (index, coin) {
        let colSpacer = null;
        let priceLength = '';
        let colRank = coin.rank;
        let colIcon = coin.symbol.toLowerCase();
        let colName = {
          symbol: coin.symbol,
          name: coin.name
        };
        let marketCapString = coin['market_cap_' + currency.toLowerCase()];
        let colMarketCap = Math.floor(marketCapString).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        let colTokens = Math.floor(coin.available_supply).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        let priceString = coin['price_' + currency.toLowerCase()];

        if ((currency !== 'USD') && (currency !== 'EUR')) {
          priceLength = 10;
        } else {
          priceLength = 2;
        }

        let colPrice = {
          price: parseFloat(priceString).toFixed(priceLength).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
          positiveChange: (parseFloat(coin.percent_change_1h).toFixed(1) > 0)
        };
        let colChange1h = parseFloat(coin.percent_change_1h).toFixed(1);
        let colChange24h = parseFloat(coin.percent_change_24h).toFixed(1);
        let marketcapDataRow = [colRank, colIcon, colName, colMarketCap, colPrice, colTokens, colChange1h, colChange24h, colSpacer];

        marketcapDataArray.push(marketcapDataRow);
      });
    }
  })
    .success(function (response) {
      table.clear();
      table.rows.add( marketcapDataArray );
      table.draw();
      table.columns.adjust();
      table.responsive.recalc();
    })
    .always(function () {
      table.processing( false );
    });
}

$('#marketcaps-filter-input').keyup(function () {
  table.search($(this).val()).draw();
});

$('#marketcaps-currency-select').change(function () {
  let selectedCurrency = $('#marketcaps-currency-select').val();

  if (isLocalStorageAvailable) {
    let criptomo = JSON.parse(localStorage.getItem('criptomo'));
    if (!criptomo) {
      criptomo = {};
    }
    criptomo.currency = selectedCurrency;
    localStorage.setItem('criptomo', JSON.stringify(criptomo));
  }
  marketcapTableLoad(selectedCurrency);
});

$('#marketcaps-pagelength-select').change(function () {
  let selected = $('#marketcaps-pagelength-select').val();
  let pageLength = parseInt(selected, 10) || 100;
  table.page.len( pageLength ).draw();
});

$(document).ready(function () {
  let selectedCurrency = '';
  if (isLocalStorageAvailable) {
    let criptomo = JSON.parse(localStorage.getItem('criptomo'));
    if (criptomo && criptomo.currency) {
      selectedCurrency = criptomo.currency;
    }
  }
  selectedCurrency = selectedCurrency || 'USD';
  marketcapTableLoad(selectedCurrency);
});

function generateCurrencyValueHtml( price, currency ) {
  let symbol = '';
  switch ( currency ) {
  case 'EUR':
    symbol = price + '&nbsp;€';
    break;
  case 'USD':
    symbol = '$' + price;
    break;
  default:
    symbol = price + '&nbsp;' + currency.toUpperCase();
  }
  return symbol;
}
