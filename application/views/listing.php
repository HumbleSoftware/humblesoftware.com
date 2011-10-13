<div class="listing">
  <h3>
    <span class="file"><?php echo $name; ?></span>:
    <span><a class="toggle">(hide)</a></span>
  </h3>

  <div class="snippet">
    <code class="prettyprint"><?php
echo (isset($listingContent) ? $listingContent : htmlentities(file_get_contents($file, FILE_USE_INCLUDE_PATH)));
?></code>
  </div>
</div>
