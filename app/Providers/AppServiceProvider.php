<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
      Blade::directive('listing', function ($filename) {
        return file_get_contents("../resources/js/{$filename}");
      });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }
}
