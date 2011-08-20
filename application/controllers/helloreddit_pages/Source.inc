<?php
require_once 'Home.inc';

class HelloredditSource extends HelloredditHome
{
    public function getContent() {
        include('helloreddit/xhtml/HelloRedditSource.xhtml');
        include('helloreddit/xhtml/HelloRedditBuyButton.php');
    }
}
?>