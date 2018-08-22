<li class="nav-item @if ($active ?? $current_route === $route)active @endif">
  <a class="nav-link" href="/{{$route}}">
    {{$title}}@if ($current_route === $route)<span class="sr-only">(current)</span> @endif
  </a>
</li>
