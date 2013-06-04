module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      compile: {
        options: {
          baseUrl: "js",
          name: "main",
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
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/js/main.js',
        dest: 'build/js/main.min.js'
      }
    },
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
    }
  });

  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'requirejs'/*, 'uglify'*/]);

};