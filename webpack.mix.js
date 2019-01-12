let mix = require('laravel-mix');

mix
  .js('resources/js/index.js', 'public')
  .styles([
    'resources/styles/style.css'
  ], 'public/styles.css')
  .browserSync({
    open: false,
    files: [
      'resources/views/**/*',
      'public/**/*'
    ],
    proxy: 'localhost:8080'
  });
