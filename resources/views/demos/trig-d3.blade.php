@extends('index')

@section('title', 'demos - trig (d3)')
@section('content-class', 'demos demos-trig')

@section('content')

  <h2>Trig Demo - D3</h2>

  <p class="summary" style="text-align: center;">
      The first thing that should be shown in any Trigonometry class, done in
    d3.js  Compare to: <a href="http://www.reddit.com/tb/bnzgx">
    http://www.reddit.com/tb/bnzgx</a>. 
  </p>

  <div id="trig"></div>

  @component('components.code-block', ['title' => 'trig-d3.js'])
    @listing(demos/trig-d3.js)
  @endcomponent

@endsection

@push('scripts')
  <script type="text/javascript" src="/js/demos/trig-d3.js"></script>
@endpush
