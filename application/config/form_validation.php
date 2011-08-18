<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
    array(
      'field' => '',
      'label' => '',
      'rules' => ''
    )
*/
$config = array(
  'contact/index' => array(
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
  )
);
