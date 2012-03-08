!function () {
  var
    container = document.getElementById('finance-demo'),
    options, vis;

  options = {
    container : container,
    data : {
      price : financeData.price,
      volume : financeData.volume,
      summary : financeData.summary
    }
  };

  console.log(options);

  vis = new envision.templates.Finance(options);

}();
