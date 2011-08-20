<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');
class Includes
{
    var $_CI;
    var $_js = array();
    var $_css = array();

    function __construct(){
        $this->_CI =& get_instance();

    }

    function css($stylesheet) {
        if (is_array($stylesheet)) {
            $this->_css = array_unique(array_merge($this->_css, $stylesheet));
        } else {
            array_push($this->_css, $stylesheet);
        }
    }

    function js($script) {
        if (is_array($script)) {
            $this->_js = array_unique(array_merge($this->_js, $script));
        } else {
            array_push($this->_js, $script);
        }
    }

    function getJS() {
        return $this->_js;
    }

    function getCSS() {
        return $this->_css;
    }
}
