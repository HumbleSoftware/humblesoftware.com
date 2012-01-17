$(function () {
  var
    container = $('.project-flotr-demo')[0];

  if (container) {
    var
      d1 = [],
      d2 = [],
      d3 = [],
      d4 = [],
      data,
      graph, i, r, x = 0;

    // Data Generation
    for (i = 0; i <= 15; i += 0.5) {
      d1.push([i, i / 2]);
      d2.push([i, i + Math.sin(i+Math.PI)]);
      d3.push([i, 15-Math.cos(i)]);
    }

    for (i = 0; i <= 10; i += 2) {
      r = 22 - 2 * i;
      d4.push([x, 6 + x / 1.3, r]);
      x += Math.sqrt(r) / 1.8;
    }

    data = [
      { bars : { show : true, barWidth : .4 }, shadow : false, data : d1, label :'x / 2' },
      { lines : { show : true }, data : d2, label :'x + sin(x+π)' },
      { points : { show : true }, data : d3, label :'15 - cos(x)' },
      { bubbles : { show : true }, data : d4 }
    ];

    // Draw graph
    graph = Flotr.draw(container, data, {
      title : 'Flotr 2',
      legend : {
        position : 'se',            // Position the legend 'south-east'.
        labelFormatter : function (label) {
          return 'f(x) = ' + label;
        },
        backgroundColor : '#D2E8FF' // A light blue background color.
      },
      mouse : {
        track : true,
        trackY : false,
        position : 'ne',
        trackDecimals : 4,
        trackFormatter : function (o) {
          var
            x = Number(o.x),
            y = Number(o.y),
            f = o.series.label;
          if (f) {
            f.replace(/x/g, x);
            return f + ' = ' + y;
          } else {
            return '(' + x + ', ' + y + ')';
          }
        }
      },
      HtmlText : true,
      xaxis : {
        min : 0,
        max : 15
      },
      grid : {
        verticalLines : false
      }
    });
  }
});
