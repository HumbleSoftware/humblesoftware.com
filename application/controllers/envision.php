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

        $this->data = array(
            'includes'          => $this->includes,
            'template_header'   => 'envision/header',
            'template_links'    => 'envision/links'
        );
    }
    public function index()
    {
    }
    public function documentation()
    {
    }
    public function feedback()
    {
    }
}
