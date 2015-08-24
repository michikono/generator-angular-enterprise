'use strict';

var path = require('path');
var fs = require('fs');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var baseGenerator = require('./helpers/base-generator');
var serviceFixture = fs.readFileSync(path.join(__dirname, '/fixtures/service.js'), 'utf8');
var serviceGen;

describe("service generation", function() {
  beforeEach(function(done) {
    baseGenerator(function() {
      serviceGen = helpers.createGenerator('angular-enterprise:service', [path.join(__dirname, '../generators/service')], ['myService']);
      done();
    });
  });

  it('creates service files', function (done) {
    serviceGen.run()
    .on('end', function() {
      assert.file([
        'client/app/providers/my-service/my-service.service.js',
        'client/app/providers/my-service/my-service.service.spec.js'
      ]);
      done();
    });
  });

  it('generates expected service content', function(done) {
    serviceGen.run()
    .on('end', function() {
      var generatedServiceContent = fs.readFileSync(serviceGen.destinationPath('client/app/providers/my-service/my-service.service.js'), 'utf8');
      assert.equal(serviceFixture, generatedServiceContent);
      done();
    });
  });

});
