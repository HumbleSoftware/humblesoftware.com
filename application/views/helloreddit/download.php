<h2>Get HelloReddit:</h2>

<form action="<?php echo base_url(); ?>download/" style="padding-left: 10px;">
	<fieldset>
		<input type="hidden" name="action" value="downloadJad" />
	    <input id="helloReddit" type="hidden" name="filename" value="HelloReddit.jad" />
		<label for="helloReddit">HelloReddit for the BlackBerry (OTA) </label>
		<input type="submit" name="submit" value="Download" />
   </fieldset>
</form>

<form action="<?php echo base_url(); ?>download/" style="padding-left: 10px;">
    <fieldset>
        <input type="hidden" name="action" value="downloadfile" />
        <input id="helloReddit" type="hidden" name="filename" value="HelloReddit.zip" />
        <label for="helloReddit">HelloReddit for the BlackBerry (Zip Archive) </label>
        <input type="submit" name="submit" value="Download" />
   </fieldset>
</form>

<?php //include 'Donate.xhtml';?>
