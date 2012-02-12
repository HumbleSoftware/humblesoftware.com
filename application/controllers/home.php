<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {
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
            'js/projects.js',
        ));

        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble software development - home',
            'page' => 'home'
        ));
	}

    public function terms()
    {
        $this->load->view('template', array(
            'title' => 'humble software development - terms',
            'page' => 'terms'
        ));
    }
}
