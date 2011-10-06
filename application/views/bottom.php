</div> 
</body>
<script type="text/javascript">var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));</script>
<script type="text/javascript">try {var pageTracker = _gat._getTracker("UA-15129441-1");pageTracker._setDomainName("www.humblesoftware.com");pageTracker._trackPageview();} catch(err) {}</script>
<script src="https://www.google.com/jsapi?key=ABQIAAAAuThdpyh1Qwy4HBMceth4qxQwkqy4SzgAzJqTDqEXBNbWjToRhxR0PRivs2dDnyu_72HBYxlaIu-cOw" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script src="<?php static_lib(); ?>google-code-prettify/prettify.js"></script>
<script src="<?php static_js(); ?>HSD.js"></script>
<?php if (isset($includes)): foreach ($includes->getJS() as $script) { ?>
    <script src="<?php static_js(); echo $script; ?>"></script>
<?php } endif; ?>
</html>
