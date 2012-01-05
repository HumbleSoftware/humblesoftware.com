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

        $this->includes->css('flotr.css');
        $this->includes->js(array(
            'flotr2/flotr2.min.js',
            'flotr2/flotr2.examples.min.js',
            'flotr2/flotr2.examples.types.js',
            'flotr2/beautify.js',
            'flotr2/randomseed.js',
            'flotr2/driver.js'
        ));

        $this->data = array(
            'includes'          => $this->includes,
            'template_header'   => 'flotr2/header',
            'template_links'    => 'flotr2/links'
        );
    }
    public function index()
    {
        $this->includes->css('flotr_examples.css');
        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'flotr2',
            'page'              => 'flotr2/index',
            'page_description'  => 'Flotr 2 HTML5 and Canvas graphing library home page.'
        )));
    }
    public function documentation()
    {
        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'flotr2',
            'page'              => 'flotr2/documentation',
            'page_description'  => 'Flotr 2 usage and documentation.'
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
}
