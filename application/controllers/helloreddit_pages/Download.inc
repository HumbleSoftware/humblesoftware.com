<?php
require_once 'Home.inc';
require_once 'models/Download.inc';

class HelloredditDownload extends HelloredditHome
{
    public function getContent() {
        include ('helloreddit/xhtml/Download.xhtml');
    }
}
?>