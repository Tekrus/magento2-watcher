#ddev-generated
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-browser-sync');
    var _ = require('underscore'),
        path = require('path'),
        filesRouter,
        configDir = __dirname,
        tasks,
        themes;

    try {
        filesRouter = require('./dev/tools/grunt/tools/files-router');
        filesRouter.set('themes', 'dev/tools/grunt/configs/themes');
        themes = filesRouter.get('themes');
    } catch (e) {
        themes = {};
    }

    var gruntConfig = require('./grunt-config.json');
    if (gruntConfig.themes && gruntConfig.themes !== 'grunt-local-themes') {
        var localThemes = require('./' + gruntConfig.themes + '.js');
        _.extend(themes, localThemes);
    } else {
        try {
            var localThemes = require('./grunt-local-themes.js');
            _.extend(themes, localThemes);
        } catch (e) {
        }
    }

    try {
        tasks = grunt.file.expand('./dev/tools/grunt/tasks/*');
        tasks = _.map(tasks, function (task) {
            return task.replace('.js', '');
        });
        tasks.push('time-grunt');
        tasks.forEach(function (task) {
            require(task)(grunt);
        });
    } catch (e) {
    }

    require('load-grunt-config')(grunt, {
        configPath: path.join(__dirname, 'grunt-local-themes.js'),
        init: true,
        jitGrunt: {
            staticMappings: {
                usebanner: 'grunt-banner'
            }
        }
    });

    _.each({
        default: function () {
            grunt.log.subhead('I\'m default task and at the moment I\'m empty, sorry :/');
        },

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
            var runner;

            try {
                runner = require('./dev/tests/js/jasmine/spec_runner');
                runner.init(grunt, { theme: theme });
                grunt.task.run(runner.getTasks());
            } catch (e) {
                grunt.log.writeln('Spec runner not available');
            }
        }
    }, function (task, name) {
        grunt.registerTask(name, task);
    });
};
