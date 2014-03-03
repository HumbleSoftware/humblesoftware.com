/**
 * This file/module contains all configuration for the build process.
 */
module.exports = function (grunt) {

  return {
    build_dir: 'static',
    app_files: {
      less: 'less/main.less'
    },
    vendor_files: {
      css: [
        'lib/google-code-prettify/prettify.css'
      ]
    }
  };

};
