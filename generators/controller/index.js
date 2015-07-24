'use strict';
var chalk = require('chalk');
var changeCase = require('change-case');
var helpers = require('../../lib/helpers');
var _ = require('lodash');
var path = require('path');

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

      var fileType = ((this.config.get('uirouter') && 'state') || 'route');

      this.injectTemplatePartial(
        this,
        this.templatePath('partial.' + fileType + '.js'),
        'INJECT:ROUTES',
        routeFilePrefix + changeCase.paramCase(this.choices.moduleName) + '.route.js'
      );

      this.injectTemplatePartial(
        this,
        this.templatePath('partial.' + fileType + '.spec.js'),
        'INJECT:ROUTE_TESTS',
        routeFilePrefix + changeCase.paramCase(this.choices.moduleName) + '.route.spec.js'
      );

      this.injectTemplatePartial(
        this,
        this.templatePath('partial.route-view.js'),
        'INJECT:ROUTE_TEST_TEMPLATES',
        routeFilePrefix + changeCase.paramCase(this.choices.moduleName) + '.route.spec.js'
      );
      done();
    }.bind(this));
  },

  writing: {
    files: function () {
      this.installTemplateFolder({
        generator: this,
        destination: path.join(this.config.get('clientSideFolder'), this.config.get('appSubFolder')),
        fileMacros: {'_': this.choices.nameParamCase}
      });
    }
  }
});
