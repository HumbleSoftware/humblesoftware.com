<p class="summary">
Humble software development provides software design 
and development services and maintains several open source projects.  
Services include JavaScript/HTML5 application development, Canvas/SVG
dynamic data visualization, and search/information retrieval.
<a href="<?php echo base_url(); ?>contact">Contact</a> us or
 look around to learn more.
</p>

<div>
	<div class="home-projects">

		<h3>Projects:</h3>

        <div class="projects-list">
        <?php $this->load->view('projects/list.php'); ?>
        </div>

	</div>
	<div class="footer"></div>
</div>
