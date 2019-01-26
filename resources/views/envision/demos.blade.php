@extends('index')

@section('title', 'envision')
@section('content-class', 'envision')
@section('content')

@include("envision.demos{$demo}")

@endsection

