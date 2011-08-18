<?php
function static_js() {
    $CI =& get_instance();
    echo $CI->config->item('static_js');
}
function static_css() {
    $CI =& get_instance();
    echo $CI->config->item('static_css');
}
function static_image() {
    $CI =& get_instance();
    echo $CI->config->item('static_images');
}
function static_lib() {
    $CI =& get_instance();
    echo $CI->config->item('static_lib');
}
