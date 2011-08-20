<h3>Contact:</h3>

<span class="label">Email</span><span id="contactEmail">carl [at] this domain name . com</span>

<h3 class="feedback"><a name="Feedback"></a>Feedback:</h3>

<div class="errors">
<?php echo validation_errors(); ?>
</div>

<?php $this->load->view('feedback.php'); ?>
