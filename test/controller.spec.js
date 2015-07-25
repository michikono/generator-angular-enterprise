'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var controllerFixture = fs.readFileSync(path.join(__dirname, './fixtures/controller.js'), 'utf8');
var controllerGen, featureGen;

describe("controller generation", function() {
  beforeEach(function(done) {
    baseGenerator(function() {
      featureGen = helpers.createGenerator('angular-enterprise:feature', [path.join(__dirname, '../generators/feature')], ['myFeature']);
      controllerGen = helpers.createGenerator('angular-enterprise:controller', [path.join(__dirname, '../generators/controller')], ['myController']);
      done();
    });
  });
  
  it('creates controller files', function (done) {
    featureGen.run()
      .on('end', function() {
        helpers.mockPrompt(controllerGen, {
          'moduleName': 'app.myFeature'
        })
        controllerGen.run()
        .on('end', function() {
          assert.file([
            'client/app/my-feature/my-controller.controller.js',
            'client/app/my-feature/my-controller.controller.spec.js'
          ]);
          done();
        });
      });

  });

  it('generates expected controller content', function(done) {
    var generatedControllerContent;
    featureGen.run()
      .on('end', function() {
        helpers.mockPrompt(controllerGen, {
          'moduleName': 'app.myFeature'
        });
        controllerGen.run()
        .on('end', function() {
          var generatedControllerContent = fs.readFileSync(controllerGen.destinationPath('client/app/my-feature/my-controller.controller.js'), 'utf8');
          assert.equal(controllerFixture, generatedControllerContent);
          done();
        });
      });
  });

});