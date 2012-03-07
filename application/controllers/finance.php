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

        $this->includes->css('lib/finance/finance.css');
        $this->includes->js(array(
            'lib/finance/prototype.min.js',
            'lib/finance/Finance.js',
            'lib/finance/flotr/excanvas.js',
            'lib/finance/flotr/base64.js',
            'lib/finance/flotr/canvas2image.js',
            'lib/finance/flotr/canvastext.js',
            'lib/finance/flotr/flotr.js',
            'lib/finance/HumbleFinance.js',
            'lib/finance/data.js'
        ));

        $this->data = array(
            'includes'          => $this->includes,
            'template_header'   => 'finance/header',
            'template_links'    => 'finance/links'
        );
    }
    public function index()
    {
        $this->includes->js('lib/finance/demo.js');
        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'humble finance - html5 visualization',
            'page'              => 'finance/index',
            'page_description'  => 'HumbleFinance is a HTML5 and Canvas finance visualization tool written in JavaScript.',
            'financePage'       => 'index'
        )));
    }

    public function documentation()
    {
        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'humble finance - documentation',
            'page'              => 'finance/documentation',
            'page_description'  => 'Documentation for the HumbleFinance HTML5 finance visualization tool.',
            'financePage'       => 'documentation'
        )));
    }

    public function source()
    {
        $this->load->view('template', array_merge($this->data, array(
            'title'             => 'humble finance - source',
            'page'              => 'finance/source',
            'page_description'  => 'Source code for the HumbleFinance HTML5 finance visualization tool.',
            'financePage'       => 'source'
        )));
    }

    public function feedback()
    {
        $this->load->library('feedback', array('label'=>'finance'));

        if ($this->feedback->validate()) {
            $this->feedback->send();
            $this->load->view('template', array_merge($this->data, array(
                'title'             => 'humble finance - feedback',
                'page'              => 'finance/feedback_thankyou',
                'name'              => $this->input->post('name'),
                'financePage'       => 'feedback',
            )));
        } else {
            $this->load->view('template', array_merge($this->data, array(
                'title'             => 'humble finance - feedback',
                'page'              => 'finance/feedback',
                'financePage'       => 'feedback',
                'recaptcha'         => $this->recaptcha->get_html(),
                'subject'           => 'Humble Finance Feedback',
            )));
        }
    }

    public function _check_captcha($val)
    {
        return $this->feedback->check_captcha($val);
    }
}

