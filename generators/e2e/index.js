'use strict';
var chalk = require('chalk');
var path = require('path');
var changeCase = require('change-case');
var helpers = require('../../lib/helpers');

module.exports = helpers.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.NamedBase.apply(this, arguments);
    this.log('Creating e2e test: ' + chalk.green(this.name) + '...');
    var prefix = '';

    this.choices = {
      name: changeCase.camelCase(this.name),
      nameParamCase: changeCase.paramCase(prefix + this.name),
      namePascalCase: changeCase.pascalCase(prefix + this.name)
    };
  },

  writing: {
    files: function () {
      this.choices.templateFolder = 'e2e';
      this.installTemplateFolder({
        generator: this,
        destination: path.join('e2e', this.choices.nameParamCase),
        fileMacros: {'_': this.choices.nameParamCase}
      });
    }
  }
});
