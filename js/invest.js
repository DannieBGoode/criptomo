Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();

alert(date.addDays(5));


$.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2014-12-10&currency=user.currency)
  .success(function (data) {
    
  })
  .error(function () {
    handleError('date');
  })
  .always(function () {
    loading('off');
  });
 

change selected user.date to format yyyy-mm-dd

while (user.date < Today)

results.totalCC += user.amount / data.bpi.date;
results.totalSpent += user.amount;

date.addDays(user.selectedInterval);

end;

results.currentInvestment = date.bpi.today * totalCC;
