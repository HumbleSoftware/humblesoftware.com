
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
        $helpers = array(
            'email',
            'form'
        );
        $libraries = array(
            'recaptcha',
            'form_validation'
        );

        $this->lang->load('recaptcha');
        $this->load->helper($helpers);
        $this->load->library($libraries);
        $this->form_validation->set_message('_check_captcha', 'Captcha failed.');

        if ($this->form_validation->run()) {
            $this->send_feedback();
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
        if ($this->recaptcha->check_answer($this->input->ip_address(),$this->input->post('recaptcha_challenge_field'),$val)) {
            return TRUE;
	    } else {
            $this->form_validation->set_message('check_captcha',$this->lang->line('recaptcha_incorrect_response'));
            return FALSE;
	    }
	}

    protected function send_feedback()
    {
        $name       = $this->input->post('name');
        $email      = $this->input->post('email');
        $subject    = $this->input->post('subject');
        $feedback   = $this->input->post('feedback');
        $message    = "{$feedback}\r\n\r\n{$name}\r\n";
        $recipient  = $this->config->item('admin_email');
        $headers    = "From: feedback@humblesoftware.com\r\n";

        if ($email) $headers .= "Reply-To: {$email}\r\n";

        mail ($recipient, $subject, $message, $headers);
    }
}
