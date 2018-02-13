
function calculateEarnings() {

    var currentPrice     = parseFloat($("#sidebar-ticker-bitcoin .ticker-price").html().replace(/,/g, '')),
        selectedDate     = $("#invest-date").val(),
        investedQuantity = $("#invest-quantity").val();

    if (selectedDate) {
        // start spinner gif
        $.get( "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + selectedDate + "&end=" + selectedDate)
            .success(function(response) {
                $("#invest-date").removeClass("input-error")
                if (response) {
                    var oldPrice        = JSON.parse(response).bpi[selectedDate],
                        boughtBitcoins  = parseFloat(parseFloat(investedQuantity) / parseFloat(oldPrice)).toFixed(3),
                        currentValue    = parseFloat(currentPrice * boughtBitcoins).toFixed(2);

                    $("#number-bitcoins").html(boughtBitcoins);
                    $("#valued-amount").html(currentValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                    let percentage = parseFloat((currentValue - investedQuantity) / investedQuantity).toFixed(2)*100;
                    let change = '';
                    $("#gained-percentage").html(percentage +  "%");
                    if (percentage > 0) {
                        change = 'positive';
                    } else {
                        change = 'negative'
                    }
                    $("#gained-percentage").addClass("gained-percentage-" + change);
                    $("#calculator-results").show();
                } else {
                    $("#results").hide();
                }
            })
            .error(function(error, code) {
                handleError();
            });
    } else {
        handleError();
    }
    // finish spinner gif

    function handleError(){
        $("#invest-date").addClass("input-error");
    }
}