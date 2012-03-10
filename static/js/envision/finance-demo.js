$(function () {

  var
    Editor = Flotr.Examples.Editor,
    container = document.getElementById('demo'),
    editor;

  editor = new Editor(container, {
    example : example
  });

/*
  example(container);
  for (var i = 1; i < 4; i++) {
    example(document.getElementById('finance-demo' + i));
  }
*/

  function example (container) {

    var
      V = envision,
      options, vis;

    options = {
      container : container,
      data : {
        price : financeData.price,
        volume : financeData.volume,
        summary : financeData.price
      },
      trackFormatter : function (o) {

        var
          data = financeData,
          index = o.index,
          value;

        value = data.summaryTicks[index].date + ': $' + data.price[1][index] + ", Vol: " + data.volume[1][index];

        return value;
      },
      xTickFormatter : function (index) {
        var date = new Date(financeData.summaryTicks[index].date);
        return date.getFullYear() + '';
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

    vis = new envision.templates.Finance(options);

  }
});

