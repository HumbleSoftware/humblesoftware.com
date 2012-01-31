<!DOCTYPE HTML>
<html>
<head>
    <title><?php echo $title; ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="description" content="<?php echo isset($page_description) ? $page_description : 'Humble software development provides JavaScript, HTML5, Canvas and information search and retrieval software development.'; ?>" />
    <link rel="icon" type="image/gif" href="<?php static_image(); ?>favicon.gif" />
    <link rel="stylesheet" type="text/css" href="<?php static_css(); ?>styles.css" />
    <link rel="stylesheet" type="text/css" href="<?php static_css(); ?>button.css" />
    <link rel="stylesheet" type="text/css" href="<?php static_lib(); ?>google-code-prettify/prettify.css" />
<?php if (isset($includes)): foreach ($includes->getCSS() as $stylesheet) { ?>
    <link rel="stylesheet" type="text/css" href="<?php static_css(); echo $stylesheet; ?>" />
<?php } endif; ?>
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
</head>

<body>
<div id="body-container" class="<?php echo $page; ?>">
