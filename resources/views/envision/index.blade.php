@extends('index')

@section('title', 'envision')
@section('content-class', 'envision envision-demos')
@section('content')

@include('envision.links')

<div class="stub">
Envision.js is a library for creating fast, dynamic and interactive HTML5 visualizations.
</div>

@isset($demo)
  @include('envision.demos'.$demo)
</div>
@else
  <div id="envision-demos">@include('envision.demos')</div>
@endisset

@push('scripts')
  <script type="text/javascript" src="/js/envision/realtime.js"></script>
  <script type="text/javascript" src="/js/envision/timeseries.js"></script>
  <script type="text/javascript" src="/js/envision/finance.js"></script>
  <script type="text/javascript" src="/js/envision/ajax.js"></script>
  <script type="text/javascript" src="/js/envision/fractal.js"></script>
@endpush

@endsection
