Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

let date = new Date();
let Today = (new Date).toISOString().split('T')[0];

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
    console.log(data);
  })
  .error(function () {
    handleError('date');
  })
  .always(function () {
    loading('off');
  });
 
let results = [];

results[0] = {
    totalCC = user.amount / data.bpi.date,
    totalSpent = user.amount
};

let date = user.date;

for (i = 1; date < Today; i++)
{
    results[i] = {};
    results[i].totalCC += results[i - 1].totalCC + (user.amount / data.bpi.date);
    results[i].totalSpent += results[i - 1].totalSpent + user.amount;
    results[i].investmentValue = results[i].totalCC * data.bpi.date;

    date.addDays(user.selectedInterval);
}

results.currentInvestment = date.bpi.today * totalCC;
