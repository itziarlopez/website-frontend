module.exports = function(grunt) {
    var globalConfig = {
        output: 'Output'
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
            dev: ['Output']
        },

        //Copy essential assets needed to render output
        copy: {
            theme: {
                files: [
                    {expand: true, cwd: 'Theme/', src: ['**'], dest: '<%= globalConfig.output %>'},
                ],
            },

            dev: {
                files: [
                    {expand: true, cwd: 'Assets/bower_components/bootstrap/dist/js/', src: ['bootstrap.js'], dest: '<%= globalConfig.output %>/static/js/', filter: 'isFile'},
                    {expand: true, cwd: 'Assets/bower_components/jquery/dist/', src: ['jquery.js'], dest: '<%= globalConfig.output %>/static/js/', filter: 'isFile'},
                    {expand: true, cwd: 'Assets/bower_components/jquery.easing/js/', src: ['jquery.easing.js'], dest: '<%= globalConfig.output %>/static/js/', filter: 'isFile'},
                    {expand: true, cwd: 'Assets/js/', src: ['navbar.js', 'spamhide.js'], dest: '<%= globalConfig.output %>/static/js/', filter: 'isFile'},
                    {expand: true, cwd: 'Assets', src: ['img/**'], dest: '<%= globalConfig.output %>/static/', filter: 'isFile'},
                ]
              },
        },

        //Render less css
        less: {
          dev: {
            options: {
              paths: ["Assets/bower_components/bootstrap"]
            },
            files: {
              "<%= globalConfig.output %>/static/css/bootstrap.css": "Assets/bower_components/bootstrap/less/bootstrap.less",
              "<%= globalConfig.output %>/static/css/custom.css": "Assets/less/custom.less"
            }
          },
        },

        //Autoprefixer - add browser specific prefixes
        autoprefixer: {
            no_dest: {
                src: "<%= globalConfig.output %>/static/css/custom.css"
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-auto-install');

    grunt.registerTask('default', ['auto_install', 'clean:dev', 'copy:theme', 'copy:dev','less:dev','autoprefixer']);
};
