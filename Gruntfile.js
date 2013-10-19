var
  rendr = require('rendr'),
  config = require('config'),
  DataAdapter = require('./server/lib/data_adapter');


var path = require('path');

var rendrDir = 'node_modules/rendr';
var rendrHandlebarsDir = 'node_modules/rendr-handlebars';
var rendrModulesDir = rendrDir + '/node_modules';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          paths: ["app/styles"]
        },
        files: {
          "public/styles.css": [
            "vendor/styles/**/*.css",
            //"app/styles/**/*.less"
            "app/styles/index.less"
          ]
        }
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: false,
          commonjs: true,
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace('.hbs', '');
          }
        },
        src: "app/templates/**/*.hbs",
        dest: "app/templates/compiledTemplates.js",
        filter: function(filepath) {
          var filename = path.basename(filepath);
          // Exclude files that begin with '__' from being sent to the client,
          // i.e. __layout.hbs. Hmm...
          return filename.slice(0, 2) !== '__';
        }
      }
    },

    watch: {
      scripts: {
        files: 'app/**/*.js',
        tasks: ['rendr_stitch'],
        options: {
          interrupt: true
        }
      },
      templates: {
        files: 'app/**/*.hbs',
        tasks: ['handlebars'],
        options: {
          interrupt: true
        }
      },
      stylesheets: {
        files: ['app/styles/**/*.less'],
        tasks: ['less'],
        options: {
          interrupt: true,
          livereload: 35730
        }
      }
    },

    rendr_stitch: {
      compile: {
        options: {
          dependencies: [
            'vendor/scripts/jquery*.js',
            'vendor/scripts/bootstrap*.js'
          ],
          npmDependencies: {
            underscore: '../rendr/node_modules/underscore/underscore.js',
            backbone: '../rendr/node_modules/backbone/backbone.js',
            handlebars: '../rendr-handlebars/node_modules/handlebars/dist/handlebars.runtime.js',
            async: '../rendr/node_modules/async/lib/async.js'
          },
          aliases: [
            {from: rendrDir + '/client', to: 'rendr/client'},
            {from: rendrDir + '/shared', to: 'rendr/shared'},
            {from: rendrHandlebarsDir, to: 'rendr-handlebars'},
            {from: rendrHandlebarsDir + '/shared', to: 'rendr-handlebars/shared'}
          ]
        },
        files: [{
          dest: 'public/mergedAssets.js',
          src: [
            'app/**/*.js',
            rendrDir + '/client/**/*.js',
            rendrDir + '/shared/**/*.js',
            rendrHandlebarsDir + '/index.js',
            rendrHandlebarsDir + '/shared/*.js'
          ]
        }]
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          port: 9000,
          base: 'public',
          middleware: function (connect, options) {
            var server = rendr.createServer({
              dataAdapter: new DataAdapter(config.api),
              appData: config.rendrApp
            });
            return [
              require('connect-livereload')({
                port : 35730
              }),
              connect.static('public/'),
              function () {
                //console.log(server);
                //console.log('called');
                server.apply(this, arguments);
              }
              //require('./index')
              /*
              */
            ];
          }
        }
      }
    },
    express: {
      server: {
        port: 9000,
        bases: 'public',
        server: path.resolve('./myserver'),
        liverelaod: true,
        serverreload : true
        //server: './index'
        /*
        middleware: [
          rendr.createServer({
            dataAdapter: new DataAdapter(config.api),
            appData: config.rendrApp
          })
        ]
        */
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-rendr-stitch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('runNode', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['./node_modules/nodemon/nodemon.js', '--debug', 'index.js'],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("nodemon quit"));
    });
  });


  grunt.registerTask('compile', ['handlebars', 'rendr_stitch', 'less']);

  // Run the server and watch for file changes
  grunt.registerTask('server', ['runNode', 'compile', 'watch']);

  // Default task(s).
  grunt.registerTask('default', ['compile']);
};
