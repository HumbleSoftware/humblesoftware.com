<div class="feedback">
  <h2><a name="Feedback"></a>Feedback:</h2>
  <form method="post" action="<?php echo base_url(); echo uri_string(); ?>">
    <div class="errors"><?php echo validation_errors(); ?></div>
    <input type="hidden" name="action" value="feedback" />
    <fieldset>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="<?php echo set_value('name'); ?>"/>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" value="<?php echo set_value('email'); ?>" /></div>
      <div>
        <label for="subject">Subject:</label>
        <input id="subject" type="text" name="subject" value="<?php echo set_value('subject', (isset($subject) ? $subject : '')); ?>" />
      </div>
      <div>
        <label for="feedback">Message:</label>
        <textarea id="feedback" name="feedback" rows="21" cols="125"><?php echo set_value('feedback'); ?></textarea>
      </div>
      <?php echo $recaptcha; ?>
      <div><input id="submit" type="submit" name="submit" value="Send Feedback" /></div>
    </fieldset>
  </form>
</div>
