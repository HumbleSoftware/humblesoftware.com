//
// Fortune 500
//

(function () {

  var

    ID_CHART  = '#chart',

    COLOR     = 'rgba(72,99,160,.8)',
    HIGHLIGHT = 'rgba(210,20,20,1)',
    RANK      = 'rank',
    PROFIT    = 'profit',
    REVENUE   = 'revenue',
    YEAR      = 'year',

    D_MAP     = { // Data Map
      year    : 0,
      rank    : 1, 
      revenue : 2,
      profit  : 3
    }

    C_MAP     = { // Chart Map
      year    : 0,
      rank    : 1, 
      revenue : 4,
      profit  : 5
    }

    TRANSLATIONS = {
      year    : function (v) { return Math.round((v + .5) * (2011 - 1954) / 800 + 1954) },
    }

    width     = 800,
    height    = 502,
    xmin      = 1954,
    xmax      = 2010,
    ymin      = 0,
    ymax      = 500, 
    vis       = $(ID_CHART).append('<canvas></canvas>').find('canvas'),
    company   = $('.company'),
    context   = vis[0].getContext('2d'),
    selected  = null,
    type      = RANK;

  init();

  function draw (type, increment) {

    var
      year    = C_MAP[YEAR],
      index   = C_MAP[type],
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

      for (j = 0; j < length2; j++) {
        x = data[j][year];
        y = increment * data[j][index] + ( 1 - increment ) * (data[j].previous || data[j][index]) - .5;
        context.moveTo(x - nameWidth, y);
        context.lineTo(x + nameWidth, y);
        data[j].previous = y;
      }
    }

    context.closePath();
    context.stroke();

    if (selected !== null)
      drawCompany(type, selected, increment);

    //console.timeEnd('draw');

  }

  function search (type, x, y) {

    var
      year    = C_MAP[YEAR],
      index   = C_MAP[type],
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

        if (Math.abs(data[j][year] - x) < 7.5 && Math.abs(data[j][index] - y) < 1) {
          return {i : i, j : j};
        }
      }
    }
  }

  function drawCompany (type, index, increment) {

    var
      name      = F500.names[index],
      nameWidth = name.length / 4,
      values    = F500.values[index],
      year      = C_MAP[YEAR],
      typeIndex = C_MAP[type],
      x, y,
      i;

    context.save();

    context
      .strokeStyle = HIGHLIGHT;
    context
      .lineWidth = '3.5';

    context.beginPath();

    for (i = 0; i < values.length; i++) {
      x = values[i][year];
      y = increment * values[i][typeIndex] + ( 1 - increment ) * (values[i].previous || values[i][index]);
      context.moveTo(x - nameWidth, y);
      context.lineTo(x + nameWidth, y);
    }

    context.moveTo(values[0][year], values[0][typeIndex]);

    context.closePath();
    context.stroke();
    context.restore();
  }

  function display (i, j) {

    var
      values  = F500.values[i][j],
      name    = F500.names[i],
      x       = values[D_MAP[YEAR]],
      y       = values[D_MAP[type]],
      html    = '<div class="value name">' + name + '</div>',
      key;

    for (key in D_MAP) {
      html += '<div class="data ' + key + '">';
      html += '<div class="label">' + key + '</div>';
      html += '<div class="value">' + (TRANSLATIONS[key] ? TRANSLATIONS[key](values[D_MAP[key]]) : values[D_MAP[key]]) + '</div>';
      html += '</div>';
    }

    company.html(html).show().css({
      left : x - company.width() / 2,
      top  : y + 4
    });
  }

  function init () {

    var
      previous  = null,
      increment = 0,
      timeout   = null,
      animating = false,
      chart     = $(ID_CHART);

    visualization();
    draw(RANK, 1);

    $('.controls .control').click(switchType);
    vis.click(function (e) {

      var
        position = vis.offset(),
        x = e.pageX - position.left,
        y = e.pageY - position.top,
        result = search(type, x, y);

      if (result) {
        selected = result.i;
        draw(type, 1);
        display(result.i, result.j);
      } else {
        selected = null; 
      }
    });

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
      .strokeStyle = COLOR;
    context
      .lineWidth = '1px';
  }

  function calculatePoints () {

    var
      rBase   = height / Math.log(6e5),
      pBase   = height / ( 2 * Math.log(1e6) ),
      rIndex  = D_MAP[REVENUE],
      pIndex  = D_MAP[PROFIT],
      values  = F500.values,
      length1 = values.length,
      length2,
      data,
      i, j;

    for (i = 0; i < length1; i++) {

      data = values[i];
      length2 = data.length;

      for (j = 0; j < length2; j++) {
        data[j].push(translateRevenue(data[j][rIndex]));
        data[j].push(translateProfit(data[j][pIndex]));
      }
    }

    function translateRevenue (v) {
      return Math.round(height - Math.log(v) * rBase);
    }

    function translateProfit (v) {
      return (v < 0) ?
        profit = Math.round(height / 2 + Math.log(-10 * v) * pBase):
        profit = Math.round(height / 2 - Math.log(10 * v) * pBase);
    }
  }

  setTimeout( function () {
    calculatePoints();
  }, 10);

})();

