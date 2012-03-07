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

        $this->includes->css('css/hsd-flotr2.css');
        $this->includes->js('js/hsd-flotr2.js');

        $this->data = array(
            'includes'          => $this->includes,
            'template_header'   => 'flotr2/header',
            'template_links'    => 'flotr2/links'
        );
    }
    public function index()
    {
        $this->includes->js('js/hsd-flotr2-examples.js');

        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'flotr2',
            'page'              => 'flotr2/index',
            'page_description'  => 'Flotr2 HTML5 and Canvas graphing library examples page.'
        )));
    }
    public function documentation()
    {
        $this->includes->js('js/hsd-flotr2-documentation.js');
        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'flotr2',
            'page'              => 'flotr2/documentation',
            'page_description'  => 'Flotr2 HTML5 Canvas graphing library for JavasScript usage and documentation.'
        )));
    }
    public function feedback()
    {
        $this->load->library('feedback', array('label'=>'flotr2'));

        if ($this->feedback->validate()) {
            $this->feedback->send();
            $this->load->view('template', array_merge($this->data, array(
                'title'             => 'flotr2 - feedback',
                'page'              => 'flotr2/feedback_thankyou',
                'name'              => $this->input->post('name')
            )));
        } else {
            $this->load->view('template', array_merge($this->data, array(
                'title'             => 'flotr2 - feedback',
                'page'              => 'flotr2/feedback',
                'recaptcha'         => $this->recaptcha->get_html(),
                'subject'           => 'Flotr2 Feedback'
            )));
        }
    }
    public function example () {
        $this->load->view('flotr2/example');
    }
}
