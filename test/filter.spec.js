'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var filterFixture = fs.readFileSync(path.join(__dirname, '/fixtures/filter.js'), 'utf8');
var filterGen;

describe("feature generation", function() {
  beforeEach(function(done) {
    baseGenerator(function() {
      filterGen = helpers.createGenerator('angular-enterprise:filter', [path.join(__dirname, '../generators/filter')], ['myFilter']);
      done();
    });
  });
  
  it('creates filter files', function (done) {
    filterGen.run()
    .on('end', function() {
      assert.file([
        'client/app/filters/my-filter.filter.js',
        'client/app/filters/my-filter.filter.spec.js'
      ]);
      done();
    });
  });

  it('generates expected filter content', function(done) {
    filterGen.run()
    .on('end', function() {
      var generatedfilterContent = fs.readFileSync(filterGen.destinationPath('client/app/filters/my-filter.filter.js'), 'utf8');
      assert.equal(filterFixture, generatedfilterContent);
      done();
    });
  });

});