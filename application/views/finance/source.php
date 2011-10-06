<?php $this->load->view('finance/links.php'); ?>

<p>
HumbleFinance is an open source project distributed under the MIT License.  It is hosted on <a href="http://github.com/HumbleSoftware/HumbleVisualization" alt="GitHub">GitHub</a>.
<a href="<?php echo base_url(); ?>contact?subject=HumbleFinance%20Feedback#Feedback">Feedback</a> is welcome!
</p>

<h3>Download</h3>

<div><a href="https://github.com/HumbleSoftware/HumbleVisualization/tarball/master" alt="HumbleFiance tar">HumbleFinance tar (GitHub)</a></div>
<div><a href="https://github.com/HumbleSoftware/HumbleVisualization/zipball/master" alt="HumbleFiance zip">HumbleFinance zip (GitHub)</a></div>

<h3 style="margin-top: 28px;">
	Listing <span class="file">HumbleFinance.js</span>:
    <span class="snippetShow">
        <a id="showTwo" onclick="toggleSnippet($('showTwo'), $('listingTwo'));">(show)</a>
    </span>
</h3>

<div id="listingTwo" class="snippet" style="display: none">
<code><?php $this->load->view('finance/finance.js.php');?></code>
</div>


