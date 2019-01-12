<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get  ('/',                      'Controller@home');
$router->get  ('/projects',              'Controller@projects');
$router->get  ('/demos',                 'Controller@demos');
$router->get  ('/contact',               'Contact@index');
$router->post ('/contact',               'Contact@contact');
$router->get  ('/terms',                 'Controller@terms');
