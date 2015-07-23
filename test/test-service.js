'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var serviceGen;

describe("service generation", function() {
  beforeEach(function() {
    serviceGen = helpers.createGenerator('angular-enterprise:service', [path.join(__dirname, '../generators/service')], ['myService']);
  });
  
  it('creates service files', function (done) {
    serviceGen.run(function() {
      assert.file([
        'client/app/providers/my-service.service.js',
        'client/app/providers/my-service.service.spec.js'
        ]);
      done();
    });
  });

  it('registers service by name', function(done) {
    serviceGen.run(function() {
      assert.fileContent(
        'client/app/providers/my-service.service.js',
        /\.service\('myService', MyService\)/
        );
      done();
    });
  });

});