'use strict';
var chalk = require('chalk');
var changeCase = require('change-case');
var helpers = require('../../lib/helpers');

module.exports = helpers.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.NamedBase.apply(this, arguments);
    this.log('Creating feature: ' + chalk.green(this.name) + '...');
    this.choices = {
      name: changeCase.camelCase(this.name),
      nameParamCase: changeCase.paramCase(this.name),
      namePascalCase: changeCase.pascalCase(this.name)
    };
  },

  writing: {
    routes: function () {
      var path = this.config.get('clientSideFolder') + this.config.get('appSubFolder') + changeCase.paramCase(this.name) + '/';
      this.installTemplate(
        this.templatePath('_.module.js'),
        this.destinationPath(path + changeCase.paramCase(this.name) + '.module.js')
      );
      this.installTemplate(
        this.templatePath('_.config.js'),
        this.destinationPath(path + changeCase.paramCase(this.name) + '.config.js')
      );

      if (this.config.get('uirouter')) {
        this.installTemplate(
          this.templatePath('_.state.js'),
          this.destinationPath(path + changeCase.paramCase(this.name) + '.route.js')
        );
        this.installTemplate(
          this.templatePath('_.state.spec.js'),
          this.destinationPath(path + changeCase.paramCase(this.name) + '.route.spec.js')
        );
      } else {
        this.installTemplate(
          this.templatePath('_.route.js'),
          this.destinationPath(path + changeCase.paramCase(this.name) + '.route.js')
        );
        this.installTemplate(
          this.templatePath('_.route.spec.js'),
          this.destinationPath(path + changeCase.paramCase(this.name) + '.route.spec.js')
        );
      }
    },

    modules: function () {
      helpers.addAngularModule(
        this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js',
        this.config.get('appName') + '.' + this.choices.name
      );
    }
  }
});
