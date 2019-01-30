let mix = require('laravel-mix');

mix
  // Static assets:
  .copyDirectory('resources/images', 'public/images')
  .copyDirectory('resources/js/demos', 'public/js/demos')

  // JS:
  .js('resources/js/index.js', 'public')
  .combine([

    // Envision & Flotr2:
    'resources/lib/envisionjs/envision.js',

    // Flotr2 extra types, plugins & examples:
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

    // Editor:
    'resources/lib/flotr2/examples/lib/codemirror/lib/codemirror.js',
    'resources/lib/flotr2/examples/lib/codemirror/mode/javascript/javascript.js',
    'resources/lib/flotr2/examples/lib/codemirror/mode/htmlmixed/htmlmixed.js',
    'resources/lib/flotr2/examples/lib/codemirror/mode/css/css.js',
    'resources/lib/flotr2/examples/lib/codemirror/mode/xml/xml.js',
    'resources/lib/flotr2/examples/lib/beautify.js',
    'resources/lib/flotr2/examples/lib/randomseed.js',
    'resources/lib/flotr2/examples/js/Editor.js',

    // D3:
    'resources/lib/d3.min.js',

  ], 'public/libs.js')

  // Styles:
  .sass('resources/scss/index.scss', 'public')
  .styles([

    // Libs:
    'resources/lib/envisionjs/envision.css',
    'resources/lib/flotr2/examples/lib/codemirror/lib/codemirror.css',
    'resources/lib/flotr2/examples/editor.css',
    'node_modules/code-prettify/src/prettify.css',

    // Built SCSS:
    'public/index.css',

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
