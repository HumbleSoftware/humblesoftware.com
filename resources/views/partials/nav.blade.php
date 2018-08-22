<nav class="navbar navbar-expand-lg navbar-light bg-light">

  <a class="navbar-brand" href="/">humble</a>

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      @include('partials.nav-link', ['route' => '', 'title' => 'home', 'active' => $current_route === 'home'])
      @include('partials.nav-link', ['route' => 'projects', 'title' => 'projects'])
      @include('partials.nav-link', ['route' => 'demos', 'title' => 'demos'])
      <li class="nav-item">
        <a class="nav-link" href="https://github.com/humblesoftware" target="_blank">
          github <i class="fas fa-external-link-square-alt"></i>
        </a>
      </li>
      @include('partials.nav-link', ['route' => 'contact', 'title' => 'contact'])
    </ul>
  </div>
</nav>
