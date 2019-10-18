let investmentDataArray = [];

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function calculateEarnings() {

  table.processing( true );
  let investment          = {
      date: $('#invest-date').val(),
      amount: parseInt($('#invest-quantity').val()),
      tokenSymbol: $('#invest-currency').val(),
      tokenName: $('#invest-currency option:selected' ).text(),
      selectedInterval: parseInt($('#invest-interval').val()),
      fiat: $('#invest-fiat').val(),
      today: new Date().toISOString()
  };

  // console.log(investment);

  $.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + investment.date + '&end=' + investment.today.split('T')[0] + '&currency=' + investment.fiat)
    .success(function (data) {
      // console.log(data);
      // loading('on');
      let investmentDataArray = [];
      data = JSON.parse(data);

      let date = new Date(investment.date);
      let dateFormatted =  date.toISOString().split('T')[0];
      let results = [];

      results[0] = {
          totalCC: parseFloat(investment.amount / data.bpi[dateFormatted]).toFixed(6),
          totalSpent: investment.amount,
          date: dateFormatted,
          purchasePrice: data.bpi[dateFormatted]
      };

      results[0].investmentValue = parseFloat(results[0].totalCC * data.bpi[dateFormatted]).toFixed(2);

      investmentDataArray.push(results[0]);

      for (let i = 1; date.toISOString() < investment.today; i++)
      {

          results[i] = {};
          results[i].totalCC = parseFloat(parseInt(results[i - 1].totalCC) + investment.amount / data.bpi[dateFormatted]).toFixed(6);
          results[i].totalSpent = parseInt(results[i - 1].totalSpent) + investment.amount;
          results[i].investmentValue = parseFloat(results[i].totalCC * data.bpi[dateFormatted]).toFixed(2);
          results[i].purchasePrice = data.bpi[dateFormatted];
          results[i].date = dateFormatted;

          investmentDataArray.push(results[i]);

          date = date.addDays(investment.selectedInterval);
          dateFormatted =  date.toISOString().split('T')[0];
      }

      $.get('https://min-api.cryptocompare.com/data/price?fsym=' + investment.tokenSymbol + '&tsyms=' + investment.fiat)
        .success(function (data) {
          results.currentInvestment = data[investment.fiat] * results[results.length - 1].totalCC;

          $('#result-tokencount').html(results[results.length - 1].totalCC.toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
          $('#result-tokentype').html(investment.tokenSymbol);
          $('#result-fiat').html(investment.fiat);
          $('#result-currentvalue').html(parseFloat(results.currentInvestment).toFixed(2).toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
          $('#calculator-results').show();

          table.clear();
          table.rows.add( investmentDataArray );
          table.draw();
          table.columns.adjust();
          table.responsive.recalc();
          
        })
        .error(function () {
        handleError('date');
      })
      .always(function () {
        // loading('off');
        table.processing( false );
      });
    })
    .error(function () {
      handleError('date');
      table.processing( false );
    })
    .always(function () {
      // loading('off');
      table.processing( false );
    });
}
 

let table = $('#investment-table').DataTable({
  responsive: true,
  pageLength: 100,
  processing: true,
  language: {
    lengthMenu: 'Items _MENU_',
    zeroRecords: 'No se han encontrado resultados',
    info: 'Página _PAGE_ de _PAGES_',
    infoEmpty: 'No hay información disponible',
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
  },
  columns: [
    { 
      responsivePriority: 1,
      data:  'date',
      title: 'Fecha',
      render: function (data) {
        return '<small>' + data + '</small>';
      },
    },
    {
      responsivePriority: 4,
      data:  'totalSpent',
      title: 'Inversión',
      render: function (data) {
        return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + '<small>' + $('#invest-fiat').val() + '</small>';
      },
    },
    {
      responsivePriority: 3,
      data:  'totalCC',
      title: 'Criptomonedas',
      render: function (data) {
        return data.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + '<small>' + $('#invest-currency').val() + '</small>';
      },
    },
    {
      responsivePriority: 5,
      data:  'purchasePrice',
      title: 'Precio de compra',
      render: function (data) {
        return parseFloat(data).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + '<small>' + $('#invest-fiat').val() + '</small>';
      },
    },
    {
      responsivePriority: 2,
      data:  'investmentValue',
      title: 'Valor en fecha',
      render: function (data) {
        return data.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' ' + '<small>' + $('#invest-fiat').val() + '</small>';
      },
    }
  ]
});

$('#invest-currency').change(function () {
  var selected = $('option:selected', this).attr('class');
  var optionText = $('.editable').text();

  if (selected === 'editable') {
    $('.calculator-othercoins').show();

    $('.calculator-othercoins').keyup(function () {
      var editText = $('.calculator-othercoins').val();
      $('.editable').val(editText);
      $('.calculator-othercoins').focus();
    });
  } else {
    $('.calculator-othercoins').hide();
    $('.calculator-othercoins').val('');
  }
});

function handleError(type) {
  if (type === 'currency') {
    $('.calculator-othercoins').addClass('input-error');
    $('.coin-error').show();
  } else {
    $('#invest-date').addClass('input-error');
    $('.date-error').show();
  }
  $('#calculator-results').hide();
}