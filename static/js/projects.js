$(function () {
  var
    a = $('.project-flotr-demo.a'),
    b = $('.project-flotr-demo.b'),
    link = $('.project-flotr-demo-link'),
    href = link.attr('href'),
    examples = [
      'basic',
      'basic-bars',
      'basic-bars-horizontal',
      'basic-bar-stacked',
      'basic-axis',
      'basic-pie',
      'basic-candle',
      'basic-bubble',
      'basic-radar',
      'color-gradients',
      'negative-values'
    ],
    fadeTime = 300,
    interval = 3400,
    index = 1,
    timeout;

  // Init
  b.css({
    'visibility' : 'hidden',
    'opacity' : 0
  });

  execute(examples[0], a[0]);
  execute(examples[1], b[0]);
  setLink(examples[0]);

  // Rotation
  function intervalCallback () {
    swapGraphs();
    timeout = setTimeout(intervalCallback, interval);
  }
  timeout = setTimeout(intervalCallback, interval - 2 * fadeTime);

  // Hover pause rotation
  link.hover(function () {
      clearTimeout(timeout);
    }, function () {
      timeout = setTimeout(intervalCallback, interval - 2 * fadeTime);
  });

  function swapGraphs () {
    a.fadeOut(fadeTime, function () {
      b.css({
        'display' : 'none',
        'opacity' : 1,
        'visibility' : 'visible'
      });
      setLink(examples[index]);
      b.fadeIn(fadeTime, function () {
        var
          swap = b;
        index++;
        if (index >= examples.length) index = 0;
        b = a;
        a = swap;
        b.css({
          'visibility' : 'hidden',
          'display' : 'block',
          'opacity' : 0
        });
        execute(examples[index], b[0]);
      });
    });
  }

  function execute(example, container) {
    example = Flotr.ExampleList.examples[example];
    example.callback.apply(
      null, [container].concat(example.args) || [container]
    );
    $(container).attr('title', 'Example: ' + example.name);
  }

  function setLink (key) {
    link.attr('href', href + '#!' + key);
  }

  /*
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
  }*/
});
