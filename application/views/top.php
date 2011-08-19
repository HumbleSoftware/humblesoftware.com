<!DOCTYPE HTML>
<html>
<head>
    <title><?php echo $title; ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="icon" type="image/gif" href="<?php static_image(); ?>favicon.gif" />
    <link rel="stylesheet" type="text/css" href="<?php static_css(); ?>styles.css" />
    <link rel="stylesheet" type="text/css" href="<?php static_lib(); ?>google-code-prettify/prettify.css" />
<?php if (isset($includes)): foreach ($includes->getCSS() as $stylesheet) { ?>
    <link rel="stylesheet" type="text/css" href="<?php static_css(); echo $stylesheet; ?>"></link>
<?php } endif; ?>
</head>

<body>
<div id="body-container" class="<?php echo $page; ?>">
