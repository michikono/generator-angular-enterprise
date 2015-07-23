'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var filterGen;

describe("filter generation", function() {
  beforeEach(function() {
    filterGen = helpers.createGenerator('angular-enterprise:filter', [path.join(__dirname, '../generators/filter')], ['myFilter']);
  });
  
  it('creates filter files', function (done) {
    filterGen.run(function() {
      assert.file([
        'client/app/filters/my-filter.filter.js',
        'client/app/filters/my-filter.filter.spec.js'
        ]);
      done();
    });
  });

  it('registers filter by name', function(done) {
    filterGen.run(function() {
      assert.fileContent(
        'client/app/filters/my-filter.filter.js',
        /\.filter\('myFilter', myFilter\)/
        );
      done();
    });
  })

});