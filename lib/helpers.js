'use strict';
var yeoman = require('yeoman-generator');
var ngParseModule = require('ng-parse-module');
var merge = require('merge');
var _ = require('lodash');
var changeCase = require('change-case');
var glob = require('glob');
var path = require('path');
var templateTypes = require('./template-types');
var ejs = require('ejs');
var fs = require('fs');

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
     * Adds a partial into a target file
     * Arguments:
     *   partial: the path to the file being modified
     *   macroName: the name of the macro to search and replace which will be in a comment block surrounded by brackets,
     *              for example:
     *                  // [INJECT:ROUTES]
     *              Would be converted to an argument represented simply as:
     *                  INJECT:ROUTES
     *   intoFile: the partial (which will have its variables interpolated)
     */
    injectTemplatePartial: injectTemplatePartial,

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
     *  moduleName - (optional) name of module in the form <%=appName%>.<%=moduleName%>
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
     * Adds a partial into a target file
     * Arguments:
     *   partial: the path to the file being modified
     *   macroName: the name of the macro to search and replace which will be in a comment block surrounded by brackets,
     *              for example:
     *                  // [INJECT:ROUTES]
     *              Would be converted to an argument represented simply as:
     *                  INJECT:ROUTES
     *   intoFile: the partial (which will have its variables interpolated)
     */
    injectTemplatePartial: injectTemplatePartial,

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
     *  moduleName - (optional) name of module in the form <%=appName%>.<%=moduleName%>
     */
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

////////////////////////////////////////////////
// see above for documentation on these methods
////////////////////////////////////////////////

/**
 * Gets a snippet with all variables interpolated
 * Arguments:
 *  filename - A file to load and return interpolated contents of
 */
function getSnippet(file) {
  return ejs.render(fs.readFileSync(file).toString(), merge(this.config.getAll(), this.choices));
}

function injectTemplatePartial(partialFile, macroName, intoFile) {
  // open the file, inject code, save new file
  var data = fs.readFileSync(intoFile, 'utf-8');
  // find and replace the template marker
  var regex = '^([\\t ]*)(\\/[/* \\t]+\\[' + macroName + '\\].*)$';
  var tab = data.match(new RegExp(regex, 'mi'))[1];
  if(tab === null) {
    throw Error('Bad macro attempt for ' + macroName + ' in ' + partialFile + ' => ' + intoFile);
  }
  var newValue = data.replace(
    new RegExp(regex, 'gmi'),
    // make sure formatting of newly inserted template looks right
    getSnippet.bind(this)(partialFile)
      // rtrim
      .replace(/\n+$/g, '').replace(/~+$/, '')
      // indent all lines that have content
      .replace(/^(.+)$/gm, tab + '$1')
      // re-insert a new marker for next time
    + '\n' + tab + '$2'
  );
  fs.writeFileSync(intoFile, newValue, 'utf-8');
}

function installTemplate(src, dest) {
  if (this.choices === null) {
    throw Error('this.choices should be set to {} if unused');
  }
  return this.fs.copyTpl(src, dest, merge(this.config.getAll(), this.choices))
}

function installTemplateFolder(name, templateTypeLookup, moduleName) {
  var templateType = this.templateTypes[templateTypeLookup];
  if (!templateType) {
    throw Error('Not a valid templateType for [' + name + ']: ' + templateType);
  }
  if (!moduleName) {
    moduleName = this.choices.name;
  }

  // grab all files
  glob(this.templatePath() + '**/*', {}, function (er, files) {
    if (er) {
      console.error(er);
    } else {
      files.forEach(function (file) {
        var basename = path.basename(file);
        var subFolder = templateType.destination || '';
        // skip copying snippets
        if (file.match('snippet.')) {
          return;
        }
        // append the subModule folder name if configured to do so
        if (templateType.subModule) {
          subFolder += changeCase.paramCase(moduleName) + '/';
        }
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
