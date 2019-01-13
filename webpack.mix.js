let mix = require('laravel-mix');

mix
  .js('resources/js/index.js', 'public')
  .combine([
    'resources/lib/envisionjs/envision.js',
    'resources/lib/flotr2/flotr2.examples.types.js',
  ], 'public/libs.js')
  .styles([
    'resources/lib/envisionjs/envision.css',
    'resources/styles/style.css',
  ], 'public/styles.css')
  .browserSync({
    open: false,
    files: [
      'resources/views/**/*',
      'public/**/*'
    ],
    proxy: 'localhost:8080'
  });
