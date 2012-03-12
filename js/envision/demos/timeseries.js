$(function () {

  var
    Editor = Flotr.Examples.Editor,
    container = document.getElementById('demo'),
    editor;

  if (container) {
    editor = new Editor(container, {
      example : example
    });
  } else {
    example(document.getElementById('timeseries-demo'));
  }

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

