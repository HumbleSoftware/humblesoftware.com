$(function () {

  HSD.envisionExample('timeseries-demo', example);

  function example (container) {

    var
      V = envision,
      options, vis;

    options = {
      container : container,
      data : {
        detail : financeData.price,
        summary : financeData.price
      },
      // An initial selection
      selection : {
        data : {
          x : {
            min : 100,
            max : 200
          }
        }
      }
    };

    vis = new envision.templates.TimeSeries(options);

  }
});

