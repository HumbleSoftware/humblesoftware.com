<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Projects extends CI_Controller {
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
        $this->includes->js(array(
            'projects.js',
            'flotr2/flotr2.min.js'
        ));

        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble software development - projects',
            'page' => 'projects'
        ));
	}
}
