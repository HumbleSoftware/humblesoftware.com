module.exports = function ( grunt ) {
  
  /** 
   * Load required Grunt tasks.
   */
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-recess');

  /**
   * Load build configuration file.
   */
  var userConfig = require( './build.config.js' )( grunt );

  /**
   * Configure our tasks.
   */
  var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),

    /**
     * The banner is the comment that is placed at the top of our compiled 
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner: 
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
        ' */\n',
      // set by shell:commit
      commit: ''
    },

    /**
     * The directories to delete when `grunt clean` is executed.
    clean: [ 
      '<%= build_dir %>', 
      '<%= compile_dir %>'
    ],
     */

    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      /**
       * The `build_css` target concatenates compiled CSS and vendor CSS
       * together.
       */
      build_css: {
        src: [
          '<%= vendor_files.css %>',
          '<%= recess.build.dest %>'
        ],
        dest: '<%= recess.build.dest %>'
      },
    },

    /**
     * Minify the sources!
     */
    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    /**
     * `recess` handles our LESS compilation and uglification automatically.
     * Only our `main.less` file is included in compilation; all other files
     * must be imported from this file.
     */
    recess: {
      build: {
        src: [ '<%= app_files.less %>' ],
        dest: '<%= build_dir %>/css/hsd.css',
        options: {
          compile: true,
          compress: false,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      },
      compile: {
        src: [ '<%= recess.build.dest %>' ],
        dest: '<%= recess.build.dest %>',
        options: {
          compile: true,
          compress: true,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      }
    },

    less: {
      development: {
        options: {
          paths: [
            'less',
            'lib/bootstrap/less'
          ]
        },
        files: {
          '<%= build_dir %>/css/hsd.css': '<%= app_files.less %>'
        }
      }
    },

    delta: {
      options: {
      },

      /**
       * When our JavaScript source files change, we want to run lint them and
       * run our unit tests.
      jssrc: {
        files: [ 
          '<%= app_files.js %>'
        ],
        tasks: [ 'build' ]
      },
       */

      /**
       * When the CSS files change, we need to compile and minify them.
       */
      less: {
        files: [ 'less/**/*.less' ],
        tasks: [ 'less', 'concat:build_css' ]
      }
    }
  };

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('watch', ['build', 'delta']);
  grunt.registerTask('build', [
    'less', 'concat:build_css'
  ]);

};
