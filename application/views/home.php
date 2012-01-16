<p class="summary">
Welcome to humble software development.  We provide software design 
and development services, as well as maintain several projects.  
Services include JavaScript/HTML5 application development, Canvas/SVG
dynamic data visualization, and search/information retrieval.
<a href="<?php echo base_url(); ?>contact">Contact</a> us or
 look around to learn more.
</p>

<div id="homeSummary">
	<div id="homeProjects" class="homeBox">

		<h3>Projects:</h3>

        <?php $this->load->view('projects/list.php'); ?>

	</div>
	<div class="footer"></div>
</div>
