'use strict';

module.exports = function(grunt)
{
    grunt.initConfig({
        uglify:
        {
            target:
            {
                files:
                {
                    'dist/front.min.js': [
                        'src/js/utils.js',
                        'src/js/slider.js',
                        'src/js/forms.js',
                        'src/js/colors.js',
                        'src/js/sidenav.js',
                        'src/js/collapse.js',
                        'src/js/buttons.js',
                        'src/js/modal.js',
                        'src/js/toast.js',
                    ],
                    'dist/front_head.min.js': [
                        'src/js/head/websockets.js',
                        'src/js/head/detect_js.js',
                    ],
                    'dist/front_body.min.js': [
                        'src/js/body/theme.js',
                    ],
                }
            }
        },
        cssmin:
        {
            options:
            {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target:
            {
                files:
                {
                    'dist/front.min.css': [
                        'src/css/normalize.css',
                        'src/css/bootstrap-grid.css',
                        'src/css/colors.css',
                        'src/css/base.css',
                        'src/css/animations.css',
                        'src/css/icons.css',
                        'src/css/utils.css',
                        'src/css/navbar.css',
                        'src/css/sidenav.css',
                        'src/css/breadcrumbs.css',
                        'src/css/collapse.css',
                        'src/css/pagination.css',
                        'src/css/img.css',
                        'src/css/forms.css',
                        'src/css/code.css',
                        'src/css/tables.css',
                        'src/css/modal.css',
                        'src/css/toast.css',
                        'src/css/typography-base.css',
                        'src/css/buttons.css',
                        'src/css/tasks.css',
                        'src/css/dots.css',
                        'src/css/chips.css',
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
                        dest:'dist/svg/'
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
