'use strict';
var chalk = require('chalk');
var changeCase = require('change-case');
var helpers = require('../../lib/helpers');

module.exports = helpers.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.NamedBase.apply(this, arguments);
    this.log('Creating directive: ' + chalk.green(this.name) + '...');
    var prefix = '';

    if (this.config.get('directivePrefix')) {
      prefix = this.config.get('directivePrefix') + '-';
    }
    this.choices = {
      name: changeCase.camelCase(this.name),
      nameParamCase: changeCase.paramCase(prefix + this.name),
      namePascalCase: changeCase.pascalCase(prefix + this.name)
    };
  },

  writing: {
    files: function () {
      this.choices.templateFolder = this.config.get('appSubFolder') + 'directives/';
      this.installTemplateFolder(this.choices.name, 'directive');
    }
  }
});
