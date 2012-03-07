<ul>
  <li<?php echo ($page == 'flotr2/index' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>flotr2/index"><span>examples</span></a>
  </li>
  <li<?php echo ($page == 'flotr2/documentation' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>flotr2/documentation"><span>docs</span></a>
  </li>
  <li<?php echo ($page == 'flotr2/feedback' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>flotr2/feedback"><span>feedback</span></a>
  </li>
  <li<?php echo ($page == 'flotr2/source' ? ' class="current-page"' : ''); ?>>
    <a href="http://www.github.com/HumbleSoftware/Flotr2"><span>source</span></a>
  </li>
  <li>
    <a href="<?php echo base_url(); ?>"><span>humble software</span></a>
  </li>
</ul>

<div id="github-ribbon">
  <a href="http://github.com/HumbleSoftware/Flotr2"><?php $this->load->view('github-ribbon'); ?></a>
</div>
