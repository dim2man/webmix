module.exports=function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jquery: true,
          console: true,
          module: true,
          /* mine */
          curly: true,
          immed: true,
          indent: 2,
          latedef: true,
          noarg: true,
          noempty: true,
          quotmark: true,
          undef: true,
          unused: true,
          strict: true,
          trailing: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "js",
          name: "main",
          // name: "../libsrc/almond",
          // include: ["main"],
          // insertRequire: ["main"],
          // wrap: true,
          paths: {
            "jquery": "empty:",
            "jquerymobile": "empty:",
            "underscore": "empty:",
            "backbone": "empty:",
            "pure": "empty:",
            "update": "plugins/jquery.update"
          },
          out: "build/js/main.js"
        }
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['**/*.css'],
        dest: 'build/css/',
        ext: '.css'
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['index.html'],
          dest: 'build/'
        }, {
          expand: true,
          src: ['css/**/images/**'],
          dest: 'build/'
        }, {
          expand: true,
          src: ['lib/**'],
          dest: 'build/',
          filter: function(path) {
            return path.search(/qunit/) == -1;
          }
        }]
      }
    },
    manifest: {
      generate: {
        options: {
          basePath: 'build/',
          // cache: ['js/app.js', 'css/style.css'],
          // network: ['http://*', 'https://*'],
          // fallback: ['/ /offline.html'],
          // exclude: ['js/jquery.min.js'],
          // preferOnline: true,
          verbose: true,
          timestamp: true
        },
        src: ['**/*.*'],
        dest: 'build/cache.manifest'
      }
    },
    qunit: {
      all: ['test/**/*.html']
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task
  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'requirejs', 'cssmin', 'copy', 'manifest']);

};