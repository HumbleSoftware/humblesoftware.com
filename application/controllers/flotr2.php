<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Flotr2 extends CI_Controller {
    public function __construct()
    {
        parent::__construct();

        $this->load->library(array(
            'includes'
        ));

        $this->load->helper(array(
            'url',
            'static'
        ));

    }
    public function examples()
    {
        $this->includes->css('flotr.css');
        $this->includes->js(array(
            'flotr2/flotr2.min.js',
            'flotr2/flotr2.examples.min.js',
            'flotr2/flotr2.examples.types.js',
            'flotr2/beautify.js',
            'flotr2/randomseed.js',
            'flotr2/driver.js'
        ));

        $this->load->view('template', array(
            'includes'          => $this->includes,
            'title'             => 'flotr2',
            'page'              => 'flotr2/examples',
            'page_description'  => 'Flotr 2 HTML5 and Canvas graphing library.'
        ));
    }
}