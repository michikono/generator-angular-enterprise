'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var directiveGen;

describe("directive generation", function() {
  beforeEach(function() {
    directiveGen = helpers.createGenerator('angular-enterprise:directive', [path.join(__dirname, '../generators/directive')], ['myDirective']);
  });
  
  it('creates directive files', function (done) {
    directiveGen.run(function() {
      assert.file([
        'client/app/directives/my-directive/my-directive.directive.js',
        'client/app/directives/my-directive/my-directive.directive.spec.js',
        'client/app/directives/my-directive/my-directive.directive.html'
        ]);
      done();
    });
  });

  it('registers directive by name', function(done) {
    directiveGen.run(function() {
      assert.fileContent(
        'client/app/directives/my-directive/my-directive.directive.js',
        /\.directive\('myDirective', myDirective\)/
        );
      done();
    });
  });

});