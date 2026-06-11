let lang = $("html").attr('lang'),
  locationPath = window.location.pathname,
  tableDataLang = {};

function getTableDataLang(currentLang) {
  let data = {};

  if (currentLang === 'es') {
    data.general = {
      lengthMenu: 'Items _MENU_',
      zeroRecords: 'No se han encontrado resultados',
      info: 'Página _PAGE_ de _PAGES_',
      infoEmpty: 'No hay información',
      search: 'Buscar:',
      infoFiltered: '(filtrado entre _MAX_ monedas)',
      loadingRecords: 'Cargando...',
      emptyTable: 'Tabla vacía',
      paginate: {
        'first': 'Primera',
        'last': 'Última',
        'next': '<span class="icon-chevron-right"></span>',
        'previous': '<span class="icon-chevron-left"></span>'
      },
      processing: "<div class='loader' style='display:block'></div>"
    };
    data.investmentColumns = {
      date: 'Fecha',
      totalSpent: 'Inversión',
      totalCC: 'Criptomonedas',
      purchasePrice: 'Precio de compra',
      investmentValue: 'Valor en fecha'
    };
    data.marketcapColumns = {
      name: 'Nombre',
      marketcap: 'Cotización',
      price: 'Precio',
      tokens: 'Tokens en Circulación'
    };
    data.priceColumns = {
      maximum: 'Máximo Histórico',
      date: 'Fecha',
      price: 'Precio',
      bet: 'Si esta moneda vuelve a máximo histórico, $1000 invertidos hoy serían: '
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
    data.global = {
      today: 'Today'
    };
  } else if (currentLang === 'de') {
    data.general = {
      lengthMenu: 'Einträge _MENU_',
      zeroRecords: 'Keine Ergebnisse gefunden',
      info: 'Seite _PAGE_ von _PAGES_',
      infoEmpty: 'Keine Informationen verfügbar',
      search: 'Suchen:',
      infoFiltered: '(gefiltert aus _MAX_ Coins)',
      loadingRecords: 'Wird geladen...',
      emptyTable: 'Leere Tabelle',
      paginate: {
        'first': 'Erste',
        'last': 'Letzte',
        'next': '<span class="icon-chevron-right"></span>',
        'previous': '<span class="icon-chevron-left"></span>'
      },
      processing: "<div class='loader' style='display:block'></div>"
    };
    data.investmentColumns = {
      date: 'Datum',
      totalSpent: 'Investiert',
      totalCC: 'Kryptowährung',
      purchasePrice: 'Kaufpreis',
      investmentValue: 'Wert'
    };
    data.global = {
      today: 'Heute'
    };
  } else if (currentLang === 'fr') {
    data.general = {
      lengthMenu: 'Éléments _MENU_',
      zeroRecords: 'Aucun résultat trouvé',
      info: 'Page _PAGE_ sur _PAGES_',
      infoEmpty: 'Aucune information disponible',
      search: 'Rechercher :',
      infoFiltered: '(filtré parmi _MAX_ coins)',
      loadingRecords: 'Chargement...',
      emptyTable: 'Tableau vide',
      paginate: {
        'first': 'Première',
        'last': 'Dernière',
        'next': '<span class="icon-chevron-right"></span>',
        'previous': '<span class="icon-chevron-left"></span>'
      },
      processing: "<div class='loader' style='display:block'></div>"
    };
    data.investmentColumns = {
      date: 'Date',
      totalSpent: 'Total investi',
      totalCC: 'Cryptomonnaie',
      purchasePrice: "Prix d'achat",
      investmentValue: 'Valeur'
    };
    data.global = {
      today: "Aujourd'hui"
    };
  } else if (currentLang === 'pt') {
    data.general = {
      lengthMenu: 'Itens _MENU_',
      zeroRecords: 'Nenhum resultado encontrado',
      info: 'Página _PAGE_ de _PAGES_',
      infoEmpty: 'Nenhuma informação disponível',
      search: 'Pesquisar:',
      infoFiltered: '(filtrado entre _MAX_ moedas)',
      loadingRecords: 'Carregando...',
      emptyTable: 'Tabela vazia',
      paginate: {
        'first': 'Primeira',
        'last': 'Última',
        'next': '<span class="icon-chevron-right"></span>',
        'previous': '<span class="icon-chevron-left"></span>'
      },
      processing: "<div class='loader' style='display:block'></div>"
    };
    data.investmentColumns = {
      date: 'Data',
      totalSpent: 'Total investido',
      totalCC: 'Criptomoeda',
      purchasePrice: 'Preço de compra',
      investmentValue: 'Valor'
    };
    data.global = {
      today: 'Hoje'
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
