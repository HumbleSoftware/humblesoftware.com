function realtime_demo (container) {

  var
    x = [],
    dataA = [],
    dataB = [],
    data = [[x, dataA], [x, dataB]],
    options, i, timesries;

  function sample(i) {
    x.push(i);
    dataA.push(Math.sin(i / 6) * (Math.random() + 1) / 2);
    dataB.push(Math.sin(i / 6) * (Math.random() + 1) / 2);
  }

  for (i = 0; i < 50; i++) {
    sample(i);
  }

  options = {
    container : container,
    data : {
      detail : data,
      summary : data
    }
  }

  timeseries = new envision.templates.TimeSeries(options);

  function getNewData () {
    i++;
    sample(i);
    animate(i);
    setTimeout(getNewData, 1000);
  }

  function animate (i) {

    var
      length = 500,
      start = (new Date()).getTime(),
      min = i - 51,
      max = i - 1,
      offset = 0;

    function frame () {

      var
        time = (new Date()).getTime(),
        tick = time - start,
        offset = (Math.sin(Math.PI * (tick) / length - Math.PI / 2) + 1) / 2;

      timeseries.summary.draw(null, {
        xaxis : {
          min : 0,
          max : max + offset
        }
      });
      timeseries.summary.trigger('select', {
        data : {
          x : {
            min : min + offset,
            max : max + offset
          }
        }
      });

      if (tick < length) {
        setTimeout(frame, 20);
      }
    }

    frame();
  }

  getNewData();

}
