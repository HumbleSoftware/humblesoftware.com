<div class="listing">
  <h3>Listing
  <span class="file"><?php echo $name; ?></span>:
    <span>
      <a class="listing-hide">(hide)</a>
    </span>
  </h3>

  <div class="snippet">
    <code class="prettyprint"><?php echo htmlentities(file_get_contents($file, FILE_USE_INCLUDE_PATH)); ?></code>
  </div>
</div>
