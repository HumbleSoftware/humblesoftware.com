<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Envision extends CI_Controller {

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

        $this->includes->css('css/hsd-envision.css');

        $this->data = array(
            'includes'          => $this->includes,
            'template_header'   => 'envision/header',
            'template_links'    => 'envision/links'
        );
    }

    public function index()
    {
        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'envision - demos',
            'page'              => 'envision/index',
            'page_description'  => 'Envision.JS interactive HTML5 canvas and svg visualization library supporting HTML5 finance visualization.'
        )));
    }

    public function documentation()
    {
        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'envision - documentation',
            'page'              => 'envision/documentation',
            'page_description'  => 'Documentation for Envision.JS, interactive HTML5 visualization library.'
        )));
    }

    public function feedback()
    {
        $this->load->library('feedback', array('label' => 'envision'));

        if ($this->feedback->validate()) {
            $this->feedback->send();
            $this->load->view('template', array_merge($this->data, array(
                'title'             => 'envision - feedback',
                'page'              => 'thankyou',
                'name'              => $this->input->post('name')
            )));
        } else {
            $this->load->view('template', array_merge($this->data, array(
                'title'             => 'envision - feedback',
                'page'              => 'feedback',
                'recaptcha'         => $this->recaptcha->get_html(),
                'subject'           => 'Envision.JS Feedback'
            )));
        }
    }
}
