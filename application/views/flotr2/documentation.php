<div id="documentation-nav">
  <h2>Contents</h2>
  <ul class="nav">
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#configuration">Configuration</a></li>
    <li><a href="#development">Development</a></li>
  </ul>
</div>

<section class="introduction">
  <h2><a name="introduction">Introduction</a></h2>
  <p>
  Flotr2 is a library for drawing HTML5 charts and graphs.  It is a branch of 
  <a title="flotr" href="http://code.google.com/p/flotr/">flotr</a>
  </p>

  <h3>Features:</h3>
  <ul class="features">
    <li>mobile support</li>
    <li>framework independent</li>
    <li>extensible plugin framework</li>
    <li>custom chart types</li>
    <li>FF, Chrome, IE6+, Android, iOS</li>
  </ul>
  <ul class="types">
    <li>lines</li>
    <li>bars</li>
    <li>candles</li>
    <li>pies</li>
    <li>bubbles</li>
  </ul>
</section>

<section>
  <h2><a name="usage">Usage</a></h2>

  <p>
  To use Flotr2, include the <code>flotr2.min.js</code> script in your page and
  create a visible <code>&lt;div&gt;</code> with positive width and height.
  A graph is drawn with the <code>Flotr.draw(container, data, options)</code>
  method.
  </p>

  <h3><a name="usage-example">Usage Example</a></h3>

  <div class="editor usage"></div>

  <h3>API: <code>Flotr.draw(container, data, options)</code></h3>
  <ul>
    <li>
      <code>container</code>
      a visible DOM element with positive width and height.
    </li>
    <li>
      <code>data</code>
      an Array of series.
    </li>
    <li>
      <code>options</code>
      a configuration object containing flotr configuration options,
      defining axes, grids, legends, etc.
    </li>
  </ul>

  <h3>Data</h3>

  <p>
  Each series is either an array of points <code>[[x0, y0], [x1, y1] ...]</code>
  or an object with series options and a data member.
  </p>

  <h3>Internet Explorer</h3>

  <p>
  Flotr2 is fully supported in IE 9+ and <a title="explorer canvas"
  href="http://code.google.com/p/explorercanvas/">explorer canvas</a> or <a 
  title="flash canvas" href="http://flashcanvas.net/">flashcanvas</a> may be
  conditionally included to support older versions, as seen in the <a
  href="#usage-example" title="usage example">example</a> above.
  </p>
</section>

<section>
  <h2><a name="configuration">Configuration</h2>

  <p>
  The following are the default configuration options for Flotr.  Additional
  options are added for individual graph types and plugins.  In general, those
  can be found at the top of each plugin or graph file.
  </p>

  <h3>Flotr2 Defaults</h3>
  <div class="editor api"></div>
</section>

<section>
  <h2><a name="development">Development</a></h2>

  <p>
  This project uses <a title="smoosh" href="https://github.com/fat/smoosh">
  smoosh</a> to build and <a title="Jasmine BDD"
  href="http://pivotal.github.com/jasmine/">jasmine</a> with <a
  title="js-imagediff canvas testing"
  href="https://github.com/HumbleSoftware/js-imagediff">js-imagediff</a> to test.
  Tests may be executed by <a title="jasmine headless webkit"
  href="http://johnbintz.github.com/jasmine-headless-webkit/">
  jasmine-headless-webkit</a> with <code>cd spec; jasmine-headless-webkit -j jasmine.yml -c</code>
  or by a browser by navigating to <code>spec/SpecRunner.html</code>.  The test
  may be viewed <a title="flotr2 test suite"
  href="<?php static_lib(); ?>flotr2/spec/SpecRunner.html">here</a>.
  </p>

  <h3>Directories</h3>
  <ul>
    <li><code>js/</code> main source files</li>
    <li><code>js/plugins/</code> flotr plugins</li>
    <li><code>js/types/</code> chart types</li>
    <li><code>spec/</code> Jasmine tests</li>
    <li><code>examples/</code> stable and development example pages</li>
    <li><code>make/</code> build configuration files</li>
    <li><code>lib/</code> included libraries</li>
    <li><code>build/</code> temporary directory used during build</li>
  </ul>

  <h3>Extending</h3>

  <p>
  Flotr may be extended by adding new graph types and plugins.
  Graph types define how a particular chart is rendered. Examples include line,
  bar, pie. Existing graph types are found in <a title="flotr2 graph types"
  href="https://github.com/HumbleSoftware/Flotr2/tree/master/js/types"><code>
  js/types/</code></a>.
  </p>

  <p>
  Plugins extend the core of flotr with new functionality. They can add
  interactions, new decorations, etc. Examples include titles, labels and
  selection.  Plugins are found in <a title="flotr2 plugins"
  href="https://github.com/HumbleSoftware/Flotr2/tree/master/js/plugins"><code>
  js/plugins/</code></a>.
  </p>

  <h3>Issues</h3>
  <p>
  Please submit issues and pull requests on github at <a title="Flotr2"
  href="http://github.com/HumbleSoftware/Flotr2">http://github.com/HumbleSoftware/Flotr2</a>.
  </p>
<section>
