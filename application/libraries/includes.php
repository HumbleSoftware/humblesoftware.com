<?php  if (!defined('BASEPATH')) exit('No direct script access allowed');
class Includes
{
    var $_CI;
    var $_js = array();
    var $_css = array();

    function __construct(){
        $this->_CI =& get_instance();

    }

    function js($script) {
        array_push($this->_js, $script);
    }

    function getJS() {
        return $this->_js;
    }
}
