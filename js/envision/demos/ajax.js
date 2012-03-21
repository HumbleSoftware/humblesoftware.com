function ajax_demo (container) {

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

        value = currentData.data[index].date + ': $' + currentData.price[index][1] + ", Vol: " + currentData.volume[index][1];

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
          skipPreprocess : true
        },
        price : {
          skipPreprocess : true
        },
        summary : {
          skipPreprocess : true,
          config : {
            xaxis : {
              // Set x ticks manually with defaults override:
              ticks : currentData.summaryTicks
            }
          }
        }
      }
    };

    // Set the selection callback:
    //
    // This callback is applied after a selection action but
    // before the components are updated.  This lets a developer
    // control the components configuration or data based upon
    // the area selected.
    //
    // The only argument of the callback is the result of the
    // action — in this case a selection area in this case.
    // Desiging to the interface of the Component allows the
    // data handling to be entirely separate and arbitarily 
    // complex.
    //
    options.selectionCallback = (function () {

      var data = {
        initial : initialData,
        fetched : null
      };

      // Helper for fetching high resolution data
      function fetchData (o) {
        $.getJSON(HSD_BASE + 'static/js/envision/ajax-demo-dynamic-data.js', function (fetchedData) {
          data.fetched = fetchedData;
          currentData = fetchedData;
          finance.price.options.data = data.fetched.price;
          finance.volume.options.data = data.fetched.volume;
          _.each(finance.selection.followers, function (follower) {
            follower.trigger('zoom', o);
          }, this);
        });
      }

      // Selection callback:
      return function (selection) {

        if (finance) {
          var
            x = selection.data.x;

          if (x.max !== null && Math.abs(x.max - x.min) < 250) {
            if (data.fetched) {

              // Use high resolution data, if available
              finance.price.options.data = data.fetched.price;
              finance.volume.options.data = data.fetched.volume;
              currentData = data.fetched;
            } else {

              // Fetch high resolution data
              fetchData(selection);
            }
          } else {

            // Use low resolution data
            finance.price.options.data = data.initial.price;
            finance.volume.options.data = data.initial.volume;
            currentData = data.initial;
          }
        }
      }
    })();

    finance = new envision.templates.Finance(options);
  });
}
