<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class Contact extends BaseController
{
  private function view ($partial, $data = []) {
    return view($partial, array_merge([
      'current_route' => $partial
    ], $data));
  }

  function index () {
    return $this->view('contact', [
      'sitekey' => env('RECAPTCHA_SITEKEY'),
      'thanks' => false
    ]);
  }

  function contact (Request $request) {

    $name = $request->get('name');
    $email = $request->get('email');
    $subject = $request->get('subject');
    $feedback = $request->get('feedback');
    $recaptcha = $request->get('g-recaptcha-response');

    if ($this->validateRecaptcha($recaptcha)) {

      $message    = "{$feedback}\r\n\r\n{$name}\r\n";
      $recipient  = 'carl@humblesoftware.com';
      $headers    = "From: feedback@humblesoftware.com\r\n";
      if ($email) $headers .= "Reply-To: {$email}\r\n";

      $result = mail($recipient, $subject, $message, $headers);

      $success = true;
    }

    return $this->view('contact', [
      'sitekey' => env('RECAPTCHA_SITEKEY'),
      'thanks' => $success ?? false,
      'name' => $name
    ]);
  }

  function validateRecaptcha ($recaptcha) {

    $client = new Client();

    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $response = $client->request('POST', $url, [
			'query' => [
				'response' => $recaptcha,
				'secret' => env('RECAPTCHA_SECRET')
			]
		]);

    $body = json_decode($response->getBody()->getContents(), true);

    return $body['success'];
  }
}

