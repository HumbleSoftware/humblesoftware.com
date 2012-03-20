<div id="documentation-nav">
  <h2>Contents</h2>
  <ul class="nav">
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <ul>
        <li><a href="#templates">Templates</a></li>
        <li><a href="#custom">Custom</a></li>
        <li><a href="#data-format">Data Format</a></li>
      </ul>
    </li>
    <li><a href="#development">Development</a></li>
      <ul>
        <li><a href="#api">API</a></li>
        <li><a href="#adapters">Adapters</a></li>
      </ul>
    <li><a href="#resources">Resources</a></li>
  </ul>
</div>

<section class="introduction">
  <h2><a id="introduction">Introduction</a></h2>
  <p>
    Envision.js is a library for creating fast, dynamic and interactive visualizations.  The library
    is born out of <a href="<?php echo base_url();?>finance/index" title="HumbleFinance, a library for
    html5 canvas finance visualization.">HumbleFinance</a>, a library for HTML5 canvas finance visualization.
  </p>

  <h3>Features:</h3>
  <ul class="features">
    <li>Supports major browsers</li>
    <li>Touch support</li>
    <li>Small footprint</li>
    <li>No dependencies</li>
    <li>Templates for common use-cases</li>
    <li>Adapted to <a href="<?php echo base_url();?>flotr2" title="Flotr2">Flotr2</a></li>
    <li>Adaptable to others</li>
  </ul>
</section>

<section class="usage">

  <h2><a id="usage">Usage</a></h2>

  <p>
    To use Envision.js, include <code>envision.min.js</code> and <code>envision.min.css</code> in your page.
    To display a visualization, either use a <a href="#templates" title="Usage of Envision.js Templates">Template</a>
    or create a custom visualization with the Envision.js API.
  </p>
  
  <h3><a id="templates">Templates</a></h3>

  <p>
    Templates are easy to use pre-made visualizations for common use-cases.  Current templates include:
  </p>

  <ul>
    <li><a href="<? echo base_url(); ?>envision/demos/timeseries" title="TimeSeries Template Demo">TimeSeries</a> - a summary and a detail chart sharing an axis</li>
    <li><a href="<? echo base_url(); ?>envision/demos/finance" title="HTML5 Finance Chart Template Demo">Finance</a> - a 3 charts visualization similar to Google Finance</li>
  </ul>

  <p>
    To use a template, also include <code>envision-templates.min.js</code> and <code>envision-templates.min.js</code> in your page.
    Templates are kept in the <code>envision.templates</code> namespace.
  </p>

  <h4>Template Example (<a href="<? echo base_url(); ?>envision/example/template" title="Standalone template example">view standalone</a>)</h4>
  <div id="usage-template"></div>

  <h3><a id="custom">Custom</a></h3>

  <p>
    This section is for people with a working knowledge of javascript, allowing the creation of 
    custom visualizations using the Envision.js <a href="#development" title="see the development section for more">APIs</a>.
  </p>

  <h3><a id="data-format">Data Format</a></h3>

  <p>
    The most basic data is a single series. This is an array of axes, each axis an array of points:
  </p>

<code class="block">var data = [
  // X Axis:
  [
    1,  // x0
    2,  // x1
    4.5 // x2
  ],
  // Y Axis:
  [
    1,  // y0
    2,  // y1
    3   // y2
  ]
];
</code>

  <p>
    Multiple series are represented by an array of series:
  </p>

<code class="block">var data = [
  // First series:
  [
    [1, 2, 4.5], // X Axis
    [1, 2, 3]    // Y Axis
  ],
  // Second Series:
  [
    [1, 3, 4], // X Axis
    [2, 4, 1]    // Y Axis
  ]
];
</code>

  <p>
    Per-series flotr configuration can be given as an object with a data member.
  </p>

<code class="block">var data = [
  // Points series:
  {
    points : { show : true },
    data : [
      [0,1,2,3,4,5,6,7,8,9,10],
      [0,1,2,1,0,1,2,1,0,1,2]
    ]
  }
];
</code>

  <h4>Why this format?</h4>
  <p>
    Flotr (and many graphing libraries) use data that looks different.  Usually, data is an array of points
    where each point is an array: <code>(x, y) => [x, y]</code>  The data format in Envision has a couple
    advantages:
  </p>

  <ul>
    <li>Compactness: the data is smaller to store, transfer and parse.</li>
    <li>Memory: when animating or interacting with charts, data is created and destroyed in real time.
    Using just a couple arrays has a much smaller footprint than using an array for each point.
    <li>Processing: it is possible to use native array functions on individual axes</li>
    </li>
  </ul>

  <p>
    It is still possible to use a library's original data format.  Simply add <code>skipPreprocess : true</code> 
    in a components configuration to pass the data directly to the adapter.  An example of this can be seen in
    the <a href="<?php echo base_url(); ?>envision/demos/ajax" title = "Ajax Demo with native Flotr data.">Ajax Demo</a>.
  </p>

</section>

<section class="development">

  <h2><a id="development">Development</a></h2>

  <p>
    This section is for developers who wish to contribute to the project or create custom visualizations.
  </p>

  <h3><a id="api">API</a></h3>

  <section class="api"><? $this->load->view('envision/api.php'); ?></section>

  <h3><a id="adapters">Adapters</a></h3>

<section>

<section class="resources">
  <h2><a id="resources">Resources</a></h2>

  <p>
  <img src="http://groups.google.com/intl/en/images/logos/groups_logo_sm.gif" height=30 width=140 alt="Google Groups">
  <br />
  <a href="http://groups.google.com/group/envisionjs">Envision.js on Google groups</a>
  </p>

  <h3>Issues</h3>
  <p>
  Please submit issues and pull requests on github at <a title="Envision.js issues"
  href="http://github.com/HumbleSoftware/envisionjs/issues">http://github.com/HumbleSoftware/envisionjs/issues</a>.
  </p>
  <h3>Source</h3>
  <p>
  The source is available on github at <a title="Envision.js source on github"
  href="http://github.com/HumbleSoftware/envisionjs">http://github.com/HumbleSoftware/envisionjs</a>.
  </p>
</section>
