init();

function calculateEarnings() {
    var currentPrice        = parseFloat($("#sidebar-ticker-bitcoin .ticker-price").html().replace(/,/g, '')),
        investment          = {
            date: $("#invest-date").val(),
            oldValue: $("#invest-quantity").val(),
            tokenSymbol: $("#invest-currency").val(),
            tokenName: $( "#invest-currency option:selected" ).text(),
            fiat: $("#invest-fiat").val()
        };

    if (investment.date) {
        // start spinner gif
        var myDate = investment.date.split("-"),
            newDate = myDate[0] + "/" + myDate[1] + "/" + myDate[2],
            timestamp = Math.floor(new Date(newDate).getTime() / 1000 );

        $.get("https://min-api.cryptocompare.com/data/pricehistorical?fsym=" + investment.tokenSymbol + "&tsyms=" + investment.fiat + "&ts=" + timestamp)
            .success(function(response) {
                $(".input-error").removeClass("input-error");
                if ((response.Response !== 'Error') && (response[investment.tokenSymbol][investment.fiat] !== 0)) {
                    investment.oldPrice     = response[investment.tokenSymbol][investment.fiat];
                    $.get("https://min-api.cryptocompare.com/data/price?fsym=" + investment.tokenSymbol + "&tsyms=" + investment.fiat)
                        .success(function(response) {
                            investment.currentPrice = response[investment.fiat];
                        })
                        .error(function() {
                            handleError();
                        }).done(function() {
                            investment.tokensBought = parseFloat(parseFloat(investment.oldValue) / parseFloat(investment.oldPrice)).toFixed(3);
                            investment.currentValue = parseFloat(investment.currentPrice * investment.tokensBought).toFixed(2);
                            investment.percentageGained = parseFloat((investment.currentValue - investment.oldValue) / investment.oldValue).toFixed(2)*100;
                            paintResults(investment);                        
                        })
                    } else {
                        if (response.Response === 'Error') {
                            handleError('currency');
                        } else {
                            handleError('date');
                        }
                        
                    }


            })
            .error(function(error) {
                handleError('date');
            }); 
    } else {
        handleError('date');
    }
    // finish spinner gif

    function paintResults(investment) {
        $("#number-tokens").html(investment.tokensBought);
        $("#old-price").html(investment.oldPrice + " " + investment.fiat + "/" + investment.tokenSymbol);
        $("#token").html(investment.tokenSymbol);
        $("#valued-amount").html(investment.currentValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + " " + investment.fiat);
        
        let change = '';
        $("#gained-percentage").html(investment.percentageGained +  "%");
        if (investment.percentageGained > 0) {
            change = 'positive';
        } else {
            change = 'negative'
        }
        $("#gained-percentage").addClass("gained-percentage-" + change);
        $("#calculator-results").show();
    }

    function handleError(type){
        if (type === "currency") {
            $(".editOption").addClass("input-error");
        } else {
            $("#invest-date").addClass("input-error");    
        }
        $("#calculator-results").hide();
    }
}

function Today() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!

    let yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    return today = yyyy + '-' + mm + '-' + dd;
}
function updateInputMinDate() {
    let minDate = $( "#invest-currency option:selected" ).attr('min');
    $("#invest-date").attr('min', minDate);
    if ($("#invest-date").val() < minDate) {
        $("#invest-date").val(minDate);
    }

}

function toggleField(hideObj,showObj) {
  hideObj.disabled = true;        
  hideObj.style.display = 'none';
  showObj.disabled = false;   
  showObj.style.display = 'inline';
  showObj.focus();
}

// enable/disable dropdown with custom option
$('#invest-currency').change(function() {
    var selected = $('option:selected', this).attr('class');
    var optionText = $('.editable').text();

    if(selected === "editable") {
      $('.editOption').show();

      
      $('.editOption').keyup(function() {
          var editText = $('.editOption').val();
          $('.editable').val(editText);
          $('.editOption').focus();
      });
    } else {
      $('.editOption').hide();
      $('.editOption').val('');
    }
});

function init() {
    document.getElementById("invest-date").setAttribute("max", Today());
}