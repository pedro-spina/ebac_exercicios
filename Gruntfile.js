module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Compilar LESS
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less' // Compila de src/less para dist/css
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [ // Corrigido de "patters" para "patterns"
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [ // Corrigido de "patters" para "patterns"
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        // Minificar JavaScript
        uglify: {
            build: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js' // Minifica todos os JS na pasta src/js
                }
            }
        }
    });

    // Carregar os plugins das tarefas
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Definir as tarefas que serão executadas quando rodar o Grunt
    grunt.registerTask('default', ['watch', 'less', 'uglify']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'uglify', 'clean']);
};
