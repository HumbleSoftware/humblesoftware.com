<?php
require_once 'Home.inc';

class HelloredditDonate extends HelloredditHome
{
    public function getContent() {
        include('helloreddit/xhtml/Donate.xhtml');
    }
}
?>