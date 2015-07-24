'use strict';
var yeoman = require('yeoman-generator');
var ngParseModule = require('ng-parse-module');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');
var installTemplate = require('./install-template');
var installTemplateFolder = require('./install-template-folder');
var injectTemplatePartial = require('./inject-template-partial');

module.exports = {
  NamedBase: yeoman.generators.NamedBase.extend({
    /**
     * A Collection of temporary choices; permanent ones should be in this.config and saved via set()
     * (http://yeoman.io/authoring/storage.html)
     */
    choices: null,

    constructor: function () {
      // Calling the super constructor is important so our generator is correctly set up
      yeoman.generators.NamedBase.apply(this, arguments);
    },

    injectTemplatePartial: injectTemplatePartial,
    installTemplate: installTemplate,
    installTemplateFolder: installTemplateFolder
  }),

  Base: yeoman.generators.Base.extend({
    /**
     * A Collection of temporary choices; permanent ones should be in this.config and saved via set()
     * (http://yeoman.io/authoring/storage.html)
     */
    choices: null,

    constructor: function () {
      // Calling the super constructor is important so our generator is correctly set up
      yeoman.generators.Base.apply(this, arguments);
    },

    injectTemplatePartial: injectTemplatePartial,
    installTemplate: installTemplate,
    installTemplateFolder: installTemplateFolder
  }),

  /**
   * returns a list of all angular modules in a file
   */
  getAllAngularModules: function (angularModuleFile) {
    return ngParseModule.parse(angularModuleFile).dependencies.modules;
  },

  /**
   * Adds a single module to an angular module file
   */
  addAngularModule: function (angularModuleFile, moduleName) {
    var app = ngParseModule.parse(angularModuleFile);
    app.dependencies.modules.push(moduleName);
    app.dependencies.modules = _.unique(app.dependencies.modules);
    app.save();
  }
};
