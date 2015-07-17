'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var changeCase = require('change-case');
var merge = require('merge');
var helpers = require('../../lib/helpers');

module.exports = yeoman.generators.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.generators.NamedBase.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();
    this.log('Creating feature: ' + chalk.green(this.name) + '...');

    var prompts = [{
      name: 'moduleName',
      message: 'Name of feature?',
      default: changeCase.camelCase(this.name)
    }, {
      name: 'stateUrl',
      message: 'URL of feature?',
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
        this.templatePath('_.module.js'),
        this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.module.js'),
        this.props
      );
      if (this.props.uirouter) {
        this.fs.copyTpl(
          this.templatePath('_.state.js'),
          this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.route.js'),
          this.props
        );
        if (this.props.tests) {
          this.fs.copyTpl(
            this.templatePath('_.state.spec.js'),
            this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.route.spec.js'),
            this.props
          );
        }
      } else {
        this.fs.copyTpl(
          this.templatePath('_.route.js'),
          this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.route.js'),
          this.props
        );
        if (this.props.tests) {
          this.fs.copyTpl(
            this.templatePath('_.route.spec.js'),
            this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.route.spec.js'),
            this.props
          );
        }
      }
      this.fs.copyTpl(
        this.templatePath('_.controller.js'),
        this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.controller.js'),
        this.props
      );
      if (this.props.tests) {
        this.fs.copyTpl(
          this.templatePath('_.controller.spec.js'),
          this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.controller.spec.js'),
          this.props
        );
      }
      this.fs.copyTpl(
        this.templatePath('_.html'),
        this.destinationPath(path + changeCase.paramCase(this.props.moduleName) + '.html'),
        this.props
      );
    },

    modules: function () {
      helpers.addAngularModule(
        this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js',
        this.props.appName + '.' + this.props.moduleName
      );
    }
  }
});
