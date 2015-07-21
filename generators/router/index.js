'use strict';
var chalk = require('chalk');
var changeCase = require('change-case');
var helpers = require('../../lib/helpers');

module.exports = helpers.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.NamedBase.apply(this, arguments);
    this.log(
      'Creating route to module ' + chalk.green(this.name) + ' using '
      + chalk.green((this.config.get('uirouter') && 'UI Router') || 'Angular Router')
    );

    this.choices = {
      name: changeCase.camelCase(this.name),
      namePascalCase: changeCase.pascalCase(this.name),
      nameParamCase: changeCase.paramCase(this.name)
    };
  },

  writing: {
    files: function () {
      var path = this.config.get('clientSideFolder') + this.config.get('appSubFolder') + changeCase.paramCase(this.name) + '/';

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
    }
  }
});
