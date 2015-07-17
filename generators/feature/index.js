'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var changeCase = require('change-case');
var helpers = require('../../lib/helpers');

module.exports = helpers.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.NamedBase.apply(this, arguments);
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
      default: '/' + changeCase.paramCase(this.name).replace(/(.*?)\/$/, '$1')
    }, {
      name: 'tests',
      type: 'confirm',
      message: 'Generate tests?',
      default: true
    }];

    this.prompt(prompts, function (choices) {
      this.choices = choices;
      this.choices.moduleName = changeCase.camelCase(this.choices.moduleName);
      this.choices.moduleNameParamCase = changeCase.paramCase(this.choices.moduleName);
      this.choices.moduleNameCamelCase = changeCase.camelCase(this.choices.moduleName);
      this.choices.stateName = changeCase.camelCase(this.name);
      this.choices.stateUrl = '/' + this.choices.moduleNameParamCase.replace(/(.*?)\/$/, '$1').replace(/\/(.*?)/, '$1');
      this.choices.name = this.name;
      // To access choices later use this.choices.someOption;
      done();
    }.bind(this));
  },

  writing: {
    files: function () {
      var path = this.config.get('clientSideFolder') + this.config.get('appSubFolder') +
        changeCase.paramCase(this.choices.moduleName) + '/';

      this.installTemplate(
        this.templatePath('_.module.js'),
        this.destinationPath(path + changeCase.paramCase(this.choices.moduleName) + '.module.js')
      );
      if (this.config.get('uirouter')) {
        this.installTemplate(
          this.templatePath('_.state.js'),
          this.destinationPath(path + changeCase.paramCase(this.choices.moduleName) + '.route.js')
        );
        if (this.choices.tests) {
          this.installTemplate(
            this.templatePath('_.state.spec.js'),
            this.destinationPath(path + changeCase.paramCase(this.choices.moduleName) + '.route.spec.js')
          );
        }
      } else {
        this.installTemplate(
          this.templatePath('_.route.js'),
          this.destinationPath(path + changeCase.paramCase(this.choices.moduleName) + '.route.js')
        );
        if (this.choices.tests) {
          this.installTemplate(
            this.templatePath('_.route.spec.js'),
            this.destinationPath(path + changeCase.paramCase(this.choices.moduleName) + '.route.spec.js')
          );
        }
      }
      this.installTemplate(
        this.templatePath('_.controller.js'),
        this.destinationPath(path + changeCase.paramCase(this.choices.moduleName) + '.controller.js')
      );
      if (this.choices.tests) {
        this.installTemplate(
          this.templatePath('_.controller.spec.js'),
          this.destinationPath(path + changeCase.paramCase(this.choices.moduleName) + '.controller.spec.js')
        );
      }
      this.installTemplate(
        this.templatePath('_.html'),
        this.destinationPath(path + changeCase.paramCase(this.choices.moduleName) + '.html')
      );
    },

    modules: function () {
      helpers.addAngularModule(
        this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js',
        this.config.get('appName') + '.' + this.choices.moduleName
      );
    }
  }
});
