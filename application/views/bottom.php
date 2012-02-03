</div> 
<script src="https://www.google.com/jsapi?key=ABQIAAAAuThdpyh1Qwy4HBMceth4qxQwkqy4SzgAzJqTDqEXBNbWjToRhxR0PRivs2dDnyu_72HBYxlaIu-cOw"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="<?php static_lib(); ?>google-code-prettify/prettify.js"></script>
<!--[if lt IE 9]>
<script src="<?php static_lib(); ?>flotr2/flotr2.ie.min.js"></script>
<![endif]-->
<script src="<?php static_js(); ?>HSD.js"></script>
<?php if (isset($includes)): foreach ($includes->getJS() as $script) { ?>
    <script src="<?php echo base_url().'static/'.$script; ?>"></script>
<?php } endif; ?>
</body>
</html>
