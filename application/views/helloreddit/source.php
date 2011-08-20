<h2>Source</h2>

<form action="<?php echo base_url(); ?>download/">
    <fieldset>
        <input type="hidden" name="action" value="downloadFile" />
        <input id="helloReddit" checked="checked" type="radio" name="filename" value="HelloReddit-1.0.tar.gz" />
        <label for="helloReddit">HelloReddit 1.0 Source </label>
        <input type="submit" name="submit" value="Download" />
   </fieldset>
</form>

<h3>About HelloReddit</h3>
<p>
	A friend and I wrote HelloReddit this past fall and didn't know there was 
	any real demand for an BlackBerry reddit app until two weeks ago.  
	HelloReddit took us two months to write, learning about the BlackBerry 
	platform as we went.  It is written in Java using the BlackBerry SDK 
	(version 4.5.0) and consists of more than 4,000 lines of code.
</p>
<p>
	We have released the source code and all assets for HelloReddit under the 
	MIT License.  Use it to learn about BlackBerry programming or extend it to
	better suit your needs.  If you use and enjoy our app, please consider
	donating to help support it.
</p>
