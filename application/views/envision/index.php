
<div id="demos">

<div class="stub">
Envision.js is a library for creating fast, dynamic and interactive HTML5 visualizations.
</div>

<div class="demo">

  <h3><a href="<?php echo base_url() ?>envision/demos/timeseries" title="HTML5 time series chart">TimeSeries:</a></h3>

  <div class="image" id="timeseries-demo"></div>

  <p>
    HTML5 time series chart.  This uses the TimeSeries template.  Templates provide
    pre-built interactive visualizations matching common use-cases.  TimeSeries 
    comes with zoom support.
    <span class="link">
      (<a href="<?php echo base_url() ?>envision/demos/timeseries" title="HTML5 time series chart">click to code</a>)
    </span>
  </p>

</div>

<div class="demo">

  <h3><a href="<?php echo base_url() ?>envision/demos/finance" title="HTML5 Finance Chart">Finance:</a></h3>

  <div class="image" id="finance-demo"></div>

  <p>
    HTML5 financial chart.  This demos the Finance template with data in the global
    namespace.  It specifies an initial selection and custom formatters for the x-axis
    labels and mouse tracking.
    <span class="link">
      (<a href="<?php echo base_url() ?>envision/demos/finance" title="HTML5 Finance Chart">click to code</a>)
    </span>
  </p>

</div>

<div class="demo">

  <h3><a href="<?php echo base_url() ?>envision/demos/ajax" title="Dynamic HTML5 Finance Chart with Ajax">Ajax:</a></h3>

  <div class="image" id="ajax-demo"></div>

  <p>
    AJAX driven financial chart.  This demo uses the same Finance template as the previous,
    but uses the selection interaction callback to manage data.  In this case the
    selection range only triggers a single GET, but this could be arbitrarily complex.
    <span class="link">
      (<a href="<?php echo base_url() ?>envision/demos/ajax" title="Dynamic HTML5 Finance Chart with Ajax">click to code</a>)
    </span>
  </p>

</div>

<div class="demo">

  <h3><a href="<?php echo base_url(); ?>envision/demos/fractal" title="Custom Example - Fractal">Custom - Fractal:</a></h3>

  <div class="image" id="fractal-demo"></div>

  <p>
    A custom built visualization which draws a fractal.  Instead of a template, this
    uses the envision API and includes a Visualization, a Component, and an
    Interaction for zooming.  The fractal itself is rendered using a custom
    flotr chart type.
    <span class="link">
      (<a href="<?php echo base_url() ?>envision/demos/fractal" title="Custom Example - Fractal">click to code</a>)
    </span>
  </p>

</div>

</div>
