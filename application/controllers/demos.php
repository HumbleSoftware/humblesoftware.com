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
        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble software development - demos',
            'page' => 'demos'
        ));
    }
}
