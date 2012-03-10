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
    example(document.getElementById('ajax-demo'));
  }

  function example (container) {

    var
      V = envision;

    // Get initial data
    $.getJSON(HSD_BASE + 'static/js/envision/ajax-demo-initial-data.js', function (initialData) {

      var
        currentData = initialData,
        options, finance;

      options = {
        container : container,
        data : {
          price : currentData.price,
          volume : currentData.volume,
          summary : currentData.summary
        },
        trackFormatter : function (o) {

          var
            index = o.index,
            value;

          value = currentData.data[index].date + ': $' + currentData.price[1][index] + ", Vol: " + currentData.volume[1][index];

          return value;
        },
        // An initial selection
        selection : {
          data : {
            x : {
              min : 0,
              max : 250
            }
          }
        },
        // Override some defaults.
        // Skip preprocessing to use flotr-formatted data.
        defaults : {
          volume : {
            skipPreprocess : true,
          },
          price : {
            skipPreprocess : true,
          },
          summary : {
            skipPreprocess : true,
            flotr : {
              xaxis : {
                // Set x ticks manually with defaults override:
                ticks : currentData.summaryTicks
              }
            }
          }
        }
      };

      options.selectionCallback = (function () {

        var data = {
          initial : initialData,
          fetched : null
        };

        function fetchData (o) {
          $.getJSON(HSD_BASE + 'static/js/envision/ajax-demo-dynamic-data.js', function (fetchedData) {
            data.fetched = fetchedData;
            currentData = fetchedData;
            finance.price.options.data = data.fetched.price;
            finance.volume.options.data = data.fetched.volume;
            _.each(finance.selection.followers, function (follower) {
              follower.trigger(follower, 'zoom', o);
            }, this);
          });
        }
        return function (o) {

          if (finance) {
            var
              x = o.data.x;

            if (x.max !== null && Math.abs(x.max - x.min) < 250) {
              if (data.fetched) {
                finance.price.options.data = data.fetched.price;
                finance.volume.options.data = data.fetched.volume;
              } else {
                fetchData(o);
              }
            } else {
              finance.price.options.data = data.initial.price;
              finance.volume.options.data = data.initial.volume;
            }
          }
        }
      })();

      finance = new envision.templates.Finance(options);
    });
  }
});

