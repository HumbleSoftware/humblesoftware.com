<div id="links-container">
    <div id="links">
        <div id="mainLinks">
            <ul>
                <li<?php echo ($page == 'home' ? ' class="current-page"' : '') ?>>
                    <a href="<?php echo base_url(); ?>home"><span>home</span></a>
                </li>
                <li<?php echo ($page == 'projects' ? ' class="current-page"' : '') ?>>
                    <a href="<?php echo base_url(); ?>projects"><span>projects</span></a>
                </li>
                <li<?php echo (isset($category) && $category == 'demos' ? ' class="current-page"' : '') ?>>
                    <a href="<?php echo base_url(); ?>demos"><span>demos</span></a>
                </li>
                <li>
                    <a href="http://www.github.com/HumbleSoftware/" target="_blank"><span>github</span></a>
                </li>
                <li<?php echo ($page == 'contact' ? ' class="current-page"' : '') ?>>
                    <a href="<?php echo base_url(); ?>contact"><span>contact</span></a>
                </li>
            </ul>
        </div>
        <div id="links-footer"></div>
    </div>
</div>
