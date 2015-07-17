'use strict';
var yeoman = require('yeoman-generator');
var ngParseModule = require('ng-parse-module');
var merge = require('merge');
var _ = require('underscore');

module.exports = {
  NamedBase: yeoman.generators.NamedBase.extend({
    /**
     * A Collection of temporary settings; permanent ones should be in this.config and saved via set()
     * (http://yeoman.io/authoring/storage.html)
     */
    settings: {},

    constructor: function () {
      // Calling the super constructor is important so our generator is correctly set up
      yeoman.generators.NamedBase.apply(this, arguments);
    },

    /**
     * Copies template files while applying EJS variables from config and settings
     * Equivalent to calling fs.copyTpl(src, dest, merge(this.config.getAll(), this.settings))
     */
    installTemplate: installTemplate
  }),

  Base: yeoman.generators.Base.extend({
    /**
     * A Collection of temporary settings; permanent ones should be in this.config and saved via set()
     * (http://yeoman.io/authoring/storage.html)
     */
    settings: {},

    constructor: function () {
      // Calling the super constructor is important so our generator is correctly set up
      yeoman.generators.Base.apply(this, arguments);
    },

    /**
     * Copies template files while applying EJS variables from config and settings
     * Equivalent to calling fs.copyTpl(src, dest, merge(this.config.getAll(), this.settings))
     */
    installTemplate: installTemplate
  }),

  addAngularModule: function (angularModuleFile, moduleName) {
    var app = ngParseModule.parse(angularModuleFile);
    app.dependencies.modules.push(moduleName);
    app.dependencies.modules = _.unique(app.dependencies.modules);
    app.save();
  }
};

function installTemplate(src, dest) {
  return this.fs.copyTpl(src, dest, merge(this.config.getAll(), this.settings))
}
