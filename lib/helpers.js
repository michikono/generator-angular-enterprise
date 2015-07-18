'use strict';
var yeoman = require('yeoman-generator');
var ngParseModule = require('ng-parse-module');
var merge = require('merge');
var _ = require('lodash');

module.exports = {
  NamedBase: yeoman.generators.NamedBase.extend({
    /**
     * A Collection of temporary choices; permanent ones should be in this.config and saved via set()
     * (http://yeoman.io/authoring/storage.html)
     */
    choices: {},

    constructor: function () {
      // Calling the super constructor is important so our generator is correctly set up
      yeoman.generators.NamedBase.apply(this, arguments);
    },

    /**
     * Copies template files while applying EJS variables from config and choices
     * Equivalent to calling fs.copyTpl(src, dest, merge(this.config.getAll(), this.choices))
     */
    installTemplate: installTemplate
  }),

  Base: yeoman.generators.Base.extend({
    /**
     * A Collection of temporary choices; permanent ones should be in this.config and saved via set()
     * (http://yeoman.io/authoring/storage.html)
     */
    choices: {},

    constructor: function () {
      // Calling the super constructor is important so our generator is correctly set up
      yeoman.generators.Base.apply(this, arguments);
    },

    /**
     * Copies template files while applying EJS variables from config and choices
     * Equivalent to calling fs.copyTpl(src, dest, merge(this.config.getAll(), this.choices))
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
  return this.fs.copyTpl(src, dest, merge(this.config.getAll(), this.choices))
}
