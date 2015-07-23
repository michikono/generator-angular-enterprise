'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var factoryGen;

describe("factory generation", function() {
  beforeEach(function() {
    factoryGen = helpers.createGenerator('angular-enterprise:factory', [path.join(__dirname, '../generators/factory')], ['myFactory']);
  });
  
  it('creates factory files', function (done) {
    factoryGen.run(function() {
      assert.file([
        'client/app/providers/my-factory.factory.js',
        'client/app/providers/my-factory.factory.spec.js'
        ]);
      done();
    });
  });

  it('registers factory by name', function(done) {
    factoryGen.run(function() {
      assert.fileContent(
        'client/app/providers/my-factory.factory.js',
        /\.factory\('myFactory', myFactory\)/
        );
      done();
    });
  });

});