//
// Fortune 500
// Copyright 2011 Humble Software Development
//

(function () {

  var

    ID_CHART  = '#chart',

    COLOR     = 'rgba(72,99,160,.8)',
    COLOR     = 'rgba(72,72,72,.8)',
    COLOR     = 'rgba(72,72,72,.3)',
    COLOR     = 'rgba(181,192,217,1)',
    HIGHLIGHT = 'rgba(200,30,30,1)',
    RANK      = 'rank',
    PROFIT    = 'profit',
    I_PROFIT  = 'iProfit',
    REVENUE   = 'revenue',
    I_REVENUE = 'iRevenue',
    PREVIOUS = 'previous',
    YEAR      = 'year',

    D_MAP     = { // Data Map
      year    : 0,
      rank    : 1, 
      revenue : 2,
      profit  : 3
    },

    C_MAP     = { // Chart Map
      year      : 0,
      rank      : 1, 
      previous  : 4,
      revenue   : 5,
      iRevenue  : 6,
      profit    : 7,
      iProfit   : 8
    },

    TRANSLATIONS = {
      year    : function (v) { return Math.round((v + .5) * (2011 - 1954) / 800 + 1954) },
      revenue : format,
      profit  : format 
    },

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

  function format (v) {
    if (v > 1000) {
      return '$'+(Math.round(v/100)/10)+'b'; 
    } else {
      return '$'+(Math.round(10 * v)/10)+'m'; 
    }
  }

  /**
   * Main draw routine.
   *
   * This routine draws about the lines representing the data, about 27500 
   * points at once and represents the main critical section.  Previous
   * drawn values are remembered and used, together with the increment
   * paramenter, to render frames of animation.
   *
   * Optimizations include precalculating the data, array access vs. 
   * refinement, and using a single path and stroke.
   */
  function draw (type, increment) {

    var
      year    = C_MAP[YEAR],
      index   = C_MAP[type],
      pIndex  = C_MAP[PREVIOUS],
      names   = F500.names,
      values  = F500.values,
      length1 = values.length,
      dec     = 1 - increment,
      length2,
      data,
      nameWidth,
      i, j,
      x, y;

    context.clearRect(0, 0, width, height);
    context.beginPath();

    for (i = 0; i < length1; i++) {

      data      = values[i];
      length2   = data.length;
      nameWidth = names[i].length / 4;

      for (j = 0; j < length2; j++) {
        x = data[j][year];
        data[j][pIndex] = y =
          increment * data[j][index] + dec * (data[j][pIndex] || data[j][index]);
        context.moveTo(x - nameWidth, y);
        context.lineTo(x + nameWidth, y);
      }
    }

    context.closePath();
    context.stroke();

    if (selected !== null)
      drawCompany(type, selected, increment);
  }

  function search (type, x, y, exact) {

    var
      year    = C_MAP[YEAR],
      index   = C_MAP[type],
      values  = F500.values,
      length1 = values.length,
      length2,
      data,
      i, j;

    for (i = 0; i < length1; i++) {

      data    = values[i];
      length2 = data.length;

      if (exact) {
        for (j = 0; j < length2; j++) {
          if (Math.abs(data[j][year] - x) < 7 && data[j][index] == y) {
            return {i : i, j : j};
          }
        }
      } else {
        for (j = 0; j < length2; j++) {
          if (Math.abs(data[j][year] - x) < 7 && Math.abs(data[j][index] - y) < 1) {
            return {i : i, j : j};
          }
        }
      }
    }
  }

  function drawCompany (type, selected, increment) {

    var
      name      = F500.names[selected.i],
      nameWidth = Math.max(name.length / 4, 3),
      values    = F500.values[selected.i],
      year      = C_MAP[YEAR],
      previous  = C_MAP[PREVIOUS],
      typeIndex = C_MAP[type],
      x, y,
      i;

    context.save();

    context
      .strokeStyle = HIGHLIGHT;
    context
      .lineWidth = '2.5';

    context.beginPath();

    for (i = 0; i < values.length; i++) {
      x = values[i][year];
      y = increment * values[i][typeIndex] + ( 1 - increment ) * (values[i][previous] || values[i][selected.i]);
      context.moveTo(x - nameWidth, y);
      context.lineTo(x + nameWidth, y);
    }

    context.moveTo(values[0][year], values[0][typeIndex]);

    context.closePath();
    context.stroke();
    context.restore();

    positionDisplay(selected.i, selected.j, increment);
  }

  function display (i, j) {

    var
      values  = F500.values[i][j],
      name    = F500.names[i],
      html    = '<div class="company-content"><div class="value name">' + name + '</div>',
      key;

    for (key in D_MAP) {
      html += '<div class="data ' + key + '">';
      html += '<div class="label">' + key + '</div>';
      html += '<div class="value">' + (TRANSLATIONS[key] ? TRANSLATIONS[key](values[D_MAP[key]]) : values[D_MAP[key]]) + '</div>';
      html += '</div>';
    }

    html += '</div><div class="company-arrow"></div>';

    company.html(html).show();
  }

  function positionDisplay (i, j, increment) {

    var
      values  = F500.values[i][j],
      index   = C_MAP[type],
      prev    = C_MAP[PREVIOUS],
      x       = values[C_MAP[YEAR]],
      y       = increment * values[index] + ( 1 - increment ) * (values[prev] || 0);

    company.css({
      left : x - company.width() / 2,
      top  : Math.round(y + 4)
    });
  }

  function init () {

    var
      previous  = null,
      increment = 0,
      timeout   = null,
      animating = false,
      chart     = $(ID_CHART),
      doAnimations,
      start;

    visualization();
    
    start = new Date();
    draw(RANK, 1);
    doAnimations = ((new Date()) - start < 150 ? true : false);

    $('.controls .control').click(switchType);

    $('#inflation-checkbox').change(function (e) {
      var
        inflation = getInflation();

      if (inflation) {
        if (type == REVENUE)
          doType(I_REVENUE);
        else if (type == PROFIT)
          doType(I_PROFIT);
      } else {
        if (type == I_REVENUE)
          doType(REVENUE);
        else if (type == I_PROFIT)
          doType(PROFIT);
      }
    });

    $(window).keydown(function (e) {

      if (selected === null)
        return;

      var
        values  = F500.values,
        data    = values[selected.i][selected.j],
        x       = data[C_MAP[YEAR]],
        y       = data[C_MAP[RANK]],
        result;

      switch (e.keyCode)
      {
        case 37 : x -= 14; break;
        case 38 : y--; break;
        case 39 : x += 14; break;
        case 40 : y++; break;
        default : return;
      }

      e.preventDefault();

      result = search(RANK, x, y, true);
      setSelected(result);

      return false;
    });

    vis.click(function (e) {

      var
        position = vis.offset(),
        x = e.pageX - position.left,
        y = e.pageY - position.top,
        result = search(type, x, y);

      setSelected(result);
    });

    function setSelected (o) {
      if (o) {
        selected = o;
        display(o.i, o.j);
        draw(type, 1);
      } else {
        selected = null; 
        company.hide();
        draw(type, 1);
      }
    }

    function getInflation () {
      return !!$('#inflation-checkbox').attr('checked');
    }

    function switchType (e) {
      var
        inflation = getInflation(),
        types = [RANK, REVENUE, PROFIT],
        newType;

      for (var i in types) {
        if ($(e.target).hasClass(types[i])) {

          newType = types[i];
          if (newType === type) return;

          $('.controls .control').removeClass('selected');
          $(e.target).addClass('selected');

          if (inflation) {
            if (newType == REVENUE)
              newType = I_REVENUE;
            else if (newType == PROFIT)
              newType = I_PROFIT;
          }

          doType(newType);

          return;
        }
      }
    }

    function doType (t) {
      previous = type;
      type = t;
      increment = 0;
      if (!animating) animate();
    }

    function animate () {

      if (!doAnimations) {
        draw(type, 1);
        return;
      }

      animating = true;
      clearTimeout(timeout);

      if (!increment) increment = .08;
      else increment += .08;
      if (increment > 1) increment = 1;

      draw (type, (1 + Math.sin(-Math.PI / 2 - increment * Math.PI))/2);

      if (increment < 1) {
        timeout = setTimeout (function () {
          animate();
        }, 25);
      } else {
        animating = false;
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
      .translate(0, -.5);
    context
      .lineWidth = '1px';
  }

  /**
   * Precalculate revenue, price and inflation.
   *
   * Revenue and profit are stored as actual values (in millions).  This value
   * is displayed to the user in the company popup.  To draw the data, these
   * values need to be translated to their y coordinates.
   *
   * This translation is precalculated for speed at draw time and calculated
   * client-side to keep the data size down.
   *
   * Run after first draw.
   */
  function calculatePoints () {

    var
      rBase     = height / Math.log(6e5),
      pBase     = height / ( 2 * Math.log(1e6) ),
      rIndex    = D_MAP[REVENUE],
      pIndex    = D_MAP[PROFIT],
      yIndex    = D_MAP[YEAR],
      values    = F500.values,
      inflation = F500.inflation,
      half      = height / 2,
      length1   = values.length,
      length2,
      data,
      datum,
      year,
      v,
      i, j;

    for (i = 0; i < length1; i++) {

      data = values[i];
      length2 = data.length;

      for (j = 0; j < length2; j++) {
        datum = data[j];
        year = datum[yIndex];
        datum.push(Math.round(height - Math.log(datum[rIndex] - 40) * rBase));
        datum.push(Math.round(height - Math.log(datum[rIndex] * inflation[year] - 40) * rBase));
        v = datum[pIndex];
        if (v < 0) {
          datum.push(Math.round(half + Math.log(-10 * v) * pBase));
          datum.push(Math.round(half + Math.log(-10 * v * inflation[year]) * pBase));
        } else {
          datum.push(Math.round(half - Math.log(10 * v) * pBase));
          datum.push(Math.round(half - Math.log(10 * v * inflation[year]) * pBase));
        }
      }
    }
  }

  setTimeout( function () {
    calculatePoints();
  }, 10);

})();

