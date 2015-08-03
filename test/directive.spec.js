'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var directiveFixture = fs.readFileSync(path.join(__dirname, '/fixtures/directive.js'), 'utf8');
var directiveGen;

describe("directive generation", function() {
  beforeEach(function(done) {
    baseGenerator(function() {
      directiveGen = helpers.createGenerator('hestia:directive', [path.join(__dirname, '../generators/directive')], ['myDirective']);
      done();
    });
  });

  it('creates directive files', function (done) {
    directiveGen.run()
    .on('end', function() {
      assert.file([
        'client/app/directives/my-directive/my-directive.directive.js',
        'client/app/directives/my-directive/my-directive.directive.spec.js',
        'client/app/directives/my-directive/my-directive.directive.html'
      ]);
      done();
    });
  });

  it('generates expected directive content', function(done) {
    directiveGen.run()
    .on('end', function() {
      var generatedDirectiveContent = fs.readFileSync(directiveGen.destinationPath('client/app/directives/my-directive/my-directive.directive.js'), 'utf8');
      assert.equal(directiveFixture, generatedDirectiveContent);
      done();
    });
  });

});
