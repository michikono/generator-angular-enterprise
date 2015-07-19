'use strict';
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
    this.log('Creating service: ' + chalk.green(this.name) + '...');

    var prompts = [{
      name: 'tests',
      type: 'confirm',
      message: 'Generate tests?',
      default: true
    }];

    this.prompt(prompts, function (choices) {
      this.choices = choices;
      this.choices.name = changeCase.camelCase(this.name);
      // To access choices later use this.choices.someOption;
      done();
    }.bind(this));
  },

  writing: {
    files: function () {
      var path = this.config.get('clientSideFolder') + this.config.get('appSubFolder') + '/providers/';
      this.installTemplate(
        this.templatePath('_.factory.js'),
        this.destinationPath(path + changeCase.paramCase(this.choices.name) + '.factory.js')
      );
      if (this.choices.tests) {
        this.installTemplate(
          this.templatePath('_.factory.spec.js'),
          this.destinationPath(path + changeCase.paramCase(this.choices.name) + '.factory.spec.js')
        );
      }
    }
  }
});
