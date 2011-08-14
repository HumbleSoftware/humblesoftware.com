<h3>Contact:</h3>

<span class="label">Email</span><span id="contactEmail">carl [at] this domain name . com</span>

<h3 class="feedback"><a name="Feedback"></a>Feedback:</h3>

<form method="post" action="<?php echo base_url(); ?>contact/send">
	<fieldset>
		<input type="hidden" name="action" value="feedback" />
		<div><label for="name">Name:</label><input type="text" id="name" name="name" /></div>
		<div><label for="email">Email:</label><input type="text" id="email" name="email" /></div>
		<div><label for="subject">Subject:</label><input id="subject" type="text" <?php if (isset($subject)) { echo "value=\"{$subject}\" "; } ?>name="subject" /></div>
		<label for="feedback">Message:</label>
		<textarea id="feedback" name="feedback" rows="21" cols="125"></textarea>
		<div><input id="submit" type="submit" name="submit" value="Send Feedback" /></div>
    </fieldset>
</form>

