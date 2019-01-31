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
  @include('envision.demos')
@endisset

@endsection
