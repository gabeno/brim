// grunt file
module.exports = function(grunt) {

  'use strict';

  // initialize grunt
  grunt.initConfig({
    // read project settings into the pkg property
    pkg: grunt.file.readJSON('package.json'),

    // plugins and their configs
    // Stylus: compile to file
    stylus: {
      compile: {
        options: {
          'include css': true
        },
        files: {
          'dist/styles/brim-min.css': ['public/stylesheets/style.styl']
        }
      }
    },

    // JShint: lint javascript files
    // Ignore external libraries
    jshint: {
      // configure JSHint (see http://www.jshint.com/docs/)
      options: {
        jshintrc: '.jshintrc',
        ignores: ['lib/**/*.js']
      },
      all: [
        'Gruntfile.js',
        'brim/**/*.js',
      ]
    },

    // uglify: minify js, css files
    uglify: {
      options: {
        compress: true
      },
      js: {
        src: 'public/js/lib/**/*.js',
        dest: 'dist/js/lib/min'
      }
    },

    // concat: combine files
    //concat: {},

    // simplemocha: test suite
    simplemocha: {
      options: {
        globals: ['describe'],
        timeout: 3000,
        reporter: 'spec',
        ui: 'bdd'
      },
      files: {
        src: ['test/**/*.js']
      }
    },

    // copy image files to dist
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'public/images', src: ['**'], dest: 'dist/img', filter: 'isFile' },
          { expand: true, cwd: 'public/stylesheets/fonts', src: ['**'], dest: 'dist/styles/fonts' },
          { expand: true, cwd: 'public/stylesheets/vendor/fa-4.0.3', src: ['**'], dest: 'dist/styles/fa' },
          { expand: true, cwd: 'public/js', src: ['**'], dest: 'dist/js' }
          // { expand: true, cwd: 'public/js', src: ['**'], dest: 'dist/js' }
        ]
      }
    },

    // watch: track files for changes
    watch: {
      files: [
        'Gruntfile.js',
        'test/**/*.js',
        'public/**/*',
        'routes/*.js',
        'views/**/*.hbs'
      ],
      tasks: ['stylus', 'copy:main']
    },

    // nodemon: run server with the following options
    nodemon: {
      dev: {
        options: {
          file: 'server.js',
          args: ['dev'],
          nodeArgs: ['--debug'],
          ignoredFiles: ['node_modules/**'],
          delayTime: 2,
          env: {
            PORT: '3000'
          }
        }
      }
    },

    // concurrent: run watch and nodemon concurrently
    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // load plugins
  // gruntLoadNpmTasks
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-copy');


  // register tasks
  // gruntRegisterTask
  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('styles', ['stylus']);
  grunt.registerTask('server', ['concurrent:target']);
  grunt.registerTask('move', ['copy']);
  grunt.registerTask('min', ['uglify']);
  //grunt.registerTask('default', ['uglify', 'concat']);
};