// grunt file
module.exports = function(grunt) {
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
          'dist/styles/pure-custom.min.css': ['public/stylesheets/style.styl']
        }
      }
    },

    // JShint: lint javascript files
    jshint: {
      // configure JSHint (see http://www.jshint.com/docs/)
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          jshintrc: 'jshintrc',
          devel: true,
          describe: true,
          it: true,
          require: true,
          process: true
        },
        indent: 2,
        undef: true,
        expr: true,
        camelcase: true,
        onevar: true,
        nomen: true,
        node: true
      },
      files: {
        src: [
          '*.js',
          'public/javascripts/**/*.js',
          'test/**/*.js',
          'routes/**/*.js',
          'models/**/*.js'
        ]
      }
    },

    // uglify: minify js, css files
    //uglify: {},

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

    // watch: track files for changes
    watch: {
      files: [
        'Gruntfile.js',
        'test/**/*.js',
        'public/stylesheets/*.styl',
        'routes/*.js',
        'views/**/*.hbs'
      ],
      tasks: ['jshint', 'simplemocha']
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
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');


  // register tasks
  // gruntRegisterTask
  grunt.registerTask('test', ['jshint', 'simplemocha']);
  grunt.registerTask('styles', ['stylus']);
  grunt.registerTask('server', ['concurrent:target']);
  //grunt.registerTask('default', ['uglify', 'concat']);
};