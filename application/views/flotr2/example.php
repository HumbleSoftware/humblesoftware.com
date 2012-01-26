<html>
  <head>
    <style type="text/css">
      body {
        margin: 0px;
        padding: 0px;
      }
      #container {
        width : 600px;
        height: 384px;
        margin: 8px auto;
      }
    </style>
  </head>
  <body>
    <div id="container">
    <script type="text/javascript" src="<?php static_js(); ?>flotr2/flotr2.min.js"></script>
    <script type="text/javascript">
      (function () {

        var
          container = document.getElementById('container'),
          d1 = [[0, 3], [4, 8], [8, 5], [9, 13]], // First data series
          d2 = [],                                // Second data series
          i, graph;

        // Generate first data set
        for (i = 0; i < 14; i += 0.5) {
          d2.push([i, Math.sin(i)]);
        }

        // Draw Graph
        graph = Flotr.draw(container, [ d1, d2 ], {
          xaxis: {
            minorTickFreq: 4
          },
          grid: {
            minorVerticalLines: true
          }
        });
      })();
    </script>
  </body>
</html>
