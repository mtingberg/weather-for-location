/*jslint node: true */
module.exports = function (grunt) {
    'use strict';

    // Load tasks from package.json matching "grunt-*"
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            'root_dir': '.',
            'src_dir': 'app',
            'dest_dir': 'dist',

            'dest_app_dir': '<%= config.dest_dir %>/app',
            'dest_assets_dir': '<%= config.dest_app_dir %>/assets',

            'dest_assets_images_dir': '<%= config.dest_assets_dir %>/images',

            'src_assets_css_dir': '<%= config.src_dir %>/assets/styles',
            'dest_assets_css_dir': '<%= config.dest_assets_dir %>/styles',

            'src_app_scripts_dir': '<%= config.src_dir %>/assets/scripts',
            'dest_app_scripts_dir': '<%= config.dest_assets_dir %>/scripts'
        },

        // ----------------------------
        // building
        // ----------------------------

        browserify: {
            options: {
                transform: [
                    ['babelify', { 'stage': 2 }]
                ]
            },
            build: {
                files: {
                    '<%= config.dest_app_scripts_dir %>/bundle.js': ['<%= config.src_dir %>/index.js']
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            release: {
                files: {
                    '<%= config.dest_app_scripts_dir %>/bundle.js': ['<%= config.src_dir %>/index.js']
                },
                options: {
                    browserifyOptions: {
                        debug: false
                    }
                }
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: 'true',
                        cwd: '<%= config.src_dir %>',
                        src: [
                            './**/*',
                            '!./**/*.js',
                            '!./**/*.less',
                            '!./**/*.css',
                            '!./**/*.json'
                        ],
                        dest: '<%= config.dest_app_dir %>'
                    }
                ]
            }
        },

        less: {
            all: {
                options: {
                    strictMath: true,
                    paths: ['<%= config.src_dir %>/assets']
                },
                files: {
                    '<%= config.dest_assets_css_dir %>/index.css': '<%= config.src_assets_css_dir %>/index.less'
                }
            }
        },

        uglify: {
            all:{
                src: '<%= config.dest_app_scripts_dir %>/bundle.js',
                dest: '<%= config.dest_app_scripts_dir %>/bundle.js'
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({browsers: ['last 2 versions']})
                ]
            },
            dist: {
                src: '<%= config.dest_assets_css_dir %>/index.css' // dest will be set automatically (same as src)
            }
        },

        exorcise: {
            build: {
                options: {},
                files: {
                    '<%= config.dest_app_scripts_dir %>/bundle.js.map':
                        ['<%= config.dest_app_scripts_dir %>/bundle.js']
                }
            }
        },

        ngAnnotate: {
            modules: {
                files: [
                    {
                        expand: true,
                        src: '<%= config.dest_app_scripts_dir %>/bundle.js'
                    }
                ]
            }
        },

        // ----------------------------
        // minification
        // ----------------------------

        htmlmin: {
            all: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.dest_app_dir %>',
                        src : ['**/*.html'],
                        dest: '<%= config.dest_app_dir %>'
                    }
                ]
            }
        },

        cssmin: {
            all: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.dest_assets_css_dir %>',
                        src : 'index.css',
                        dest: '<%= config.dest_assets_css_dir %>'
                    }
                ]
            }
        },

        imagemin: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dest_assets_images_dir %>',
                        src: ['**/*.{jpg,jpeg,gif,png,webp}'],
                        dest: '<%= config.dest_assets_images_dir %>'
                    }
                ],
                options: {
                    cache: false,           // needed for not creating empty files (imagemin bug...)
                    optimizationLevel: 3    // for png images
                }
            }
        },


        // ----------------------------
        // revving
        // ----------------------------

        // Renames files for browser caching purposes
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            files: {
                src: [
                    '<%= config.dest_assets_dir %>/**/*.{jpg,jpeg,gif,png,webp}',
                    '<%= config.dest_assets_dir %>/**/*.css',
                    '<%= config.dest_assets_dir %>/**/*.js',
                    '<%= config.dest_assets_dir %>/**/*.json',
                    '<%= config.dest_assets_dir %>/**/*.{woff,svg,eot,ttf}'
                ]
            }
        },

        usemin: {
            html: '<%= config.dest_app_dir %>/index.html',
            css:  '<%= config.dest_assets_dir %>/**/*.css',
            options: {
                assetsDirs: ['<%= config.dest_app_dir %>']
            }
        },


        // ----------------------------
        // tidying up
        // ----------------------------

        clean: {
            all: [
                '<%= config.dest_dir %>'
            ]
        },

        // ----------------------------
        // hinting and linting
        // ----------------------------

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '<%= config.src_dir %>/**/*.js']
        },

        // ----------------------------
        // background build tasks
        // ----------------------------

        watch: {
            options: {
                livereload: true
            },
            build: {
                files: [
                    '<%= config.src_dir %>/**/*',
                    './Gruntfile.js',
                    '!<%= config.src_dir %>/**/*.css',
                    '!<%= config.src_dir %>/version.json',
                    '<%= config.src_assets_css_dir %>/vendor/**/*.css'
                ],
                tasks: ['build']
            },
            buildRelease: {
                files: [
                    '<%= config.src_dir %>/**/*',
                    './Gruntfile.js',
                    '!<%= config.src_dir %>/**/*.css',
                    '!<%= config.src_dir %>/version.json',
                    '<%= config.src_assets_css_dir %>/vendor/**/*.css'
                ],
                tasks: ['build-release']
            }
        },

        connect: {
            server: {
                options: {
                    port: 8888,
                    livereload: true,
                    base: [
                        '<%= config.dest_app_dir %>'
                    ]
                }
            },
            no_live_reload: {
                options: {
                    port: 8888,
                    livereload: false,
                    base: [
                        '<%= config.dest_app_dir %>'
                    ]
                }
            }
        }
    });

    grunt.registerTask('build', 'Create a development build', [
        'clean',
        'jshint',
        'less',
        'postcss',
        'copy:build',
        'browserify:build',
        'exorcise:build'
    ]);

    grunt.registerTask('build-release', 'Create a production build (all build steps)', [
        'clean',
        'jshint',
        'less',
        'postcss',
        'copy',
        'imagemin',
        'cssmin',
        'browserify:release',
        'ngAnnotate',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('server', 'Minimum number of build steps, live reload and watch', [
        'build',
        'connect:server',
        'watch:build'
    ]);

    grunt.registerTask('server-release', 'Release build steps, live reload and watch', [
        'build-release',
        'connect:server',
        'watch:buildRelease'
    ]);

    grunt.registerTask('server-nlr', 'Build and run with watch but no live reload', [
        'build',
        'connect:no_live_reload',
        'watch:build'
    ]);

    grunt.registerTask('server-release-nlr', 'Release build steps, watch but no live reload', [
        'build-release',
        'connect:no_live_reload',
        'watch:buildRelease'
    ]);

    grunt.registerTask('default', 'Default task', ['jshint']);
};
