<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class HelloReddit extends CI_Controller {

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

        $this->includes->css('helloreddit.css');
    }

    public function index()
    {
        $this->load->view('template', array(
            'includes'          => $this->includes,
            'title'             => 'helloreddit',
            'page'              => 'helloreddit/screenshots',
            'template_links'    => 'helloreddit/links',
            'template_header'   => 'helloreddit/header'
        ));
    }

    public function features()
    {
        $this->load->view('template', array(
            'includes'          => $this->includes,
            'title'             => 'helloreddit - features',
            'page'              => 'helloreddit/features',
            'template_links'    => 'helloreddit/links',
            'template_header'   => 'helloreddit/header'
        ));
    }

    public function feedback()
    {
        $this->load->library('feedback', array('label'=>'helloreddit'));

        if ($this->feedback->validate()) {
            $this->feedback->send();
            $this->load->view('template', array(
                'includes'          => $this->includes,
                'title'             => 'helloreddit - feedback',
                'page'              => 'thankyou',
                'name'              => $this->input->post('name'),
                'template_links'    => 'helloreddit/links',
                'template_header'   => 'helloreddit/header'
            ));
        } else {
            $this->load->view('template', array(
                'includes'          => $this->includes,
                'title'             => 'helloreddit - feedback',
                'page'              => 'helloreddit/feedback',
                'recaptcha'         => $this->recaptcha->get_html(),
                'subject'           => 'HelloReddit Feedback',
                'template_links'    => 'helloreddit/links',
                'template_header'   => 'helloreddit/header'
            ));
        }
    }

    public function _check_captcha($val)
    {
        return $this->feedback->check_captcha($val);
    }
}
