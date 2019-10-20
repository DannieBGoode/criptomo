// enable/disable dropdown with custom option
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


// handle errors and apply red colors
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

// update minimum data selectable
function updateInputMinDate() {
  let minDate = $( '#invest-currency option:selected' ).attr('min');
  $('#invest-date').attr('min', minDate);
  if ($('#invest-date').val() < minDate) {
    $('#invest-date').val(minDate);
  }
}