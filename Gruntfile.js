'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            target: {
                files: {
                    'dist/front.min.js': [
                        'src/js/global.js',
                        'src/js/exceptions.js',
                        'src/js/handlebars/helpers.js',
                        'src/js/component.js',
                        'src/js/toast.js',
                        'src/js/request.js',
                        'src/js/slider.js',
                        'src/js/forms.js',
                        'src/js/select_all.js',
                        'src/js/select.js',
                        'src/js/show_hide_password.js',
                        'src/js/big_radio.js',
                        'src/js/colors.js',
                        'src/js/sidenav.js',
                        'src/js/collapse.js',
                        'src/js/buttons.js',
                        'src/js/modal.js',
                        'src/js/lazy_images.js',
                    ],
                    'dist/front_head.min.js': [
                        'src/js/utils.js',
                        'src/js/head/websockets.js',
                        'src/js/head/detect_js.js',
                    ],
                    'dist/front_body.min.js': [
                        'src/js/body/theme.js',
                    ],
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'dist/front.min.css': [
                        'src/css/normalize.css',
                        'src/css/bootstrap/bootstrap-grid.css',
                        'src/css/colors.css',
                        'src/css/base.css',
                        'src/css/animations.css',
                        'src/css/skeleton_state.css',
                        'src/css/icons.css',
                        'src/css/toast.css',
                        'src/css/loading.css',
                        'src/css/utils.css',
                        'src/css/navbar.css',
                        'src/css/sidenav.css',
                        'src/css/breadcrumbs.css',
                        'src/css/collapse.css',
                        'src/css/pagination.css',
                        'src/css/img.css',
                        'src/css/forms.css',
                        'src/css/show_hide_password.css',
                        'src/css/big_radio.css',
                        'src/css/code.css',
                        'src/css/tables.css',
                        'src/css/tile.css',
                        'src/css/modal.css',
                        'src/css/typography-base.css',
                        'src/css/buttons.css',
                        'src/css/tasks.css',
                        'src/css/status.css',
                        'src/css/chips.css',
                        'src/css/progress_indicator.css',
                        'src/css/select.css',
                    ]
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/svg/',
                        src: ['**/*.{svg}'],
                        dest: 'dist/svg/'
                    }
                ]
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', [
        'uglify',
        'cssmin'
    ]);
};
