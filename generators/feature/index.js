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
    this.log('Creating feature: ' + chalk.green(this.name) + '...');
    this.choices = {
      name: changeCase.camelCase(this.name),
      nameParamCase: changeCase.paramCase(this.name),
      namePascalCase: changeCase.pascalCase(this.name)
    };
  },

  writing: {
    routes: function () {
      var selector;
      if (this.config.get('uirouter')) {
        selector = '{*.config.*,*.module.*,*.state.*}';
      } else {
        selector = '{*.config.*,*.module.*,*.route.*}';
      }

      this.installTemplateFolder({
        generator: this,
        destination: path.join(this.config.get('clientSideFolder'), this.config.get('appSubFolder'), this.choices.nameParamCase),
        fileMacros: {'_': this.choices.nameParamCase},
        selector: selector
      });
    },

    modules: function () {
      helpers.addAngularModule(
        this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js',
        this.config.get('appName') + '.' + this.choices.name
      );
    }
  }
});
