let lang = $("html").attr('lang'),
	locationPath = window.location.pathname,
	tableDataLang = {};

// investment table
if ((locationPath === '/en/investment/') || (locationPath === '/inversion/') || (locationPath === '/cotizaciones/') || (locationPath === '/en/marketcaps/')) {
	if (lang === 'es') {
	  tableDataLang.general = {
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
	  tableDataLang.investmentColumns = {
	  	date: 'Fecha',
	  	totalSpent: 'Inversión',
	  	totalCC: 'Criptomonedas',
	  	purchasePrice: 'Precio de compra',
	  	investmentValue: 'Valor en fecha'
	  },
	  tableDataLang.marketcapColumns = {
	  	name: 'Nombre',
	  	marketcap: 'Cotización',
	  	price: 'Precio',
	  	tokens: 'Tokens en Circulación'
	  },
	  tableDataLang.global =  {
	  	today: 'Hoy'
	  }
	}
	else if (lang === 'en') {
		tableDataLang.general = {
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
		tableDataLang.investmentColumns = {
			date: 'Date',
			totalSpent: 'Total Spent',
			totalCC: 'Cryptocurrency',
			purchasePrice: 'Purchase Price',
			investmentValue: 'Value'
		},
		tableDataLang.marketcapColumns = {
			name: 'Name',
			marketcap: 'Marketcap',
			price: 'Price',
			tokens: 'Tokens in Circulation'
		},
		tableDataLang.global =  {
			today: 'Today'
		}
	}
}
