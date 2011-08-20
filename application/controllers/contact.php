
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Contact extends CI_Controller {
    public function __construct()
    {
        parent::__construct();

        $this->load->helper(array(
            'url',
            'static'
        ));

    }
	public function index()
	{
        $this->load->library('feedback');

        if ($this->feedback->validate()) {
            $this->feedback->send();
            $this->load->view('template', array(
                'title'     => 'humble software development - contact',
                'page'      => 'contact_thankyou',
                'name'      => $this->input->post('name')
            ));
        } else {
            $this->load->view('template', array(
                'title'     => 'humble software development - contact',
                'page'      => 'contact',
                'recaptcha' => $this->recaptcha->get_html()
            ));
        }
	}

    public function _check_captcha($val)
    {
        return $this->feedback->check_captcha($val);
    }
}
