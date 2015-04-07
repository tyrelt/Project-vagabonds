module.exports = function(grunt){
    "use strict";
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-browserify');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        express: {
            all: {
                options: {
                    port: 9000,
                    hostname: '127.0.0.1',
                    livereload: true,
                    bases: './'
                }
            }
        },
        open: {
            all: {
                path: 'http://localhost:<%= express.all.options.port%>'
            }
        },
        watch: {
            all: {
                files: [
                    'index.html', 
                    'styles/*.scss'
                ],
                tasks: [
                    'sass', 
                    'cssmin'
                ],
                options: {
                    livereload: true
                }
            }
        },
        cssmin: {
            build: {
                src: 'minified/styles.css',
                dest: 'minified/styles.css'
            }
        },
        sass: {
            build: {
                files: {
                    'minified/styles.css': 'styles/styles.scss'
                }
            }
        },
    });
grunt.registerTask('default', [
    'sass',  
    'cssmin', 
    'express',
    'open', 
    'watch'
    ]);
};