<?php
/**
 * Contact Mailable
 */

namespace App\Mail;

use Illuminate\Mail\Mailable;

class Contact extends Mailable
{
  protected $data;

  public function __construct($data)
  {
    $this->data = $data;
  }

  public function build()
  {
    $data = [
      'body' => $this->data['body']
    ];
    return $this
      ->view('emails.contact')
      ->with($data);
  }
}
