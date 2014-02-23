module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {                              // Task
    dist: {                            // Target
      files: [{
        expand: true,
        cwd: 'scss',
        src: ['*.scss'],
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
        files: {
            // Destination : Source
            './build/index.html': './index.html'
             }
        }
   },

cssmin: {
  combine: {
    files: {
      'build/css/all.css': [ 'css/*.css']
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
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/images/'
        }]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['sass', 'concat', 'uglify', 'htmlmin', 'cssmin', 'imagemin']);

}
