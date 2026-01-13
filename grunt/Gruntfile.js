// #ddev-generated
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

module.exports = function (grunt) {
    'use strict';

    var _ = require('underscore'),
        path = require('path'),
        filesRouter = require('./dev/tools/grunt/tools/files-router'),
        configDir = './dev/tools/grunt/configs',
        tasks = grunt.file.expand('./dev/tools/grunt/tasks/*'),
        themes;

    filesRouter.set('themes', 'dev/tools/grunt/configs/themes');
    themes = filesRouter.get('themes');

    tasks = _.map(tasks, function (task) {
        return task.replace('.js', '');
    });
    tasks.push('time-grunt');
    tasks.forEach(function (task) {
        require(task)(grunt);
    });

    require('load-grunt-config')(grunt, {
        configPath: path.join(__dirname, configDir),
        init: true,
        jitGrunt: {
            staticMappings: {
                usebanner: 'grunt-banner',
                browserSync: 'grunt-browser-sync'
            }
        }
    });

    grunt.config.set('browserSync', {
        bsFiles: {
            src: [
                'pub/static/frontend/**/*.css',
                'pub/static/frontend/**/*.js'
            ]
        },
        options: {
            proxy: {
                target: "http://web",
                proxyReq: [
                    function (proxyReq) {
                        proxyReq.setHeader('Host', process.env.DDEV_HOSTNAME);
                        proxyReq.setHeader('X-Forwarded-Proto', 'https');
                        proxyReq.setHeader('X-Forwarded-Port', '443');
                    }
                ],
                middleware: function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                }
            },
            port: 3000,
            open: false,
            ui: false,
            cors: true,
            rewriteRules: [
                {
                    match: new RegExp(`${process.env.DDEV_HOSTNAME}/([^"']+)`, 'g'),
                    replace: `${process.env.DDEV_HOSTNAME}:3000/$1`
                },
                {
                    match: new RegExp(
                        `(https?:\\\\u003A\\\\u002F\\\\u002F)?${process.env.DDEV_HOSTNAME.replace('.', '\\.')}(?:\\\\u002F|/)([^"'\\\\]+)`,
                        'g'
                    ),
                    replace: `${process.env.DDEV_HOSTNAME}:3000/$2`
                }
            ],
            watchTask: true,
            injectChanges: true,
            ghostMode: {
                clicks: true,
                forms: true,
                scroll: true
            }
        }
    });

    _.each({
        /**
         * Assembling tasks.
         * ToDo: define default tasks.
         */
        default: function () {
            grunt.log.subhead('I\'m default task and at the moment I\'m empty, sorry :/');
        },

        /**
         * Production preparation task.
         */
        prod: function (component) {
            var tasks = [
                'less',
                'cssmin',
                'usebanner'
            ].map(function (task) {
                return task + ':' + component;
            });

            if (typeof component === 'undefined') {
                grunt.log.subhead('Tip: Please make sure that u specify prod subtask. By default prod task do nothing');
            } else {
                grunt.task.run(tasks);
            }
        },

        /**
         * Refresh themes.
         */
        refresh: function () {
            var tasks = [
                'clean',
                'exec:all'
            ];
            _.each(themes, function (theme, name) {
                tasks.push('less:' + name);
            });
            grunt.task.run(tasks);
        },

        /**
         * Documentation
         */
        documentation: [
            'replace:documentation',
            'less:documentation',
            'styledocco:documentation',
            'usebanner:documentationCss',
            'usebanner:documentationLess',
            'usebanner:documentationHtml',
            'clean:var',
            'clean:pub'
        ],

        'legacy-build': [
            'mage-minify:legacy'
        ],

        spec: function (theme) {
            var runner = require('./dev/tests/js/jasmine/spec_runner');

            runner.init(grunt, { theme: theme });

            grunt.task.run(runner.getTasks());
        }
    }, function (task, name) {
        grunt.registerTask(name, task);
    });
};
