</div> 
</body>
<script src="https://www.google.com/jsapi?key=ABQIAAAAuThdpyh1Qwy4HBMceth4qxQwkqy4SzgAzJqTDqEXBNbWjToRhxR0PRivs2dDnyu_72HBYxlaIu-cOw" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script src="<?php static_lib(); ?>google-code-prettify/prettify.js"></script>
<script src="<?php static_js(); ?>HSD.js"></script>
<?php if (isset($includes)): foreach ($includes->getJS() as $script) { ?>
    <script src="<?php static_js(); echo $script; ?>"></script>
<?php } endif; ?>
</html>
