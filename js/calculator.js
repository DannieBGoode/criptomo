
function calculateEarnings() {

    var currentPrice     = parseFloat($("#sidebar-ticker-bitcoin .ticker-price").html().replace(/,/g, '')),
        selectedDate     = $("#invest-date").val(),
        investedQuantity = $("#invest-quantity").val();

    if (selectedDate) {
        $.get( "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + selectedDate + "&end=" + selectedDate, function( response ) {
            var oldPrice        = JSON.parse(response).bpi[selectedDate],
                boughtBitcoins  = parseFloat(parseFloat(investedQuantity) / parseFloat(oldPrice)).toFixed(3),
                currentValue    = parseFloat(currentPrice * boughtBitcoins).toFixed(2);

            $("#number-bitcoins").html(boughtBitcoins);
            $("#valued-amount").html(currentValue);
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
        });
    } else {
        // añadir borde rojo al input de invest-date.
        console.log("error");
        $("#results").hide();
    }
}