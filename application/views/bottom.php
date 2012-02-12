</div> 
<script type="text/javascript">
  var HSD_BASE = '<?php echo base_url(); ?>';
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-15129441-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<script src="https://www.google.com/jsapi?key=ABQIAAAAuThdpyh1Qwy4HBMceth4qxQwkqy4SzgAzJqTDqEXBNbWjToRhxR0PRivs2dDnyu_72HBYxlaIu-cOw"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<!--[if lt IE 9]>
<script src="<?php static_lib(); ?>flotr2/flotr2.ie.min.js"></script>
<![endif]-->
<script src="<?php static_js(); ?>hsd.js"></script>
<?php if (isset($includes)): foreach ($includes->getJS() as $script) { ?>
    <script src="<?php echo base_url().'static/'.$script; ?>"></script>
<?php } endif; ?>
</body>
</html>
