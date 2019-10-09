Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();
var Today = (new Date).toISOString().split('T')[0];

alert(date.addDays(5));

// change selected user.date to format yyyy-mm-dd

var investment          = {
    date: $('#invest-date').val(),
    oldValue: $('#invest-quantity').val(),
    tokenSymbol: $('#invest-currency').val(),
    tokenName: $( '#invest-currency option:selected' ).text(),
    fiat: $('#invest-fiat').val()
};

$.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + investment.date + '&currency=' + investment.fiat)
  .success(function (data) {
    conole.log(data);
  })
  .error(function () {
    handleError('date');
  })
  .always(function () {
    loading('off');
  });
 
let results = 0;
let totalCC = 0;
let totalSpent = 0;

while (user.date < Today)
{
    results.totalCC += user.amount / data.bpi.date;
    results.totalSpent += user.amount;

    date.addDays(user.selectedInterval);
}

results.currentInvestment = date.bpi.today * totalCC;
