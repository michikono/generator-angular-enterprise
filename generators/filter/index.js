'use strict';
var chalk = require('chalk');
var changeCase = require('change-case');
var path = require('path');
var helpers = require('../../lib/helpers');

module.exports = helpers.NamedBase.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.NamedBase.apply(this, arguments);
    this.log('Creating filter: ' + chalk.green(this.name) + '...');
    this.choices = {
      name: changeCase.camelCase(this.name),
      nameParamCase: changeCase.paramCase(this.name)
    };
  },

  writing: {
    files: function () {
      this.installTemplateFolder({
        generator: this,
        destination: path.join(this.config.get('clientSideFolder'), this.config.get('appSubFolder'), 'filters', this.choices.nameParamCase),
        fileMacros: {'_': this.choices.nameParamCase}
      });
    }
  }
});
