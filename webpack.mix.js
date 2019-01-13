let mix = require('laravel-mix');

mix
  .copyDirectory('resources/images', 'public/images')
  .js('resources/js/index.js', 'public')
  .combine([
    'resources/lib/envisionjs/envision.js',
    'resources/lib/flotr2/flotr2.examples.types.js',
  ], 'public/libs.js')
  .styles([
    'resources/lib/envisionjs/envision.css',
    'resources/styles/style.css',
  ], 'public/styles.css')
  .sourceMaps()
  .browserSync({
    open: false,
    files: [
      'resources/views/**/*',
      'public/**/*'
    ],
    proxy: 'localhost:8080'
  });
