//
// Fortune 500
//

(function () {

  var

    ID_CHART  = '#chart',

    RANK      = 'rank',
    PROFIT    = 'profit',
    REVENUE   = 'revenue',
    YEAR      = 'year',
    MAP       = {
      year    : 0,
      rank    : 1,
      revenue : 2,
      profit  : 3
    },

    width     = 800,
    height    = 502,
    xmin      = 1954,
    xmax      = 2010,
    ymin      = 0,
    ymax      = 500, 
    vis       = d3.select(ID_CHART).append('canvas'),
    context   = vis[0][0].getContext('2d'),
    current   = RANK;

  init();

  function draw (type, increment) {

    var
      year    = MAP[YEAR],
      index   = MAP[type],
      names   = F500.names,
      values  = F500.values,
      length1 = values.length,
      length2,
      data,
      nameWidth,
      i, j,
      x, y;

    console.time('draw');
    context.clearRect(0, 0, width, height);
    context.beginPath();

    for (i = 0; i < length1; i++) {

      data      = values[i];
      length2   = data.length;
      nameWidth = names[i].length / 4;

      for (j = 0; j < length2; j++) {
        x = data[j][year];
        y = increment * data[j][index] + ( 1 - increment ) * (data[j].previous || data[j][index]);
        context.moveTo(x - nameWidth, y);
        context.lineTo(x + nameWidth, y);
        data[j].previous = y;
      }
    }

    context.closePath();
    context.stroke();
    console.timeEnd('draw');
  }

  function search (type, x, y) {

    var
      year    = MAP[YEAR],
      index   = MAP[type],
      names   = F500.names,
      values  = F500.values,
      length1 = values.length,
      length2,
      data,
      i, j;

    for (i = 0; i < length1; i++) {

      data    = values[i];
      length2 = data.length;

      for (j = 0; j < length2; j++) {

        if (Math.abs(data[j][year] - x) < 7.5) {
          if (Math.abs(data[j][index] - y) < 1) {
            return i;
          }
        }
      }
    }
  }

  //console.time('search');
  //drawCompany(RANK, search(RANK, 700, 400));
  //console.timeEnd('search');

  function drawCompany (type, index) {

    var
      name      = F500.names[index],
      nameWidth = name.length / 4,
      values    = F500.values[index],
      year      = MAP[YEAR],
      x, y,
      i;

    type = MAP[type];

    context.save();

    context
      .strokeStyle = 'rgba(150,0,0,1)';
    context
      .lineWidth = '1.5';

    context.beginPath();

    for (i = 1; i < values.length; i++) {
      x = values[i][year];
      y = values[i][type];
      context.moveTo(x - nameWidth, y);
      context.lineTo(x + nameWidth, y);
    }

    context.moveTo(values[0][year], values[0][type]);

    context.closePath();
    context.stroke();
    context.restore();
  }

  function init () {

    var
      type      = RANK,
      previous  = null,
      increment = 0,
      timeout   = null,
      animating = false;

    visualization();
    draw(RANK, 1);
    $('.controls .control').click(switchType);

    function switchType (e) {
      var
        prevType = type,
        types = [RANK, REVENUE, PROFIT];

      for (var i in types) {
        if ($(e.target).hasClass(types[i])) {

          if (types[i] === type) return;

          type = types[i];
          previous = prevType;
          increment = 0;

          if (!animating) animate();

          return;
        }
      }
    };

    function animate () {

      animating = true;
      clearTimeout(timeout);

      if
        (!increment) increment = .05;
      else
        increment += .05;

      draw (type, (1 + Math.sin(-Math.PI / 2 - increment * Math.PI))/2);

      if (increment < 1) {
        timeout = setTimeout (function () {
          animate();
        }, 10);
      } else {
        timeout = setTimeout (function () {
          draw (type, 1);
          increment = 0;
          animating = false;
        }, 15);
      }
    }
  }

  function visualization () {
    vis
      .attr('width', width)
      .attr('height', height);

    context
      .strokeStyle = 'rgba(72,99,160,.72)';
    context
      .lineWidth = '1px';
  }

})();

