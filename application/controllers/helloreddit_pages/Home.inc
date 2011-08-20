<?php
require_once 'pages/HumblePage.inc';

class HelloredditHome extends HumblePage 
{
    public function __construct() {
        $this->pageName = 'helloreddit';
    }

    public function getCSS() {
        
        $agent = $_SERVER['HTTP_USER_AGENT'];
        
        if (stripos($agent, 'blackberry') !== false) {
            return '<link rel="stylesheet" type="text/css" href="'.HumbleConfig::$WEB_ROOT.'helloreddit/css/helloreddit.blackberry.css" />';;
        }

        return '<link rel="stylesheet" type="text/css" href="'.HumbleConfig::$WEB_ROOT.'helloreddit/css/helloreddit.css" />';
    }
    
    public function getTitle() {
        return parent::getTitle().' - HelloReddit';
    }
    
    public function getHeader() {
        return '<a href="'.HumbleConfig::$WEB_ROOT.'helloreddit/home" >HelloReddit</a>';
    }
    
    public function getLinks() {
        echo '<ul>';
        echo '<li><a href="'.HumbleConfig::$SITE_PREFIX.'helloreddit/home">Screenshots</a></li>';
        echo '<li><a href="'.HumbleConfig::$SITE_PREFIX.'helloreddit/features">Features</a></li>';
        echo '<li><a href="'.HumbleConfig::$SITE_PREFIX.'helloreddit/download">Get It!</a></li>';
        echo '<li><a href="'.HumbleConfig::$SITE_PREFIX.'helloreddit/source">Source Code</a></li>';
        echo '<li><a href="'.HumbleConfig::$SITE_PREFIX.'contact?subject=HelloReddit%20Feedback#Feedback">Feedback</a></li>';
        echo '</ul>';
    }
    
    public function getContent() {
        include_once('helloreddit/xhtml/HelloRedditScreenshots.xhtml');
        include_once('helloreddit/xhtml/HelloRedditBuyButton.php');
    }
}
?>
