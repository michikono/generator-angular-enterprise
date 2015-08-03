'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var appFixture = fs.readFileSync(path.join(__dirname, './fixtures/app.module.js'), 'utf8');

describe("app generation", function () {
  beforeEach(function (done) {
    baseGenerator(done);
  });

  it('creates dependency and config files', function () {
    assert.file([
      'bower.json',
      'gulpfile.js',
      'karma.conf.js',
      'package.json'
    ]);
  });

  it('creates build tool files', function () {
    assert.file([
      'karma.conf.js',
      'gulpfile.js'
    ]);
  });

  it('creates core app files', function () {
    assert.file([
      'client/app/app.config.js',
      'client/app/app.module.js',
      'client/app/core/core.config.js',
      'client/app/core/core.module.js',
      'client/app/directives/directives.config.js',
      'client/app/directives/directives.module.js',
      'client/app/filters/filters.config.js',
      'client/app/filters/filters.module.js',
      'client/app/providers/providers.config.js',
      'client/app/providers/providers.module.js',
      'client/index.scss',
      'client/index.html'
    ]);
  });

  it('generates expected app content', function (done) {
    var featureGen = helpers.createGenerator('hestia:feature', [path.join(__dirname, '../generators/feature')], ['myFeature']);
    featureGen.run()
      .on('end', function () {
        var generatedAppContent = fs.readFileSync(featureGen.destinationPath('client/app/app.module.js'), 'utf8');
        assert.equal(appFixture, generatedAppContent);
        done();
      });
  });

});
