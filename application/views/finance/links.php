<ul>
  <li<?php echo ($financePage == 'index' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>finance/index"><span>demo</span></a>
  </li>
  <li<?php echo ($financePage == 'documentation' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>finance/documentation"><span>documentation</span></a>
  </li>
  <li<?php echo ($financePage == 'source' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>finance/source"><span>source</span></a>
  </li>
  <li<?php echo ($financePage == 'feedback' ? ' class="current-page"' : ''); ?>>
    <a href="<?php echo base_url(); ?>finance/feedback"><span>feedback</span></a>
  </li>
  <li>
    <a href="<?php echo base_url(); ?>"><span>humble software</span></a>
  </li>
</ul>

<div id="github-ribbon">
  <a href="http://github.com/HumbleSoftware/HumbleVisualization"><?php $this->load->view('github-ribbon'); ?></a>
</div>
