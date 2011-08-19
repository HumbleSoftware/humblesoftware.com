<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Demos extends CI_Controller {
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
    public function index()
    {
        $this->includes->css('demos.css');
        $this->includes->js('demos/Trig.js');
        $this->includes->js('demos/TrigDemo.js');

        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble software development - demos',
            'page' => 'demos'
        ));
    }
}
