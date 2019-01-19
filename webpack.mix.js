let mix = require('laravel-mix');

mix
  // Static assets:
  .copyDirectory('resources/images', 'public/images')

  // JS:
  .js('resources/js/index.js', 'public')
  .combine([
    'resources/lib/envisionjs/envision.js',
    'resources/lib/flotr2/js/types/bubbles.js',
    'resources/lib/flotr2/js/types/candles.js',
    'resources/lib/flotr2/js/types/gannt.js',
    'resources/lib/flotr2/js/types/markers.js',
    'resources/lib/flotr2/js/types/pie.js',
    'resources/lib/flotr2/js/types/radar.js',
    'resources/lib/flotr2/js/types/timeline.js',
    'resources/lib/flotr2/js/plugins/crosshair.js',
    'resources/lib/flotr2/js/plugins/download.js',
    'resources/lib/flotr2/js/plugins/grid.js',
    'resources/lib/flotr2/js/plugins/spreadsheet.js',
    'resources/lib/flotr2/flotr2.examples.types.js',
  ], 'public/libs.js')

  // Styles:
  .sass('resources/scss/index.scss', 'public')
  .styles([
    'resources/lib/envisionjs/envision.css',
    'public/index.css',
    'node_modules/code-prettify/src/prettify.css'
  ], 'public/styles.css')

  // Dev:
  .sourceMaps()
  .browserSync({
    open: false,
    files: [
      'resources/views/**/*',
      'public/styles.css',
      'public/index.js'
    ],
    proxy: 'localhost:8080'
  });
