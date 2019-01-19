<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
  private function view ($partial, $data = []) {
    return view($partial, array_merge([
      'current_route' => $partial
    ], $data));
  }

  function home () {
    return $this->view('home');
  }

  function projects () {
    return $this->view('projects');
  }

  function demos ($demo = null) {
    return $this->view('demos'.$this->sanitizeView($demo ?? ''));
  }

  function contact () {
    return $this->view('contact');
  }

  function terms () {
    return $this->view('terms');
  }

  protected function sanitizeView ($view) {
    return $view ? '/'.basename($view) : '';
  }
}
