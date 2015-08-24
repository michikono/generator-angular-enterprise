'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var featureModuleFixture = fs.readFileSync(path.join(__dirname, '/fixtures/feature.module.js'), 'utf8');
var featureRouteFixtureUi = fs.readFileSync(path.join(__dirname, '/fixtures/ui.feature.route.js'), 'utf8');
var featureRouteFixtureNg = fs.readFileSync(path.join(__dirname, '/fixtures/ng.feature.route.js'), 'utf8');
var featureGen;

describe("feature generation", function() {

  beforeEach(function(done) {
    baseGenerator(function() {
      featureGen = helpers.createGenerator('angular-enterprise:feature', [path.join(__dirname, '../generators/feature')], ['myFeature']);
      done();
    });
  });

  it('creates feature files', function (done) {
    featureGen.run()
    .on('end', function() {
      assert.file([
        'client/app/my-feature/my-feature.config.js',
        'client/app/my-feature/my-feature.module.js',
        'client/app/my-feature/my-feature.route.js',
        'client/app/my-feature/my-feature.route.spec.js'
      ]);
      done();
    });

  });

  it('generates expected feature content - uirouter', function(done) {
    featureGen.config.set('uirouter', true);
    featureGen.run()
    .on('end', function() {
      var generatedFeatureModuleContent = fs.readFileSync(featureGen.destinationPath('client/app/my-feature/my-feature.module.js'), 'utf8');
      var generatedFeatureRouteContent = fs.readFileSync(featureGen.destinationPath('client/app/my-feature/my-feature.state.js'), 'utf8');
      assert.equal(featureModuleFixture, generatedFeatureModuleContent);
      assert.equal(featureRouteFixtureUi, generatedFeatureRouteContent);
      done();
    });
  });

  it('generates expected feature content - ngrouter', function(done) {
    featureGen.config.set('uirouter', false);
    featureGen.run()
    .on('end', function() {
      var generatedFeatureModuleContent = fs.readFileSync(featureGen.destinationPath('client/app/my-feature/my-feature.module.js'), 'utf8');
      var generatedFeatureRouteContent = fs.readFileSync(featureGen.destinationPath('client/app/my-feature/my-feature.route.js'), 'utf8');
      assert.equal(featureModuleFixture, generatedFeatureModuleContent);
      assert.equal(featureRouteFixtureNg, generatedFeatureRouteContent);
      done();
    });
  });


});
