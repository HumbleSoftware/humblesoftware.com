<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use App\Mail\Contact as ContactMail;

class Contact extends BaseController
{
  private function view ($partial, $data = []) {
    return view($partial, array_merge([
      'current_route' => $partial
    ], $data));
  }

  function index () {
    return $this->view('contact', [
      'sitekey'  => env('RECAPTCHA_SITEKEY'),
      'thanks'   => false,
      'name'     => '',
      'email'    => '',
      'subject'  => '',
      'feedback' => ''
    ]);
  }

  function contact (Request $request) {

    $name      = $request->get('name');
    $email     = $request->get('email');
    $subject   = $request->get('subject');
    $feedback  = $request->get('feedback');
    $recaptcha = $request->get('g-recaptcha-response');
    $recipient = 'carl@humblesoftware.com';

    if ($this->validateRecaptcha($recaptcha)) {
      $mail = (new ContactMail(['body' => $feedback]))
        ->from(config('mail.from.address'), $name)
        ->subject($subject)
        ->replyTo('cesutherland@gmail.com');

      try {
        Mail::to($recipient)
  //        ->cc($email)
          ->send($mail);
      } catch (Exception $e) {
        // Swallow exceptions?
        $recaptcha = false;
      }
    }

    return $this->view('contact', [
      'sitekey'  => env('RECAPTCHA_SITEKEY'),
      'thanks'   => (!!$recaptcha) ?? false,
      'name'     => $name,
      'email'    => $email,
      'subject'  => $subject,
      'feedback' => $feedback
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

