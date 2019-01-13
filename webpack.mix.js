let mix = require('laravel-mix');

mix
  .copyDirectory('resources/images', 'public/images')
  .js('resources/js/index.js', 'public')
  .sass('resources/scss/index.scss', 'public')
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
  .styles([
    'resources/lib/envisionjs/envision.css',
    'public/index.css',
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
