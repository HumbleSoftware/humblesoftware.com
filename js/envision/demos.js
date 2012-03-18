$(function () {

  var
    demosDiv = document.getElementById('demos'),
    demoDiv = document.getElementById('demo');

  if (demosDiv) {

    // Main demos page:

    // No Select
    $('#demos').mousedown(function (e) {
      if ($(e.target).closest('.image').length) {
        $('body').addClass('no-select');
      } else {
        $('body').removeClass('no-select');
      }
    }).mouseup(function (e) {
      $('body').removeClass('no-select');
    });

    var timeseriesContainer = document.getElementById('timeseries-demo');
    var timeseries = timeseries_demo(timeseriesContainer);
    // Do some fancy animation
    var offset = 0;
    var cancel = false;
    function animate () {

      var n = Math.cos(offset);

      timeseries.summary.trigger('select', {
        data : {
          x : {
            min : 100,
            max : 300 - n * 100
          }
        }
      });

      offset += .1;

      if (offset < 2 * Math.PI && !cancel) {
        setTimeout(animate, 30);
      }
    }
    if ('ontouchstart' in timeseriesContainer) {
      $(timeseriesContainer).bind('touchstart', function () {
        cancel = true;
      });
    } else {
      $(timeseriesContainer).mouseover(function () {
        cancel = true;
      });
    }

    finance_demo(document.getElementById('finance-demo'));
    ajax_demo(document.getElementById('ajax-demo'));
    fractal_demo(document.getElementById('fractal-demo'));

    // Kickoff animate
    setTimeout(animate, 750);

  } else if (demoDiv) {

    // Single Demo with Editor:
    var
      href = window.location.href,
      key = (href.split('/')).pop();

    if (key) {
      $.get(HSD_BASE + 'static/js/envision/'+key+'-demo.js', function (example) {
        var
          Editor = Flotr.Examples.Editor,
          container = demoDiv,
          source = example,
          editor;

        editor = new Editor(container, {
          example : source,
          teardown : function () {
            var
              render = $(container).find('.render')[0],
              vis = envision.bonzo(render).data('envision');
            if (vis) vis.destroy();
          }
        });
      });
    }
  }
  HSD.envisionExample = function () {};
});
