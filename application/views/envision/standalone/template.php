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
    <link rel="stylesheet" type="text/css" href="<?php static_css(); ?>envision.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php static_css(); ?>envision-templates.min.css" />
  </head>
  <body>
    <div id="container"></div>
    <!--[if IE]>
    <script type="text/javascript" src="<?php static_lib(); ?>FlashCanvas/bin/flashcanvas.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<?php static_js(); ?>flotr2.min.js"></script>
    <script type="text/javascript" src="<?php static_js(); ?>envision.min.js"></script>
    <script type="text/javascript" src="<?php static_js(); ?>envision-templates.min.js"></script>
    <script type="text/javascript">
      (function () {

        var
          container = document.getElementById('container'),
          x = [],
          y1 = [], // First series
          y2 = [], // Second series
          data = [[x, y1],[x, y2]],
          options, i;

        // Sample the sine function
        for (i = 0; i < 4 * Math.PI; i += 0.05) {
          x.push(i);
          y1.push(Math.sin(i));
          y2.push(Math.sin(i + Math.PI));
        }

        options = {
          container : container,
          data : {
            detail : data,
            summary : data
          }
        };

        new envision.templates.TimeSeries(options);

      })();
    </script>
  </body>
</html>

