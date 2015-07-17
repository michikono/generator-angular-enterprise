'use strict';
var ngParseModule = require('ng-parse-module');
var _ = require('underscore');

module.exports = {


  addAngularModule: function (angularModuleFile, moduleName) {
    var app = ngParseModule.parse(angularModuleFile);
    app.dependencies.modules.push(moduleName);
    app.dependencies.modules = _.unique(app.dependencies.modules);
    app.save();
  }
};
