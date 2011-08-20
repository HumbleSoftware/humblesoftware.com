<?php
require_once 'Home.inc';

class HelloredditBuy extends HelloredditHome
{
    public function getContent() {
        include('helloreddit/xhtml/HelloRedditBuy.xhtml');
        echo "\n<h2>Already Bought It!</h2>\n";
        include('helloreddit/xhtml/HelloRedditDownload.xhtml');
    }
}
?>