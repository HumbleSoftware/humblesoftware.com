<?php
require_once 'Home.inc';

class HelloredditEmail extends HelloredditHome
{
    public function getContent() {
        echo "<p>Please check your mail for the download link.</p>\n";
    }
}
?>