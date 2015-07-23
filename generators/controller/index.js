'use strict';
var chalk = require('chalk');
var changeCase = require('change-case');
var helpers = require('../../lib/helpers');
var _ = require('lodash');
var fs = require('fs');

module.exports = helpers.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.NamedBase.apply(this, arguments);

    this.choices = {
      name: changeCase.camelCase(this.name),
      nameParamCase: changeCase.paramCase(this.name),
      namePascalCase: changeCase.pascalCase(this.name)
    };
  },

  prompting: function () {
    this.log('Creating a controller: ' + chalk.green(this.name) + '...');
    this.choices.moduleName = changeCase.camelCase(this.options.moduleName);

    var done = this.async();
    var customModules = _.filter(helpers.getAllAngularModules(this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js'), function (m) {
      return _.startsWith(m, this.config.get('appName') + '.') && m !== (this.config.get('appName') + '.core');
    }, this).sort();

    var prompts = [
      {
        type: 'list',
        name: 'moduleName',
        message: 'Which module does this controller belong in?',
        choices: customModules
      }];

    this.prompt(prompts, function (choices) {
      this.choices.moduleName = choices.moduleName.replace(this.config.get('appName') + '.', '');
      this.choices.moduleNameParamCase = changeCase.paramCase(this.choices.moduleName);
      var routeFilePrefix = this.destinationPath(
        this.config.get('clientSideFolder') + this.config.get('appSubFolder')
        + changeCase.paramCase(this.choices.moduleName) + '/'
      );

      var fileName = routeFilePrefix + changeCase.paramCase(this.choices.moduleName) + '.route.js';
      this.log('Adding a route entry in: ' + chalk.green(fileName));
      this.injectTemplatePartial(
        this.templatePath('snippet.' + ((this.config.get('uirouter') && 'state') || 'route') + '.js'),
        'INJECT:ROUTES',
        fileName
      );

      fileName = routeFilePrefix + changeCase.paramCase(this.choices.moduleName) + '.route.spec.js';
      this.log('Adding a route test entry in: ' + chalk.green(fileName));
      this.injectTemplatePartial(
        this.templatePath('snippet.' + ((this.config.get('uirouter') && 'state') || 'route') + '.spec.js'),
        'INJECT:TESTS',
        fileName
      );
      this.injectTemplatePartial(
        this.templatePath('snippet.route-view.js'),
        'INJECT:TEST_TEMPLATES',
        fileName
      );
      done();
    }.bind(this));
  },

  writing: {
    files: function () {
      this.installTemplateFolder(this.choices.name, 'controller', this.choices.moduleName);
      //this.composeWith('angular-enterprise:router', {
      //  args: [this.choices.moduleName],
      //  options: {controllerName: this.name}
      //});
    }
  }
});
