<html>
  <head>
    <style type="text/css">
      body {
        margin: 0px;
        padding: 0px;
      }
      p {
        text-align: center;
      }
      #container {
        width : 600px;
        margin: 8px auto;
      }
      .detail {
        margin-bottom: 4px;
      }
      .summary {
        cursor: all-scroll;
      }
    </style>
    <link rel="stylesheet" type="text/css" href="<?php static_css(); ?>envision.min.css" />
  </head>
  <body>
    <div id="container"></div>
    <p>Click and drag on the bottom chart.</p>
    <!--[if IE]>
    <script type="text/javascript" src="<?php static_lib(); ?>FlashCanvas/bin/flashcanvas.js"></script>
    <![endif]-->
    <script type="text/javascript" src="<?php static_js(); ?>envision.min.js"></script>
    <script type="text/javascript">
      (function () {

        var
          container = document.getElementById('container'),
          x = [],
          y1 = [],
          y2 = [],
          data, i,
          detail, detailOptions,
          summary, summaryOptions,
          vis, selection;

        // Data Format:
        data = [
          [x, y1], // First Series
          [x, y2]  // Second Series
        ];

        // Sample the sine function for data
        for (i = 0; i < 4 * Math.PI; i += 0.05) {
          x.push(i);
          y1.push(Math.sin(i));
          y2.push(Math.sin(i + Math.PI));
        }
        x.push(4 * Math.PI)
        y1.push(Math.sin(4 * Math.PI));
        y2.push(Math.sin(4 * Math.PI));

        // Configuration for detail:
        detailOptions = {
          name : 'detail',
          data : data,
          height : 150,
          flotr : {
            yaxis : {
              min : -1.1,
              max : 1.1
            }
          }
        };

        // Configuration for summary:
        summaryOptions = {
          name : 'summary',
          data : data,
          height : 150,
          flotr : {
            yaxis : {
              min : -1.1,
              max : 1.1
            },
            selection : {
              mode : 'x'
            }
          }
        };

        // Building a custom vis:
        vis = new envision.Visualization();
        detail = new envision.Component(detailOptions);
        summary = new envision.Component(summaryOptions);
        interaction = new envision.Interaction();

        // Render Visualization
        vis
          .add(detail)
          .add(summary)
          .render(container);

        // Wireup Interaction
        interaction
          .leader(summary)
          .follower(detail)
          .add(envision.actions.selection);

      })();
    </script>
  </body>
</html>

