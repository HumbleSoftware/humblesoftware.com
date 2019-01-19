@extends('index')

@section('title', 'demos - trig (canvas)')

@section('content')

  <h2>Trig Demo</h2>

  <p class="summary" style="text-align: center;">
      The first thing that should be shown in any Trigonometry class, done in
    Canvas.  Compare to: <a href="http://www.reddit.com/tb/bnzgx">
    http://www.reddit.com/tb/bnzgx</a>. 
  </p>

  <div id="canvas-container" style="width: 800px; height: 300px;">
      <canvas id="sineCanvas"  style="width: 800px; height: 300px;"></canvas>
  </div>

  @component('components.code-block', ['title' => 'trig.js'])
    @listing(demos/Trig.js)
  @endcomponent

@endsection
