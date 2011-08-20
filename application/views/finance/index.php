<p id="summary">
HumbleFinance is an HTML5 data visualization tool written as a demonstration
of interactive graphing in HTML5.  It is similar to the Flash tool on 
<a href="http://finance.google.com/">http://finance.google.com/</a>.  The
tool itself is written entirely in JavaScript, using the Prototype and Flotr 
libraries.  It can be used to display any two 2-D data sets of real 
numerical data which share an axis.
</p>

<h3>Demo:</h3>

<p>
This demo displays historical stock data for Google from their IPO to March
5th, 2010.  This data was acquired through the Google Finance website.
</p>
<p>
You can mouse over the chart for additional data, as well as zoom and pan 
the charts using the grey bottons.  For best results view with FireFox, 
Chrome, or Safari.
</p>

<script type="text/javascript">
</script>
<div id="finance">
  <div id="labels">
    <div id="financeTitle">NASDAQ:GOOG</div>
    <div id="time">
      <a onclick="HumbleFinance.zoom(5);">1w</a>
      <a onclick="HumbleFinance.zoom(21);">1m</a>
      <a onclick="HumbleFinance.zoom(65);">3m</a>
      <a onclick="HumbleFinance.zoom(127);">6m</a>
      <a onclick="HumbleFinance.zoom(254);">1y</a>
      <a onclick="HumbleFinance.zoom(1265);">5y</a>
    </div>
    <div id="dateRange"></div>
  </div>
</div>

<h3>
  Listing <span class="file">HTML</span>:
  <span class="snippetShow">
    <a id="snippetShowOne" onclick="toggleSnippet($('snippetShowOne'), $('snippetOne'));">(hide)</a>
  </span>
</h3>

<div id="snippetOne" class="snippet">
  <code class="prettyprint">&lt;div id="finance"&gt;
  &lt;div id="labels"&gt;
    &lt;div id="financeTitle"&gt;NASDAQ:GOOG&lt;/div&gt;
    &lt;div id="time"&gt;
      &lt;a onclick="HumbleFinance.zoom(5);"&gt;1w&lt;/a&gt;
      &lt;a onclick="HumbleFinance.zoom(21);"&gt;1m&lt;/a&gt;
      &lt;a onclick="HumbleFinance.zoom(65);"&gt;3m&lt;/a&gt;
      &lt;a onclick="HumbleFinance.zoom(127);"&gt;6m&lt;/a&gt;
      &lt;a onclick="HumbleFinance.zoom(254);"&gt;1y&lt;/a&gt;
      &lt;a onclick="HumbleFinance.zoom(1265);"&gt;5y&lt;/a&gt;
    &lt;/div&gt;
    &lt;div id="dateRange"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code>
</div>

<h3>
  Listing <span class="file">demo.js</span>:
  <span class="snippetShow">
    <a id="snippetShowTwo" onclick="toggleSnippet($('snippetShowTwo'), $('snippetTwo'));">(hide)</a>
  </span>
</h3>

<div id="snippetTwo" class="snippet">
  <code class="prettyprint"><?php echo htmlentities(file_get_contents('../static/js/finance/demo.js', FILE_USE_INCLUDE_PATH)); ?></code>
</div>
