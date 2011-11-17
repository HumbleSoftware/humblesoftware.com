<div class="fortune">

<h2>Fortune 500 Demo</h2>

<p class="summary" style="text-align: center;">
As seen on <a href="http://fathom.info/fortune500/">Fathom</a>, done in Canvas and JavaScript.  Best viewed in Chrome or Firefox.  Click to select points; navigate with arrow keys.
</p>

<div id="chart" class="chart">
  <div class="controls">
    <div class="label">showing:</div>
    <div class="control rank selected">Rank</div>
    <div class="control revenue">Revenue</div>
    <div class="control profit">Profit</div>
  </div>
  <div class="inflation">
    <input id="inflation-checkbox" type="checkbox"></input>
    <label for="inflation-checkbox">inflation</label>
  </div>
  <div class="labels">
    <div class="label">1955</div>
    <div class="label">1960</div>
    <div class="label">1965</div>
    <div class="label">1970</div>
    <div class="label">1975</div>
    <div class="label">1980</div>
    <div class="label">1985</div>
    <div class="label">1990</div>
    <div class="label">1995</div>
    <div class="label">2000</div>
    <div class="label">2005</div>
    <div class="label">2010</div>
  </div>
  <div class="company"></div>
</div>

<h3>About</h3>

<p>
I thought the Fathom Fortune 500 vis, done in Java, was excellent.  This version was created to demonstrate 
that 80,000 data points could be visualized with JavaScript using modern browser features.  This 
visualization uses JavaScript and Canvas.
</p>
<h3>Vitals</h3>
<ul>
  <li>JavaScript &amp; Canvas</li>
  <li>237KB of Data</li>
  <li>Tested in Chrome, Firefox, Android Webkit and Firefox Mobile.</li>
<ul>

</div>

<?php

$draw = "/**
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
}";

$calculate = "
/**
 * Precalculate revenue, price and inflation.
 *
 * Revenue and profit are stored as actual values (in millions).  This value
 * is displayed to the user in the company popup.  To draw the data, these
 * values need to be translated to their y coordinates in the log scale.
 *
 * This translation is precalculated for speed at draw time and calculated
 * client-side to keep the data size down.
 *
 * Run after first draw.
 */
function calculate() {

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
}";

$this->load->view('listing', array('name' => 'draw()', 'listingContent' => $draw));
$this->load->view('listing', array('name' => 'calculate()', 'listingContent' => $calculate));

?>

