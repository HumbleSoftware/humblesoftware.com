<h2>Trig Demo</h2>

<p id="summary" style="text-align: center;">
    The first thing that should be shown in any Trigonometry class, done in
	Canvas.  Compare to: <a href="http://www.reddit.com/tb/bnzgx">
	http://www.reddit.com/tb/bnzgx</a>. 
</p>

<div id="canvas-container" style="width: 800px; height: 300px;">
    <canvas id="sineCanvas"  style="width: 800px; height: 300px;"></canvas>
</div>

<p></p>

<h3>
    Listing <span class="file">Trig.js</span>:
    <span class="snippetShow">
        <a id="snippetShowTwo" onclick="toggleSnippet($('snippetShowTwo'), $('snippetTwo'));">(hide)</a>
<pre><code class="prettyprint"><?php echo htmlentities(file_get_contents('../static/js/demos/Trig.js', FILE_USE_INCLUDE_PATH)); ?></code></pre>
    </span>
</h3>

<div id="snippetTwo" class="snippet">
</div>
<?php
$includes->js('demos/Trig.js');
$includes->js('demos/TrigDemo.js');
?>
