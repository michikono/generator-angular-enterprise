'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var decoratorFixture = fs.readFileSync(path.join(__dirname, '/fixtures/decorator.js'), 'utf8');
var decoratorGen;

describe("decorator generation", function() {
  beforeEach(function(done) {
    baseGenerator(function() {
      decoratorGen = helpers.createGenerator('hestia:decorator', [path.join(__dirname, '../generators/decorator')], ['log']);
      done();
    });
  });

  it('generates expected decorator content', function(done) {
    decoratorGen.run()
    .on('end', function() {
      var generatedDecoratorContent = fs.readFileSync(decoratorGen.destinationPath('client/app/app.config.js'), 'utf8');
      assert.equal(decoratorFixture, generatedDecoratorContent);
      done();
    });
  });

});
