<?php $this->load->view('top.php'); ?>
<?php $this->load->view(isset($template_header) ? $template_header.'.php' : 'header.php'); ?>
<div id="links-container">
  <div id="links">
    <div id="mainLinks">
<?php $this->load->view(isset($template_links) ? $template_links.'.php' : 'links.php'); ?>
    </div>
    <div id="links-footer"></div>
  </div>
</div>

<div id="content-container">
    <div id="content">
        <?php $this->load->view($page.'.php'); ?>
    </div>
</div>

<?php $this->load->view('footer.php'); ?>
<?php $this->load->view('bottom.php'); ?>
