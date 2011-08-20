<?php
require_once 'Home.inc';

class HelloredditThankyou extends HelloredditHome
{
    public function getPageClass()
    {
        return 'thankyou';
    }
    public function getContent() {
        include('helloreddit/xhtml/Thankyou.xhtml');
    }
}
?>