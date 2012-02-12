<!DOCTYPE HTML>
<html>
<head>
    <title><?php echo $title; ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="description" content="<?php echo isset($page_description) ? $page_description : 'Humble software development provides JavaScript, HTML5, Canvas and information search and retrieval software development.'; ?>" />
    <link rel="icon" type="image/gif" href="<?php static_image(); ?>favicon.gif" />
    <link rel="stylesheet" type="text/css" href="<?php static_css(); ?>hsd.css" />
<?php if (isset($includes)): foreach ($includes->getCSS() as $stylesheet) { ?>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url().'static/'.$stylesheet; ?>" />
<?php } endif; ?>
</head>

<body>
<div id="body-container" class="<?php echo $page; ?>">
