
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
        $this->load->view('template', array(
            'title' => 'humble software development - contact',
            'page' => 'contact'
        ));
	}
    public function send()
    {
        $this->load->helper(array(
            'email'
        ));

        $name       = $this->input->post('name');
        $email      = $this->input->post('email');
        $subject    = $this->input->post('subject');
        $feedback   = $this->input->post('feedback');
        $message    = "$name $email $subject $feedback";
        $recipient  = $this->config->item('admin_email');
        $headers    = "From: {$email}\r\n" .
                      "Reply-To: {$email}\r\n";

        if (!valid_email($email)) return false;

        mail ($recipient, $subject, $message, $headers);
    }
}
