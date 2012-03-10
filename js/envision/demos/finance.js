$(function () {
  $('#demos').mousedown(function (e) {
    if ($(e.target).closest('.image').length) {
      $('body').addClass('no-select');
    } else {
      console.log('removing');
      $('body').removeClass('no-select');
    }
  }).mouseup(function (e) {
    $('body').removeClass('no-select');
  });

  var
    Editor = Flotr.Examples.Editor,
    container = document.getElementById('demo'),
    editor;

  if (container) {
    editor = new Editor(container, {
      example : example
    });
  } else {
    example(document.getElementById('finance-demo'));
  }

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

