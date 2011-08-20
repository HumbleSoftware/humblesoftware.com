<?php
class Feedback
{

    protected $_validation_rules = array(
        array(
            'field' => 'recaptcha_response_field',
            'label' => 'lang:recaptcha_field_name',
            'rules' => 'required|callback__check_captcha'
        ),
        array(
            'field' => 'name',
            'label' => 'Name',
            'rules' => ''
        ),
        array(
            'field' => 'email',
            'label' => 'Email',
            'rules' => 'valid_email'
        ),
        array(
            'field' => 'feedback',
            'label' => 'Message',
            'rules' => 'required'
        ),
        array(
            'field' => 'subject',
            'label' => 'Subject',
            'rules' => ''
        )
    );

    function __construct()
    {
        $this->CI =& get_instance();

        $helpers = array(
            'email',
            'form'
        );

        $libraries = array(
            'feedback',
            'recaptcha',
            'form_validation'
        );

        $this->CI->lang->load('recaptcha');
        $this->CI->load->helper($helpers);
        $this->CI->load->library($libraries);
    }

    public function validate()
    {
        $this->CI->form_validation->set_message('_check_captcha', $this->CI->lang->line('recaptcha_incorrect_response'));
        $this->CI->form_validation->set_rules($this->_validation_rules);

        if ($this->CI->form_validation->run()) {
            return true;
        } else {
            return false;
        }
    }

    public function send()
    {
        $name       = $this->CI->input->post('name');
        $email      = $this->CI->input->post('email');
        $subject    = $this->CI->input->post('subject');
        $feedback   = $this->CI->input->post('feedback');
        $message    = "{$feedback}\r\n\r\n{$name}\r\n";
        $recipient  = $this->CI->config->item('admin_email');
        $headers    = "From: feedback@humblesoftware.com\r\n";

        if ($email) $headers .= "Reply-To: {$email}\r\n";

        mail ($recipient, $subject, $message, $headers);
    }

    function check_captcha($val) {
        $CI =& get_instance();
        if ($CI->recaptcha->check_answer($CI->input->ip_address(), $CI->input->post('recaptcha_challenge_field'), $val)) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
}

