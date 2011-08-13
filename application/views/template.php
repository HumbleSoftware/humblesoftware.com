<?php $this->load->view('top.php'); ?>
<?php $this->load->view('header.php'); ?>
<?php $this->load->view('links.php'); ?>

<div id="content-container">
    <div id="content">
        <?php $this->load->view($page.'.php'); ?>
    </div>
</div>

<?php $this->load->view('footer.php'); ?>
<?php $this->load->view('bottom.php'); ?>
