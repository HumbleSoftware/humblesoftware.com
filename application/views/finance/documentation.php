<?php $this->load->view('finance/links.php'); ?>

<h3>About</h3>
<p>
HumbleFinance is an HTML5 data visualization tool similar to the Flash tool on 
<a href="http://finance.google.com/">http://finance.google.com/</a>.  The tool 
is written entirely in JavaScript, using the Prototype and Flotr libraries.
</p>
<p>
Though this tool lends itself well to the display of financial data, it can be 
used to display any two 2d data sets which share an axis.  Please <a href="<?php echo base_url(); ?>contact?subject=HumbleFinance%20Feedback#Feedback">write me</a> with 
any neat examples of data.
</p>

<h3>Requirements</h3>
<ol>
	<li><a href="http://prototypejs.org/">Prototype 1.6.1+ (http://prototypejs.org/)</a></li>
	<li>Flotr 2.0 (modified)</li>
	<li>FireFox, Safari, Chromium, or IE6+</li>
</ol>
<p>Note: performance depends on browser, processor, and data size.  For best results, avoid IE :-)</p>
<h3>Installation</h3>
<p>
	To install HumbleFinance, copy <span class="file">HumbleFinance.js</span> to
	your JavaScript folder and include the file in your web page.
</p>
<div class="snippet">
	<code class="prettyprint">&lt;script type="text/javascript" src="path/to/source/HumbleFinance.js"&gt;&lt;/script&gt;</code>
</div>
<h3>Usage</h3>
<p>
Using HumbleFinance requires three steps.  First create a div for HumbleFinance
to live in and give it an id, for example 
<code class="prettyprint">&lt;div id="financeID"&gt;</code>.  Second, build some
data and store it in JavaScript variables.  Finally, call the HumbleFinance init
function.
</p>
<h4>Data:</h4>
<p>
    HumbleFinance can be used to display any two 2d sets of numeric data which
    share an axis.  All data is should be stored within JavaScript variables as 
	an array of <code class="prettyprint">[x, y]</code> points.
</p>
<div class="snippet"><code class="prettyprint">var data = [[0, 1],[1, 1],[1, 0]];</code></div>
<p>
	In total, three data parameters must be set:
</p>
<ol>
	<li><code>priceData</code></li>
	<li><code>volumeData</code></li>
	<li><code>summaryData</code></li>
</ol>
<p>
	The first two are the two sets sharing an axis.  The third, 
    <code>summaryData</code>, is a set which will be displayed all at once, 
	used to provide a useful visual cue for interacting with the other data.  
	This set must also share the same axis and should span the range of the 
	other two sets.  In general it will be a summary, 100 or so points, from 
	either <code>priceData</code> or <code>volumeData</code>.  
</p>
<p>
	For example, from the demo:
</p>
<ol>
    <li><code>priceData</code> is stock closing price vs. time</li>
    <li><code>volumeData</code> is stock volume traded vs. time</li>
    <li><code>summaryData</code> is 100 points from <code>priceData</code></li>
</ol>
<h4>Init:</h4>
<p>
    To display the tool, call <code>HumbleFinance.init</code>.  This function 
	takes four parameters:
</p>
<ol>
	<li><code>id</code> - container div id.</li>
    <li><code>priceData</code> - the first set of data.</li>
    <li><code>volumeData</code> - the second set of data.</li>
    <li><code>summaryData</code> - the set of summary data.</li>
</ol>
<p>
	This function must be called after the container div element has been
	loaded, preferably after the entire DOM has been loaded.  This can be done
	using Prototype as follows: 
</p>
<div class="snippet">
<code class="prettyprint">Event.observe(document, 'dom:loaded', function() {
    HumbleFinance.init('financeID', priceData, volumeData, summaryData);
});
</code>
</div>
<h3>Extension</h3>
<p>
	HumbleFinance was written to provide three basic methods extendibility: 
	Flotr events, tick and track formatters, and a zoom function.  Each of these
	techniques is used in the demo (this is by design, not my own laziness or 
	short-sightedness, as this is a small library).  Additionally, this 
	software is under the MIT License so you can alter and adulter HumbleFinance 
	manually to suit your needs.
</p>
<h4>Flotr Events</h4>
<p>
	After the init function has been called, Flotr event observers can be 
	attached to the <code>HumbleFinance.containers</code> to provide additional
	functionality.  For documentation on specific Flotr events, consult the 
	Flotr documentation and source code.
</p>
<p>
	The following example watches the summary chart for selection changes and
	updates a div with the id <code>dateRange</code>, displaying the date range
	of the selection.  This example uses an extra set of metadata stored in the
	variable jsonData, a good method for attaching richer or non-numeric data
	to points on the graphs.
</p>
<div class="snippet">
<code class="prettyprint">Event.observe(HumbleFinance.containers.summary, 'flotr:select', function (e) {
        
    var area = e.memo[0];
    xmin = Math.floor(area.x1);
    xmax = Math.ceil(area.x2);
    
    var date1 = jsonData[xmin].date;
    var date2 = jsonData[xmax].date;
    
    $('dateRange').update(jsonData[xmin].date + ' - ' + jsonData[xmax].date);
});
</code>
</div>
<h4>Tick and Track Formatters</h4>
<p>
	HumbleFinance uses two tick formatters and one track formatter.  These are
	functions which format the data displayed along axis ticks or, in the case
	of the track formatter, data displayed when a data point is moused over.
	For specific details regarding formatters consult the Flotr documentation
	and source code.
</p>
<p>
	The following example sets the mouse track formatter.  This displays the
	date, price, and volume traded of the stock at the point selected again 
	pulling data from jsonData.
</p>
<div class="snippet">
<code class="prettyprint">HumbleFinance.trackFormatter = function (obj) {
    
    var x = Math.floor(obj.x);
    var data = jsonData[x];
    var text = data.date + " Price: " + data.close + " Vol: " + data.volume;
    
    return text;
};
</code>
</div>
<h4>Zooming</h4>
<p>
    A zoom function, <code>HumbleFinance.zoom</code>, lets you manually select a
	section of the of the summary.  It accepts one parameter, the length of the 
	range to be selected.  Selection starts either at the right selection hook,
	or if there is no existing selection, the right side of the chart.
</p>
<p>
	The following example displays a list of links which zoom the chart.
</p>
<div class="snippet"><code class="prettyprint">&lt;div id="time"&gt;
    &lt;a onclick="HumbleFinance.zoom(5);"&gt;1w&lt;/a&gt;
    &lt;a onclick="HumbleFinance.zoom(21);"&gt;1m&lt;/a&gt;
    &lt;a onclick="HumbleFinance.zoom(65);"&gt;3m&lt;/a&gt;
    &lt;a onclick="HumbleFinance.zoom(127);"&gt;6m&lt;/a&gt;
    &lt;a onclick="HumbleFinance.zoom(254);"&gt;1y&lt;/a&gt;
    &lt;a onclick="HumbleFinance.zoom(1265);"&gt;5y&lt;/a&gt;
&lt;/div&gt;
</code></div>
