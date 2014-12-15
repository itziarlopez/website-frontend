module.exports = function(grunt) {
    var globalConfig = {
        output: 'Output',
        assets: 'Assets',
        bower_components: 'Assets/bower_components',
        temp: 'Assets/temp'
    };

    console.log(globalConfig.temp);

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
            all: ['<%= globalConfig.output %>', '<%= globalConfig.bower_components %>', 'node_modules'],
            output: ['<%= globalConfig.output %>'],
            temp: ['<%= globalConfig.temp %>']
        },

        //Copy files
        copy: {
            theme: { //Copy pelican theme files
                files: [
                    {expand: true, cwd: 'Theme/', src: ['**'], dest: '<%= globalConfig.output %>'},
                ],
            },

            images: {
                files: [ //copy png and jpeg files only (i.e leave the gimp xcf files alone)
                    {expand: true, cwd: '<%= globalConfig.assets %>', src: ['img/*.jpg'], dest: '<%= globalConfig.output %>/static/', filter: 'isFile'},
                    {expand: true, cwd: '<%= globalConfig.assets %>', src: ['img/*.png'], dest: '<%= globalConfig.output %>/static/', filter: 'isFile'}
                ]
            },

            //BootStrap custom - copies customized bootstrap to bootstrap asset folder
            bootstrap: {
                files: [
                    {expand: true, cwd: '<%= globalConfig.assets %>/less', src: ['bootstrap_custom.less'], dest: '<%= globalConfig.bower_components %>/bootstrap/less/', filter: 'isFile'},
                ]
            },

            css: {
                 files: [
                    {expand: true, cwd: "<%= globalConfig.temp %>", src: ['css/**'], dest: '<%= globalConfig.output %>/static/', filter: 'isFile'},
                ]               
            },

            js: {
                 files: [
                    {expand: true, cwd: "<%= globalConfig.temp %>", src: ['js/**'], dest: '<%= globalConfig.output %>/static/', filter: 'isFile'},
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
                  "<%= globalConfig.temp %>/css/base.css": "<%= globalConfig.bower_components %>/bootstrap/less/bootstrap_custom.less",
                  "<%= globalConfig.temp %>/css/main.css": "<%= globalConfig.assets %>/less/custom.less"
                }
            },
        },

        //Autoprefixer - add browser specific prefixes
        autoprefixer: {
            no_dest: {
                src: "<%= globalConfig.temp %>/css/main.css"
            }
        },

        //For Production
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: "<%= globalConfig.temp %>/css/",
                    src: ["base.css"],
                    dest: "<%= globalConfig.output %>/static/css/",
                },
                {
                    expand: true,
                    cwd: "<%= globalConfig.temp %>/css/",
                    src: ["main.css"],
                    dest: "<%= globalConfig.output %>/static/css/",
                }]
            }
        },

        //Concat - concats files (for production)
        concat: {
            js: {
                src: [  
                    "<%= globalConfig.bower_components %>/bootstrap/dist/js/bootstrap.js",
                    "<%= globalConfig.bower_components %>/jquery.easing/js/jquery.easing.js",
                    "<%= globalConfig.assets %>/js/navbar.js",
                    "<%= globalConfig.assets %>/js/spamhide.js"
                ],
                dest: "<%= globalConfig.temp %>/js/main.js"
            }
        },

        uglify: {
            js: {
                src: "<%= globalConfig.temp %>/js/main.js",
                dest: "<%= globalConfig.output %>/static/js/main.js"
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
        'copy:images',
        'copy:bootstrap', 
        'less:all', 
        'autoprefixer',
        'copy:css',
        'concat',
        'copy:js',
    ]);

    //Production - minimizes both CSS and JavaScript
    grunt.registerTask('production', [
        'auto_install', 
        'clean:output',
        'clean:temp',
        'copy:theme', 
        'copy:images',
        'copy:bootstrap',
        'less:all',
        'autoprefixer',
        'cssmin', 
        'concat', 
        'uglify',
    ]);
};
