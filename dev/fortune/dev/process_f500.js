
var

// Requires 
  fs          = require('fs'),
  _           = require('underscore'),

// Constants
  FILE        = 'fortune_500_1955-present.txt',
  INFLATION   = 'inflation.txt',
  HEIGHT      = 500,
  WIDTH       = 800,
  REVENUE     = 'revenue',
  PROFIT      = 'profit',
  YEAR        = 'year',

  TRANSLATION = {
    year : {
      min     : 1954,
      max     : 2011,
      range   : WIDTH
    },
    profit : {
      min     : 0,
      max     : Math.log(1e6),
      range   : HEIGHT/2
    },
    revenue : {
      min     : 0,
      max     : Math.log(6e5),
      range   : HEIGHT 
    }
  }

// Variables
  nameMap     = {},
  nameIndex   = 0,
  output      = { names : [], values : [], inflation : {} },
  count       = 0;


// Read file
fs.readFile(FILE, 'utf8', function (err, data) {
  if (err) throw err;
  process_file (data);

  _.each(nameMap, function (index, name) {
    output.names[index] = name;
  });

  console.log('var F500 = {};');
  console.log('F500.names = ');
  console.dir(output.names);
  console.log('F500.values = ');
  console.dir(output.values);

  fs.readFile(INFLATION, 'utf8', function (err, data) {

    var
      inflation = [];

    data.split(/\n/).forEach(function (value) {
      if (!value) return;
      inflation.push(parseFloat(value));
    });

    for (var i = 0; i < inflation.length; i++) {
      inflation[i] = 1;
      for (var j = i+1; j < inflation.length; j++) {
        inflation[i] = inflation[i] * (1 + inflation[j]/100);
      }
    }

    for (var i = 1955; i <= 2010; i++) {
      output.inflation[translate(i, YEAR)] = parseFloat(inflation[i - 1955].toPrecision(3));
    }

    console.log('F500.inflation = ');
    console.log(output.inflation);
  });
});

function process_line (line, index) {

  if (index === 0 || !line) return;

  var
    index   = null,
    parts   = line.split(/\t/),
    year    = translate(parseFloat(parts[0]), YEAR),
    rank    = parseFloat(parts[1]),
    name    = parts[2],
    revenue = parts[3],
    profit  = parts[4];

  revenue = parseFloat(revenue.replace(',', ''));
  profit  = parseFloat(profit.replace(',',''));

  if (rank > 500) return;
  if (typeof (nameMap[name]) === 'undefined') {
    nameMap[name] = nameIndex;
    nameIndex++;
  }

  index = nameMap[name];

  if (typeof (output.values[index]) === 'undefined') {
    output.values[index] = [];
  }

  output.values[index].push([
    year,
    rank,
    revenue,
    profit
  ]);
}

function process_file (data) {
  data.split(/\r\n/).forEach(process_line);
}

function translate (value, type) {

  var
    t       = TRANSLATION[type],
    min     = t.min,
    max     = t.max,
    domain  = max - min,
    range   = t.range;

  value = range * ( value - min ) / domain;

  return Math.round(value);
}
