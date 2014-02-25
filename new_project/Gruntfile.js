module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              // Task
    dist: {                            // Target
      files: [{
        expand: true,
        cwd: 'scss',
        src: ['*.scss', 'style.scss'],
        dest: 'css/',
        ext: '.css'
      }]
    }
  },
    concat: {
      dist: {
        src: ['js/*.js'],
        dest: 'build/js/all.js',
      }
    },
    uglify: {
      dist: {
        files: {
          // Destination : Source
          'build/js/all.min.js': ['build/js/all.js']
        }
      }
    },
    htmlmin: {
    dist: {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            removeEmptyAttributes: true,
            removeCommentsFromCDATA: true,
            removeRedundantAttributes: true,
            collapseBooleanAttributes: true
        },
        files: [{
        expand: true,
        cwd: '',
        src: ['*.html'],
        dest: 'build/',
        ext: '.html'
      }]
        }
   },

cssmin: {
  combine: {
    files: {
      'build/css/all.css': [ 'css/*.css', 'css/style.css']
    }
  },

  minify: {
    expand: true,
    cwd: 'build/css/',
    src: ['all.css', '!*.min.css'],
    dest: 'build/css/',
    ext: '.min.css'
  }
  
},

imagemin: {
      options: {
        cache: false
      },

      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['*.{png,jpg}'],
          dest: 'build/images/'
        }]
      }
    },


  jshint: {
    all: ['Gruntfile.js', 'js/*.js']
  },

  csslint: {
    src: ['css/*.css', '!css/normalize.css']
  },

    watch: {
    scripts: {
        files: ['js/*.js'],
        tasks: ['newer:jshint','newer:concat', 'newer:uglify'],
        },
    sccstyles: {
        files: ['scss/*.scss'],
        tasks: ['newer:sass'],
    },
    ccstyles: {
        files: ['css/*.css'],
        tasks: [ 'newer:csslint', 'newer:cssmin'],
    },
    htmls: {
        files: ['/*.html'],
        tasks: ['newer:htmlmin'],
        },
    images: {
        files: ['images/*.{png,jpg}'],
        tasks: ['newer:imagemin'],
    },
  },
});

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  
  grunt.registerTask('default', ['newer:sass', 'newer:jshint', 'newer:concat', 'newer:uglify', 'newer:htmlmin', 'newer:csslint', 'newer:cssmin', 'newer:imagemin', 'watch']);

};
