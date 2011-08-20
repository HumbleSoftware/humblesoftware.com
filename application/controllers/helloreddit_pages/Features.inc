<?php
require_once 'Home.inc';

class HelloredditFeatures extends HelloredditHome
{
    public function getPageClass()
    {
        return 'features';
    }
    public function getScripts() {
        
        echo parent::getScripts();
        echo "<script type=\"text/javascript\">";
        include ('helloreddit/js/HelloRedditFeatures.js');
        echo "</script>";
    }
    public function getContent() {
        include('helloreddit/xhtml/HelloRedditFeatures.xhtml');
        include('helloreddit/xhtml/HelloRedditBuyButton.php');
    }
}
?>