<p>
HumbleFinance is an open source project distributed under the MIT License.  It is hosted on <a href="http://github.com/HumbleSoftware/envisionjs" alt="GitHub">GitHub</a>.
<a href="<?php echo base_url(); ?>contact?subject=HumbleFinance%20Feedback#Feedback">Feedback</a> is welcome!
</p>

<h3>Download</h3>

<div><a href="https://github.com/HumbleSoftware/envisionjs/tarball/master" alt="HumbleFiance tar">HumbleFinance tar (GitHub)</a></div>
<div><a href="https://github.com/HumbleSoftware/envisionjs/zipball/master" alt="HumbleFiance zip">HumbleFinance zip (GitHub)</a></div>

<?php $this->load->view('listing', array('name' => 'HumbleFinance.js', 'listingContent' => $this->load->view('finance/finance.js.php', '', true))); ?>
