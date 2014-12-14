module.exports = function(grunt) {
    var globalConfig = {
        output: 'Output',
        assets: 'Assets'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Global config variables (defined above)
        globalConfig: globalConfig,

        //Installs npm and bower components
        auto_install: {
            local: {}
        },

        //Deletes folders and files
        clean: {
            all: ['Output', 'Assets/bower_components', 'node_modules'],
            output: ['Output'],
            temp: ['Assets/temp']
        },

        //Copy essential assets needed to render output
        copy: {
            theme: {
                files: [
                    {expand: true, cwd: 'Theme/', src: ['**'], dest: '<%= globalConfig.output %>'},
                ],
            },

            assets: {
                files: [
                    {expand: true, cwd: 'Assets', src: ['img/**'], dest: '<%= globalConfig.output %>/static/', filter: 'isFile'},
                ]
            },

            //BootStrap custom - copies customized bootstrap to bootstrap asset folder
            bootstrap: {
                files: [
                    {expand: true, cwd: 'Assets/less', src: ['bootstrap_custom.less'], dest: '<%= globalConfig.assets %>/bower_components/bootstrap/less/', filter: 'isFile'},
                ]
            },

            css: {
                 files: [
                    {expand: true, cwd: "<%= globalConfig.assets %>/temp", src: ['css/**'], dest: '<%= globalConfig.output %>/static/', filter: 'isFile'},
                ]               
            },

            js: {
                 files: [
                    {expand: true, cwd: "<%= globalConfig.assets %>/temp", src: ['js/**'], dest: '<%= globalConfig.output %>/static/', filter: 'isFile'},
                ]               
            }
        },

        //Render less css
        less: {
            all: {
                options: {
                  paths: [
                  ]
                },
                files: {
                  "<%= globalConfig.assets %>/temp/css/bootstrap.css": "<%= globalConfig.assets %>/bower_components/bootstrap/less/bootstrap_custom.less",
                  "<%= globalConfig.assets %>/temp/css/custom.css": "<%= globalConfig.assets %>/less/custom.less"
                }
            },
        },

        //Autoprefixer - add browser specific prefixes
        autoprefixer: {
            no_dest: {
                src: "<%= globalConfig.assets %>/temp/css/custom.css"
            }
        },

        //For Production
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: "<%= globalConfig.assets %>/temp/css/",
                    src: ["bootstrap.css"],
                    dest: "<%= globalConfig.output %>/static/css/",
                },
                {
                    expand: true,
                    cwd: "<%= globalConfig.assets %>/temp/css/",
                    src: ["custom.css"],
                    dest: "<%= globalConfig.output %>/static/css/",
                }]
            }
        },

        //Concat - concats files (for production)
        concat: {
            js: {
                src: [  
                    "<%= globalConfig.assets %>/bower_components/bootstrap/dist/js/bootstrap.js",
                    "<%= globalConfig.assets %>/bower_components/jquery.easing/js/jquery.easing.js",
                    "<%= globalConfig.assets %>/js/navbar.js",
                    "<%= globalConfig.assets %>/js/spamhide.js"
                ],
                dest: "<%= globalConfig.assets %>/temp/js/custom.js"
            }
        },

        uglify: {
            js: {
                src: "<%= globalConfig.assets %>/temp/js/custom.js",
                dest: "<%= globalConfig.output %>/static/js/custom.js"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-auto-install');
    grunt.loadNpmTasks('grunt-contrib-cssmin'); 

    grunt.registerTask('default', [
        'auto_install', 
        'clean:output',
        'clean:temp',
        'copy:theme',
        'copy:assets',
        'copy:bootstrap', 
        'less:all', 
        'autoprefixer',
        'copy:css',
        'concat',
        'copy:js',
    ]);

    grunt.registerTask('production', [
        'auto_install', 
        'clean:output',
        'clean:temp',
        'copy:theme', 
        'copy:assets',
        'copy:bootstrap',
        'less:all',
        'autoprefixer',
        'cssmin', 
        'concat', 
        'uglify',
    ]);
};
