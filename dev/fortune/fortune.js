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
    };

  var
    width     = 800,
    height    = 502,
    xmin      = 1954,
    xmax      = 2010,
    ymin      = 0,
    ymax      = 500, 
    vis       = d3.select(ID_CHART).append('canvas'),
    context   = vis[0][0].getContext('2d'),
    current   = RANK;

  visualization();
  //scales();
  draw(RANK);

  /*
  setTimeout(function () {
    animate (REVENUE, RANK);
  }, 500);
  setTimeout(function () {
    animate (PROFIT, REVENUE);
  }, 4000);
  */

  function draw (type, previous, increment) {

    var
      year    = MAP[YEAR],
      index   = MAP[type],
      _index  = MAP[previous],
      names   = F500.names,
      values  = F500.values,
      length1 = values.length,
      length2,
      data,
      nameWidth,
      i, j,
      x, y;

    //console.time('draw');
    context.clearRect(0, 0, width, height);
    context.beginPath();

    for (i = 0; i < length1; i++) {

      data      = values[i];
      length2   = data.length;
      nameWidth = names[i].length / 4;

      if (_index) {
        for (j = 0; j < length2; j++) {
          x = data[j][year];
          y = increment * data[j][index] + ( 1 - increment ) * data[j][_index];
          context.moveTo(x - nameWidth, y);
          context.lineTo(x + nameWidth, y);
        }
      } else {
        for (j = 0; j < length2; j++) {
          x = data[j][year];
          y = data[j][index];
          context.moveTo(x - nameWidth, y);
          context.lineTo(x + nameWidth, y);
        }
      }
    }

    context.closePath();
    context.stroke();
    //console.timeEnd('draw');
  }

  function animate (type, previous, increment) {

    if
      (!increment) increment = .03;
    else
      increment += .03;

    draw (type, previous, (1 + Math.sin(-Math.PI / 2 - increment * Math.PI))/2);

    if (increment < 1) {
      setTimeout (function () {
        animate(type, previous, increment);
      }, 10);
    } else {
      setTimeout (function () {
        draw (type);
      }, 10);
    }
  }

  function visualization () {
    vis
      .attr('width', width)
      .attr('height', height);

    context
      .strokeStyle = 'rgba(150,150,150,1)';
    context
      .lineWidth = '1px';
  }

  function scales (type) {

    yScale
      .domain([ymin, ymax])
      .range([0, height]);
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

  console.time('search');
  drawCompany(RANK, search(RANK, 700, 400));
  console.timeEnd('search');

  function drawCompany (type, index) {

    var
      name    = F500.names[index],
      values  = F500.values[index],
      year    = MAP[YEAR],
      i;

    type = MAP[type];

    context.save();

    context
      .strokeStyle = 'rgba(150,0,0,1)';
    context
      .lineWidth = '1.5';

    context.beginPath();

    context.moveTo(values[0][year], values[0][type]);
    for (i = 1; i < values.length; i++) {
      context.lineTo(values[i][year], values[i][type]);
    }
    context.moveTo(values[0][year], values[0][type]);

    context.closePath();
    context.stroke();
    context.restore();
  }

})();

