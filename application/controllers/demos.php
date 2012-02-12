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

        $this->includes->css('css/demos.css');

    }
    public function index()
    {
        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble software development - javascript demos',
            'page' => 'demos/demos',
            'page_description' => 'A collection of brief JavaScript software demos highlighting performance and new technologies such has Canvas and HTML5.',
            'category' => 'demos'
        ));
    }
    public function trig()
    {
        $this->includes->js('js/demos-trig.js');

        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble software development - trig demo',
            'page' => 'demos/trig',
            'page_description' => 'A trigonometry visualization written in HTML5 / Canvas relating the circle to the sine function.',
            'category' => 'demos'
        ));
    }
    public function trig_d3()
    {
        $this->includes->js('js/demos-trig-d3.js');

        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble software development - d3 trig demo',
            'page' => 'demos/trig-d3',
            'page_description' => 'A trigonometry visualization written in d3 / SVG relating the circle to the sine function.',
            'category' => 'demos'
        ));
    }
    public function fortune()
    {
        $this->includes->js('js/demos-fortune.js');

        $this->load->view('template', array(
            'includes' => $this->includes,
            'title' => 'humble software development - fortune 500 canvas visualization demo',
            'page' => 'demos/fortune',
            'page_description' => 'An HTML5 / Canvas visualization displaying Fortune 500 data from 1955 to the present.',
            'category' => 'demos'
        ));
    }
}
