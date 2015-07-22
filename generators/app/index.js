'use strict';
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case');
var _ = require('lodash');
var helpers = require('../../lib/helpers');

module.exports = helpers.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      chalk.green('Kakudo') + ' - TypeScript Angular 1.x generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'appName',
        message: 'Main application module name',
        default: 'app',
        store: true
      },
      {
        type: 'input',
        name: 'clientSideFolder',
        message: 'Folder for client-side code',
        default: 'client/',
        store: true
      },
      {
        type: 'input',
        name: 'directivePrefix',
        message: 'Prefix added to all directives (see Y073 in style guide); enter nothing/space to skip this',
        store: true
      },
      {
        type: 'list',
        name: 'router',
        message: 'Which router would you like to use?',
        default: (this.config.get('uirouter') && 1) || 0,
        choices: ['Standard Angular Router', 'Angular UI Router']
      },
      {
        type: 'input',
        name: 'appSubFolder',
        message: 'Sub-folder (in client-side folder) for application code',
        default: 'app/',
        store: true
      }];

    this.prompt(prompts, function (choices) {
      this.choices = choices;
      this.choices.appName = changeCase.camelCase(this.choices.appName.trim());
      this.choices.clientSideFolder = changeCase.paramCase(this.choices.clientSideFolder.trim()).replace(/(.*?)\/$/, '$1') + '/';
      this.choices.clientSideFolderMinusSlash = this.choices.clientSideFolder.slice(0, -1);
      this.choices.directivePrefix = changeCase.camelCase(this.choices.directivePrefix.trim());
      this.choices.appSubFolder = changeCase.paramCase(this.choices.appSubFolder.trim()).replace(/(.*?)\/$/, '$1') + '/';
      if (choices.router === 'Angular UI Router') {
        this.choices.uirouter = true;
        this.choices.routerJs = 'bower_components/angular-ui-router/release/angular-ui-router.js';
        this.choices.routerModuleName = 'ui.router';
        this.choices.routerViewDirective = 'ui-view';
      } else {
        this.choices.uirouter = false;
        this.choices.routerJs = 'bower_components/angular-route/angular-route.js';
        this.choices.routerModuleName = 'ngRoute';
        this.choices.routerViewDirective = 'ng-view';
      }

      this.config.set('appName', this.choices.appName);
      this.config.set('clientSideFolder', this.choices.clientSideFolder);
      this.config.set('appSubFolder', this.choices.appSubFolder);
      this.config.set('directivePrefix', this.choices.directivePrefix);
      this.config.set('uirouter', this.choices.uirouter);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.installTemplate(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.installTemplate(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.installTemplate(
        this.templatePath('_karma.conf.js'),
        this.destinationPath('karma.conf.js')
      );
      var gulpFiles = ['gulpfile.js', 'gulp/.jshintrc', 'gulp/build.js', 'gulp/conf.js', 'gulp/inject.js', 'gulp/scripts.js', 'gulp/server.js', 'gulp/watch.js', 'gulp/unit-tests.js'];
      var that = this;
      _.each(gulpFiles, function (file) {
        that.installTemplate(
          that.templatePath(file),
          that.destinationPath(file)
        )
      });
    },

    projectFiles: function () {
      this.installTemplate(
        this.templatePath('client/_index.html'),
        this.destinationPath(this.config.get('clientSideFolder') + 'index.html')
      );
      this.installTemplate(
        this.templatePath('client/app/_app.module.js'),
        this.destinationPath(this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js')
      );
      this.installTemplate(
        this.templatePath('client/app/_app.directives.module.js'),
        this.destinationPath(this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.directives.module.js')
      );
      this.installTemplate(
        this.templatePath('client/app/_app.filters.module.js'),
        this.destinationPath(this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.filters.module.js')
      );
      this.installTemplate(
        this.templatePath('client/app/_app.providers.module.js'),
        this.destinationPath(this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.providers.module.js')
      );
      this.installTemplate(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.installTemplate(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.installTemplate(
        this.templatePath('jscsrc'),
        this.destinationPath('.jscsrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
    if (this.options.skipInstall) {
      return;
    } else {
      if (this.config.get('uirouter')) {
        this.spawnCommand('bower', ['install', 'angular-ui-router', '--save'], {});
      } else {
        this.spawnCommand('bower', ['install', 'angular-route', '--save'], {});
      }
    }
  }
});
