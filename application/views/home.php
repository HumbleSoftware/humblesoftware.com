<p class="summary">
Welcome to humble software development.  We provide software design 
and development services, as well as maintain several projects.  
<a href="<?php echo base_url(); ?>contact">Contact</a> us or
 look around to learn more.
</p>

<div id="homeServices">
    <h3>Our expertise include:</h3>
    <ul>
        <li>JavaScript/HTML5 Application Development</li>
        <li>Dynamic Data Visualization in Canvas and SVG</li>
        <li>Search/Information Retrieval Backends</li>
    </ul>
</div>

<div id="homeSummary">
	<div id="homeProjects" class="homeBox">

		<h3>Projects:</h3>

        <?php $this->load->view('projects/list.php'); ?>

	</div>
	<div class="footer"></div>
</div>
