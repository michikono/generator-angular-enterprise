'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
  var wiredepOptions = _.extend({}, conf.wiredep, {
    dependencies: true,
    devDependencies: true
  });

  return wiredep(wiredepOptions).js
    .concat([
      path.join(conf.paths.src, '/<%= appSubFolder %>**/*.module.js'),
      path.join(conf.paths.src, '/<%= appSubFolder %>**/*.js'),
      path.join(conf.paths.src, '/**/*.spec.js'),
      path.join(conf.paths.src, '/**/*.mock.js'),
      path.join(conf.paths.src, '/**/*.html')
    ]);
}

module.exports = function(config) {

  var configuration = {
    files: listFiles(),

    singleRun: true,

    autoWatch: false,

    frameworks: ['bower', 'jasmine', 'angular-filesort'],

    bowerPackages: [
      'angular',
      'angular-animate',
      'angular-bootstrap',
      'angular-cookies',
      'angular-mocks',
      'angular-resource',
      'angular-ui-utils',
    <% if (uirouter) { -%>
      'angular-ui-router'
    <% } else{ -%>
      'angular-route'
    <% } -%>
    ],

    angularFilesort: {
      whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
    },

    reporters: ['progress', 'coverage'],

    ngHtml2JsPreprocessor: {
      stripPrefix: conf.paths.src + '/',
    },

    browsers : ['PhantomJS'],

    plugins : [
      'karma-bower',
      'karma-phantomjs-launcher',
      'karma-angular-filesort',
      'karma-jasmine',
      'karma-coverage',
      'karma-ng-html2js-preprocessor'
    ],

    preprocessors: {
      '<%= clientSideFolder %>/<%= appSubFolder %>/**/!(*.spec).js': ['coverage'],
      '<%= clientSideFolder %>/<%= appSubFolder %>**/*.html': ['ng-html2js']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  };

  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
