'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var factoryFixture = fs.readFileSync(path.join(__dirname, '/fixtures/factory.js'), 'utf8');
var factoryGen;

describe("feature generation", function() {
  beforeEach(function(done) {
    baseGenerator(function() {
      factoryGen = helpers.createGenerator('angular-enterprise:factory', [path.join(__dirname, '../generators/factory')], ['myFactory']);
      done();
    });
  });
  
  it('creates factory files', function (done) {
    factoryGen.run()
    .on('end', function() {
      assert.file([
        'client/app/providers/my-factory.factory.js',
        'client/app/providers/my-factory.factory.spec.js'
      ]);
      done();
    });
  });

  it('generates expected factory content', function(done) {
    factoryGen.run()
    .on('end', function() {
      var generatedFactoryContent = fs.readFileSync(factoryGen.destinationPath('client/app/providers/my-factory.factory.js'), 'utf8');
      assert.equal(factoryFixture, generatedFactoryContent);
      done();
    });
  });

});