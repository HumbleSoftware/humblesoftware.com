<!DOCTYPE HTML>
<html>
<head>
    <title><?php echo $title; ?></title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="<?php echo isset($page_description) ? $page_description : 'Humble software development provides JavaScript, HTML5, Canvas and information search and retrieval software development.'; ?>" />
    <link rel="icon" type="image/gif" href="<?php static_image(); ?>favicon.gif" />
    <link rel="stylesheet" type="text/css" href="<?php static_css(); ?>hsd.css<?php echo '?'.$this->config->item('buster'); ?>" />
<?php if (isset($includes)): foreach ($includes->getCSS() as $stylesheet) { ?>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url().'static/'.$stylesheet.'?'.$this->config->item('buster'); ?>" />
<?php } endif; ?>
</head>

<body>
<div id="body-container" class="<?php echo str_replace('/', '-', $page); ?>">
