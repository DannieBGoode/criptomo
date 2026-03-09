let lang = $("html").attr('lang'),
  locationPath = window.location.pathname,
  tableDataLang = {};

function getTableDataLang(currentLang) {
  let data = {};

  if (currentLang === 'es') {
    data.general = {
      lengthMenu: 'Items _MENU_',
      zeroRecords: 'No se han encontrado resultados',
      info: 'PÃ¡gina _PAGE_ de _PAGES_',
      infoEmpty: 'No hay informaciÃ³n',
      search: 'Buscar:',
      infoFiltered: '(filtrado entre _MAX_ monedas)',
      loadingRecords: 'Cargando...',
      emptyTable: 'Tabla vacÃ­a',
      paginate: {
        'first': 'Primera',
        'last': 'Ãšltima',
        'next': '<span class="icon-chevron-right"></span>',
        'previous': '<span class="icon-chevron-left"></span>'
      },
      processing: "<div class='loader' style='display:block'></div>"
    };
    data.investmentColumns = {
      date: 'Fecha',
      totalSpent: 'InversiÃ³n',
      totalCC: 'Criptomonedas',
      purchasePrice: 'Precio de compra',
      investmentValue: 'Valor en fecha'
    };
    data.marketcapColumns = {
      name: 'Nombre',
      marketcap: 'CotizaciÃ³n',
      price: 'Precio',
      tokens: 'Tokens en CirculaciÃ³n'
    };
    data.priceColumns = {
      maximum: 'MÃ¡ximo HistÃ³rico',
      date: 'Fecha',
      price: 'Precio',
      bet: 'Si esta moneda vuelve a mÃ¡ximo histÃ³rico, $1000 invertidos hoy serÃ­an: '
    };
    data.icoColumns = {
      name: 'Nombre',
      raised: 'Recolectado',
      price: 'Precio Actual',
      icoPrice: 'Precio en ICO',
      gains: 'Ganancias'
    };
    data.global = {
      today: 'Hoy'
    };
  } else if (currentLang === 'en') {
    data.general = {
      lengthMenu: 'Items _MENU_',
      zeroRecords: 'No data found',
      info: 'Page _PAGE_ of _PAGES_',
      infoEmpty: 'No data available',
      search: 'Search:',
      infoFiltered: '(filtering within _MAX_ monedas)',
      loadingRecords: 'Loading...',
      emptyTable: 'No Data',
      paginate: {
        'first': 'First',
        'last': 'Last',
        'next': '<span class="icon-chevron-right"></span>',
        'previous': '<span class="icon-chevron-left"></span>'
      },
      processing: "<div class='loader' style='display:block'></div>"
    };
    data.investmentColumns = {
      date: 'Date',
      totalSpent: 'Total Spent',
      totalCC: 'Cryptocurrency',
      purchasePrice: 'Purchase Price',
      investmentValue: 'Value'
    };
    data.marketcapColumns = {
      name: 'Name',
      marketcap: 'Marketcap',
      price: 'Price',
      tokens: 'Tokens in Circulation'
    };
    data.priceColumns = {
      maximum: 'All Time High',
      date: 'Date',
      price: 'Price',
      bet: 'If this coin returns to ATH, $1000 invested today would be: '
    };
    data.icoColumns = {
      name: 'Name',
      raised: 'Raised',
      price: 'Curent Price',
      icoPrice: 'ICO Price',
      gains: 'Profits'
    };
    data.global = {
      today: 'Today'
    };
  }

  return data;
}

tableDataLang = getTableDataLang(lang);

if (typeof module !== 'undefined') {
  module.exports = {
    getTableDataLang: getTableDataLang,
    lang: lang,
    locationPath: locationPath,
    tableDataLang: tableDataLang
  };
}
