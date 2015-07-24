'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var appFixture = fs.readFileSync(path.join(__dirname, './fixtures/app.module.js'), 'utf8');

describe("feature generation", function() {
  beforeEach(function(done) {
    baseGenerator(function() {
      done();
    });
  });

  it('creates dependency and config files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jscsrc',
      '.jshintrc'
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
      'client/app/app.providers.module.js',
      'client/app/core.config.js',
      'client/app/core.module.js'
    ]);
  });

  it('generates expected app content', function(done) {
    var featureGen = helpers.createGenerator('angular-enterprise:feature', [path.join(__dirname, '../generators/feature')], ['myFeature']);
    featureGen.run()
    .on('end', function() {
      var generatedAppContent = fs.readFileSync(featureGen.destinationPath('client/app/app.module.js'), 'utf8');
      assert.equal(appFixture, generatedAppContent);
      done();
    });
  });

});
