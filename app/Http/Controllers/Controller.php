<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
  private function view ($partial, $data = []) {
    return view($partial, array_merge([
      'base_url' => '/',
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

  function envision ($page = null) {
    $page = $page ?: 'index';
    return $this->view('envision'.$this->sanitizeView($page ?? ''), [
      'base' => '/envision'
    ]);
  }

  function envisionDemos ($page = null) {
    return $this->view('envision/demos', [
      'demo' => $this->sanitizeView($page ?? '')
    ]);
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
