@extends('index')

@section('title', 'contact')

@section('content')
  <script src='https://www.google.com/recaptcha/api.js'></script>

  <section class="contact">
    <h2><a name="contact"></a>Contact:</h2>
    <div class="row">
      <div class="col-sm-2">
        <span class="label">Email:</span>
      </div>
      <div class="col-sm-10">
        <span id="contactEmail">carl [at] this domain name . com</span>
      </div>
    </div>
  </section>

  <section class="feedback">

    <form method="post" action="/contact">

      <div class="row">
        <div class="col-sm-12">
          <h2><a name="email"></a>Send us a Message:</h2>
        </div>
      </div>

      @if ($thanks)
      <p>
        Thank you for your message {{$name}}
      </p>
      @else

      <input type="hidden" name="action" value="feedback" />

      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="name">Name:</label>
        <div class="col-sm-10">
          <input class="form-control" type="text" id="name" name="name" value="{{$name}}"/>
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="email">Email:</label>
        <div class="col-sm-10">
          <input class="form-control" type="email" id="email" name="email" required value="{{$email}}" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="subject">Subject:</label>
        <div class="col-sm-10">
          <input class="form-control" type="text" id="subject" name="subject" value="{{$subject}}" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-2 col-form-label" for="feedback">Message:</label>
        <div class="col-sm-10">
          <textarea class="form-control" id="feedback" name="feedback" rows="14" cols="80" required>{{$feedback}}</textarea>
        </div>
      </div>

      <div class="form-group row">
        <div class="col-sm-10 offset-sm-2 g-recaptcha" data-sitekey="{{$sitekey}}"></div>
      </div>

      <div class="form-group row">
        <div class="col-sm-10 offset-sm-2">
          <input class="btn btn-primary" id="submit" type="submit" name="submit" value="Send Feedback" />
        </div>
      </div>

      @endif

    </form>
  </section>

@endsection
