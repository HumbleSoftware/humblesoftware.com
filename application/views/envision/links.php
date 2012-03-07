<ul>
  <li<?php echo ($page == 'envision/index' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>envision/index"><span>demos</span></a>
  </li>
  <li<?php echo ($page == 'envision/documentation' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>envision/documentation"><span>docs</span></a>
  </li>
  <li<?php echo ($page == 'envision/feedback' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>envision/feedback"><span>feedback</span></a>
  </li>
  <li<?php echo ($page == 'envision/source' ? ' class="current-page"' : ''); ?>>
    <a href="http://www.github.com/HumbleSoftware/Flotr2"><span>source</span></a>
  </li>
  <li>
    <a href="<?php echo base_url(); ?>"><span>humble software</span></a>
  </li>
</ul>

<div id="github-ribbon">
  <a href="http://github.com/HumbleSoftware/envisionjs"><?php $this->load->view('github-ribbon'); ?></a>
</div>
