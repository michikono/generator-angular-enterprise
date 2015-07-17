'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var changeCase = require('change-case');
var merge = require('merge');
var ngParseModule = require('ng-parse-module');

module.exports = yeoman.generators.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.generators.NamedBase.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();
    this.log('Creating directive: ' + chalk.green(this.name) + '...');

    var prompts = [{
      name: 'moduleName',
      message: 'Name of directive?',
      default: changeCase.camelCase(this.name)
    }, {
      name: 'stateUrl',
      message: 'URL of directive?',
      default: changeCase.paramCase(this.name).replace(/(.*?)\/$/, '$1') + '/'
    }, {
      name: 'tests',
      type: 'confirm',
      message: 'Generate tests?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = merge(this.config.getAll(), props);
      this.props.moduleName = changeCase.camelCase(this.props.moduleName);
      this.props.moduleNameParamCase = changeCase.paramCase(this.props.moduleName);
      this.props.moduleNameCamelCase = changeCase.camelCase(this.props.moduleName);
      this.props.stateName = changeCase.camelCase(this.name);
      this.props.stateUrl = this.props.moduleNameParamCase.replace(/(.*?)\/$/, '$1') + '/';
      this.props.name = this.name;
      // To access props later use this.props.someOption;
      done();
    }.bind(this));
  },

  writing: {
    files: function () {
      var path = this.config.get('clientSideFolder') + this.config.get('appSubFolder') +
        changeCase.paramCase(this.props.moduleName) + '/';

      this.fs.copyTpl(
        this.templatePath('_.directive.js'),
        this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.directive.js'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_.directive.html'),
        this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.directive.html'),
        this.props
      );
      if (this.props.tests) {
        this.fs.copyTpl(
          this.templatePath('_.directive.spec.js'),
          this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.directive.spec.js'),
          this.props
        );
      }
    },

    modules: function() {
      var app = ngParseModule.parse(this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js');
      app.dependencies.modules.push(this.props.moduleName);
      app.save();
    }
  }
});
