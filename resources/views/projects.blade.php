@extends('index')

@section('title', 'projects')

@section('content')

<h2>Projects:</h2>

<div class="project feature">
  <span class="title">
    <a href="/envision">Envision.js</a> <span>Dynamic Interactive HTML5 Visualizations</span>
  </span>
  <div id="envision-demo"></div>
  <span class="description">
    Envision.js is a library for building fast, dynamic, interactive HTML5 visualizations.
  </span>
</div>

<div class="project wide">
  <span class="title">
    <a href="/flotr2/index">Flotr2</a>
  </span>
  <span class="description">
    A modern graphing library for Canvas written in JavaScript.
  </span>
  <div id="flotr-demo">
    <a class="project-flotr-demo-link" title="flotr examples" href="/flotr2/index">
      <div class="project-flotr-demo a"></div>
      <div class="project-flotr-demo b"></div>
    </a>
  </div>
  <div class="features">
    <p>Features:</p>
    <ul>
      <li>mobile support</li>
      <li>framework independent</li>
      <li>lines, bars, bubbles and more</li>
      <li>extensible plugin framework</li>
      <li>FF, Chrome, IE6+</li>
    </ul>
  </div>
</div>

<div class="project">
  <span class="title">
    <a href="/finance/index">HumbleFinance</a>
  </span>
  <span class="icon">
    <a href="/finance/index"><img alt="Project: HumbleFinance" src="/images/products/finance-icon.jpg" /></a>
  </span>
  <span class="description">
    Dynamic charts with HTML5, Canvas, and Flotr for Prototype.  
    <a href="/finance/index">HumbleFinance</a>
    is an OpenSource project which can display two 2-D numeric 
    datasets sharing an axis.
  </span>
</div>

<div class="project">
  <span class="title">
    <a href="/movemytaxes/">Move My Taxes</a>
  </span>
  <span class="icon">
    <a href="/movemytaxes/"><img alt="Project: Move My Taxes" src="/images/products/movemytaxes-icon.jpg" /></a>
  </span>
  <span class="description">
    Move My Taxes was created for the <a href="http://www.datavizchallenge.org">
    Data Viz Challenge</a>.
  </span>
</div>

<div class="project">
  <span class="title">
    <a href="http://www.github.com/HumbleSoftware/js-imagediff/">js-imagediff</a>
  </span>
  <span class="icon">
    <a href="http://www.github.com/HumbleSoftware/js-imagediff/"><img style="border: 0px;" alt="Sample image diff." src="/images/products/js-imagediff.png" /></a>
  </span>
  <span class="description">
    A JS / Canvas imagediff utilitity.  Brings image diff to the browser and Canvas
    unit testing to <a href="http://pivotal.github.com/jasmine/">Jasmine</a>.
  </span>
</div>

<div class="project">
  <span class="title">
    <a href="/helloreddit/home">HelloReddit</a>
  </span>
  <span class="icon">
    <a href="/helloreddit/home"><img alt="Project: HelloReddit" src="/images/products/helloreddit-icon.jpg" /></a>
  </span>
  <span class="description">
    A mobile BlackBerry app for browsing <a href="http://www.reddit.com/">Reddit</a>.
    It is OpenSource and written in Java.
  </span>
</div>

@endsection
