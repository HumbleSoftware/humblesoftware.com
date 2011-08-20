<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Finance extends CI_Controller {
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

        $this->includes->css('finance.css');
        $this->includes->js(array(
            'finance/prototype.min.js',
            'finance/Finance.js',
            'finance/flotr/excanvas.js',
            'finance/flotr/base64.js',
            'finance/flotr/canvas2image.js',
            'finance/flotr/canvastext.js',
            'finance/flotr/flotr.js',
            'finance/HumbleFinance.js',
            'finance/data.js',
            'finance/demo.js'
        ));

    }
    public function index()
    {
        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble finance',
            'page' => 'finance/index',
            'financePage' => 'index'
        ));
    }

    public function documentation()
    {
        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble finance - documentation',
            'page' => 'finance/documentation',
            'financePage' => 'documentation'
        ));
    }

    public function source()
    {
        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble finance - source',
            'page' => 'finance/source',
            'financePage' => 'source'
        ));
    }
}

