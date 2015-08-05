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
    if (!arguments[0].length) {
      arguments[1].env.error(chalk.red("The service name provided is NULL. \nIf the service begins with a '$' be sure to prefix it with a '\\'. \nFor example, '$http' should be written '\\$http'.\n"));
    } else {
      helpers.NamedBase.apply(this, arguments);

      this.log('Creating a decorator: ' + chalk.green(this.name) + '...');
    }

  },

  writing: {
    files: function () {
      this.choices = {
        name: changeCase.camelCase(this.name),
        nameParamCase: changeCase.paramCase(this.name),
        namePascalCase: changeCase.pascalCase(this.name)
      };

      this.injectTemplatePartial(
        this,
        this.templatePath('partial.decorator.js'),
        'INJECT:DECORATORS',
        this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.config.js'
      );

    }
  }
});
