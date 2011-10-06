<?php $this->load->view('finance/links.php'); ?>

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

<?php $this->load->view('finance/finance.weeks.php'); ?>

<?php $this->load->view('listing', array('name' => 'HTML', 'file' => '../application/views/finance/finance.weeks.php')); ?>
<?php $this->load->view('listing', array('name' => 'demo.js', 'file' => '../static/js/finance/demo.js')); ?>
