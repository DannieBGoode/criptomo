let marketcapDataArray = [];
let marketcapCurrency = '';
let table = $('#marketcaps-table').DataTable({
  responsive: true,
  pageLength: 100,
  processing: true,
  /* l (Length changing), f (Filtering input), t (The Table!), i(Information), p (Pagination), r (pRocessing) */
  dom: 'rt<"marketcaps-table-bottom"ip>',
  language: tableDataLang.general,
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
          if (coins[data].icon) {
            imageSrc = '/images/general/cryptocurrencies/' + coins[data].icon;  
          }
          else {
            imageSrc = iconsBaseUrl + coins[data].symbol + '.png';  
          }
          
        } else {
          imageSrc = iconsBaseUrl + data + '.png';
        }
        return '<div class="marketcaps-icon"><img alt="' + data + '" src="' + imageSrc + '" /></div>';
      },
      orderable: false,
      searchable: false
    },
    { // Name
      responsivePriority: 1,
      title: tableDataLang.marketcapColumns.name,
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
    { // Marketcap
      responsivePriority: 6,
      title: tableDataLang.marketcapColumns.marketcap,
      className: 'dt-right',
      render: function (data) {
        return generateCurrencyValueHtml( data, marketcapCurrency );
      },
      searchable: false
    },
    { // Price
      responsivePriority: 1,
      title: tableDataLang.marketcapColumns.price,
      className: 'dt-center',
      render: function ( data, type, row, meta) {
        if ( type !== 'display' ) { return data.price; }
        let max = '';
        let bet = '';
        if ((parseFloat(data.extreme.usd) === parseFloat(data.price)) && ((marketcapCurrency === 'USD') || (marketcapCurrency === 'EUR'))) {
          max = '<sup><small class="marketcaps-price-max">MAX</small></sup> ';
        } else {
          let formatDate = toShortFormat(new Date(data.extreme.date));
          let currency = marketcapCurrency;
          
          if ((currency === 'BTC') || (currency === 'ETH')) {
            currency = 'USD';
          }
          max = `<div class="tooltip">
                  <sup><small>MAX</small></sup> 
                  <small class="tooltiptext">` + tableDataLang.priceColumns.maximum + `:</br>` + 
                    tableDataLang.priceColumns.date + `: ` + formatDate + `</br>` + 
                    tableDataLang.priceColumns.price + `: ` + parseFloat(data.extreme.usd).toFixed(2) + ` ` + currency + `
                  </small>
                </div> `;
          bet = ` <div class="tooltip">
                    <sub><small>BET</small></sub>
                    <small class="tooltiptext"> `+ tableDataLang.priceColumns.bet + data.bet1000 + ` ` + currency + `
                    </small>
                  </div>`;
        }
        if ( data.positiveChange > 0) {
          return '<div style="display:flex"><div class="tooltip-container">' + max + bet + '</div><span class="marketcaps-pricechange-positive">&nbsp;' + generateCurrencyValueHtml( data.price, marketcapCurrency ) + '&nbsp;<span class="carot-icon">&#9650;</span></span></div>';
        }
        return '<div style="display:flex"><div class="tooltip-container">' + max + bet + '</div><span class="marketcaps-pricechange-negative">&nbsp;' + generateCurrencyValueHtml( data.price, marketcapCurrency ) + '&nbsp;<span class="carot-icon">&#9660;</span></span></div>';
      },
      searchable: false
    },
    {
      responsivePriority: 9,
      title: tableDataLang.marketcapColumns.tokens,
      className: 'dt-center',
      searchable: false
    },
    {
      responsivePriority: 8,
      title: '1h (%)',
      className: 'dt-center',
      render: function ( data, type, row, meta ) {
        if ( type !== 'display' ) { return data; }
        if (Number.isNaN(data)) {
          return '<div class="marketcaps-pricechange-neutral">-%</div>';
        }
        if ( data > 0) {
          return '<div class="marketcaps-pricechange-positive">' + data + '%&nbsp;<span class="carot-icon">&#9650;</span></div>';
        }
        return '<div class="marketcaps-pricechange-negative">' + data + '%&nbsp;<span class="carot-icon">&#9660;</span></div>';
      },
      searchable: false
    },
    {
      responsivePriority: 2,
      title: '24h (%)',
      className: 'dt-center',
      render: function ( data, type, row, meta ) {
        if ( type !== 'display' ) { return data; }
        if (Number.isNaN(data)) {
          return '<div class="marketcaps-pricechange-neutral">-%</div>';
        }
        if ( data > 0) {
          return '<div class="marketcaps-pricechange-positive">' + data + '%&nbsp;<span class="carot-icon">&#9650;</span></div>';
        }
        return '<div class="marketcaps-pricechange-negative">' + data + '%&nbsp;<span class="carot-icon">&#9660;</span></div>';
      },
      searchable: false
    },
    {
      responsivePriority: 8,
      title: '7D</br>(%)',
      className: 'dt-center',
      render: function ( data, type, row, meta ) {
        if ( type !== 'display' ) { return data; }
        if (Number.isNaN(data)) {
          data = '-';
        }
        let classVariation = '';
        let carot = '';
        if ( data > 0) {
          classVariation = 'marketcaps-pricechange-positive';
          carot = '&#9650;';
        } else if (data < 0) {
          classVariation = 'marketcaps-pricechange-negative'; 
          carot = '&#9660;';
        }
        return '<span class="' + classVariation + '">' + data + '%&nbsp;<span class="carot-icon">' + carot + '</span></span>';
      },
      searchable: false
    },
    {
      responsivePriority: 8,
      title: '1Y</br>(%)',
      className: 'dt-center',
      render: function ( data, type, row, meta ) {
        if ( type !== 'display' ) { return data; }
        if (Number.isNaN(data)) {
          data = '-';
        }
        let classVariation = '';
        let carot = '';
        if ( data > 0) {
          classVariation = 'marketcaps-pricechange-positive';
          carot = '&#9650;';
        } else if (data < 0) {
          classVariation = 'marketcaps-pricechange-negative'; 
          carot = '&#9660;';
        }
        return '<span class="' + classVariation + '">' + data + '%&nbsp;<span class="carot-icon">' + carot + '</span></span>';
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

function normalizeDeltaChange(deltaValue) {
  const parsedDelta = parseFloat(deltaValue);

  if (!Number.isFinite(parsedDelta)) {
    return Number.NaN;
  }

  return (100 - parsedDelta * 100).toFixed(1) * (-1);
}

function getExtremeValue(coin, fallbackPrice) {
  if (coin && coin.extremes && coin.extremes.all && coin.extremes.all.max) {
    const extreme = coin.extremes.all.max;
    if (Number.isFinite(parseFloat(extreme.usd))) {
      return extreme;
    }
  }

  return {
    usd: fallbackPrice,
    date: new Date().toISOString().split('T')[0]
  };
}

function createMarketcapRow(coin, currency) {
  if (!coin || !coin.code || !coin.name) {
    return null;
  }

  const cap = parseFloat(coin.cap);
  const circulating = parseFloat(coin.circulating);
  const price = parseFloat(coin.price);

  if (!Number.isFinite(cap) || !Number.isFinite(circulating) || !Number.isFinite(price)) {
    return null;
  }

  const colSpacer = null;
  const priceLength = (currency !== 'USD') && (currency !== 'EUR') ? 10 : 2;
  const colRank = coin.rank;
  const colIcon = coin.code.toLowerCase();
  const colName = {
    symbol: coin.code,
    name: coin.name
  };
  const colMarketCap = Math.floor(cap).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const colTokens = Math.floor(circulating).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const extreme = getExtremeValue(coin, price);
  const colPrice = {
    price: price.toFixed(priceLength).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'),
    positiveChange: (parseFloat(coin.delta && coin.delta.second) >= 1),
    extreme: extreme,
    bet1000: price === 0
      ? '0.00'
      : (1000 / price * parseFloat(extreme.usd)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  };
  const colChange1h = normalizeDeltaChange(coin.delta && coin.delta.hour);
  const colChange24h = normalizeDeltaChange(coin.delta && coin.delta.day);
  const colChange7D = normalizeDeltaChange(coin.delta && coin.delta.week);
  const colChange1Y = normalizeDeltaChange(coin.delta && coin.delta.year);

  return [colRank, colIcon, colName, colMarketCap, colPrice, colTokens, colChange1h, colChange24h, colChange7D, colChange1Y, colSpacer];
}

function marketcapTableLoad( currency ) {
  table.processing( true );
  marketcapCurrency = currency;
  let getUrl = 'https://http-api.livecoinwatch.com/coins?offset=0&limit=' + marketcapsCoinsLimit + '&sort=rank&order=ascending&currency=' + currency;
  // let getUrl = 'https://api.coinmarketcap.com/v1/ticker/?convert=' + currency + '&limit=300';
  marketcapDataArray = [];

  $('#marketcaps-currency-select').val(currency);
  $.get( getUrl, function ( response ) {
      if (!response || !Array.isArray(response.data)) {
        return;
      }

      $.each(response.data, function (index, coin) {
        const marketcapDataRow = createMarketcapRow(coin, currency);

        if (marketcapDataRow) {
          marketcapDataArray.push(marketcapDataRow);
        }
      });
  })
    .success(function (response) {
      if (!response || !Array.isArray(response.data)) {
        $('.api-error').show();
        return;
      }

      table.clear();
      table.rows.add( marketcapDataArray );
      table.draw();
      table.columns.adjust();
      table.responsive.recalc();
    })
    .error(function(response) {
      $('.api-error').show();
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

  if (isLocalStorageAvailable()) {
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

function initMarketcapsPage() {
  let selectedCurrency = '';
  if (isLocalStorageAvailable()) {
    let criptomo = JSON.parse(localStorage.getItem('criptomo'));
    if (criptomo && criptomo.currency) {
      selectedCurrency = criptomo.currency;
    }
  }
  selectedCurrency = selectedCurrency || 'USD';
  marketcapTableLoad(selectedCurrency);
}
$(document).ready(function () {
  initMarketcapsPage();
});

function generateCurrencyValueHtml( price, currency ) {
  let symbol = '';
  switch ( currency ) {
  case 'EUR':
    symbol = price + '&nbsp;&euro;';
    break;
  case 'USD':
    symbol = '$' + price;
    break;
  default:
    symbol = price + '&nbsp;' + currency.toUpperCase();
  }
  return symbol;
}

function isLocalStorageAvailable(){
    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

if (typeof module !== 'undefined') {
  module.exports = {
    createMarketcapRow: createMarketcapRow,
    generateCurrencyValueHtml: generateCurrencyValueHtml,
    initMarketcapsPage: initMarketcapsPage,
    isLocalStorageAvailable: isLocalStorageAvailable,
    marketcapTableLoad: marketcapTableLoad,
    normalizeDeltaChange: normalizeDeltaChange
  };
}
