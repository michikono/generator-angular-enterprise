'use strict';
var yeoman = require('yeoman-generator');
var ngParseModule = require('ng-parse-module');
var merge = require('merge');
var _ = require('lodash');
var changeCase = require('change-case');
var glob = require('glob');
var path = require('path');
var templateTypes = require('./template-types');

module.exports = {
  NamedBase: yeoman.generators.NamedBase.extend({
    /**
     * A Collection of temporary choices; permanent ones should be in this.config and saved via set()
     * (http://yeoman.io/authoring/storage.html)
     */
    choices: null,
    templateTypes: templateTypes,

    constructor: function () {
      // Calling the super constructor is important so our generator is correctly set up
      yeoman.generators.NamedBase.apply(this, arguments);
    },

    /**
     * Copies template files while applying EJS variables from config and choices
     * Equivalent to calling fs.copyTpl(src, dest, merge(this.config.getAll(), this.choices))
     * Arguments:
     *  source - template file
     *  destination - installed file name/location
     */
    installTemplate: installTemplate,

    /**
     * Installs the entire folder of template files over
     * Arguments:
     *  name - name of generated object (usually this.name)
     *  templateType - a key from this.templateTypes
     *
     */
    installTemplateFolder: installTemplateFolder
  }),

  Base: yeoman.generators.Base.extend({
    /**
     * A Collection of temporary choices; permanent ones should be in this.config and saved via set()
     * (http://yeoman.io/authoring/storage.html)
     */
    choices: null,
    templateTypes: templateTypes,

    constructor: function () {
      // Calling the super constructor is important so our generator is correctly set up
      yeoman.generators.Base.apply(this, arguments);
    },

    /**
     * Copies template files while applying EJS variables from config and choices
     * Equivalent to calling fs.copyTpl(src, dest, merge(this.config.getAll(), this.choices))
     * Arguments:
     *  source - template file
     *  destination - installed file name/location
     */
    installTemplate: installTemplate,

    /**
     * Installs the entire folder of template files over
     * Arguments:
     *  name - name of generated object (usually this.name)
     *  templateType - a key from this.templateTypes
     *
     */
    installTemplateFolder: installTemplateFolder
  }),

  addAngularModule: function (angularModuleFile, moduleName) {
    var app = ngParseModule.parse(angularModuleFile);
    app.dependencies.modules.push(moduleName);
    app.dependencies.modules = _.unique(app.dependencies.modules);
    app.save();
  }
};

////////////////////////////////////////////////
// see above for documentation on these methods
////////////////////////////////////////////////

function installTemplate(src, dest) {
  if (this.choices === null) {
    throw Error('this.choices should be set to {} if unused');
  }
  return this.fs.copyTpl(src, dest, merge(this.config.getAll(), this.choices))
}

function installTemplateFolder(name, templateTypeLookup) {
  var templateType = this.templateTypes[templateTypeLookup];
  if (!templateType) {
    throw Error('Not a valid templateType for [' + name + ']: ' + templateType);
  }

  // grab all files
  glob(this.templatePath() + '**/*', {}, function (er, files) {
    if (er) {
      console.error(er);
    } else {
      files.forEach(function (file) {
        var basename = path.basename(file);
        var subFolder = templateType.destination || '';
        // append the subModule folder name if configured to do so
        if (templateType.subModule) {
          subFolder += changeCase.paramCase(this.choices.name) + '/';
        }
        // skip for tests when tests not enabled
        this.installTemplate(
          this.templatePath(basename),
          this.destinationPath(
            this.config.get('clientSideFolder')
            + this.config.get('appSubFolder') + subFolder
            + basename.replace('_', changeCase.paramCase(this.choices.name))
          )
        );
      }.bind(this));
    }
  }.bind(this))
}
