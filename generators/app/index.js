'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case');
var _ = require('underscore');
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
      this.settings = choices;
      this.settings.appName = changeCase.camelCase(this.settings.appName);
      this.settings.clientSideFolder = changeCase.paramCase(this.settings.clientSideFolder).replace(/(.*?)\/$/, '$1') + '/';
      this.settings.clientSideFolderMinusSlash = this.settings.clientSideFolder.slice(0, -1);
      this.settings.appSubFolder = changeCase.paramCase(this.settings.appSubFolder).replace(/(.*?)\/$/, '$1') + '/';
      if (choices.router === 'Angular UI Router') {
        this.settings.uirouter = true;
        this.settings.routerJs = 'bower_components/angular-ui-router/release/angular-ui-router.js';
        this.settings.routerModuleName = 'ui.router';
        this.settings.routerViewDirective = 'ui-view';
      } else {
        this.settings.uirouter = false;
        this.settings.routerJs = 'bower_components/angular-route/angular-route.js';
        this.settings.routerModuleName = 'ngRoute';
        this.settings.routerViewDirective = 'ng-view';
      }

      this.config.set('appName', this.settings.appName);
      this.config.set('clientSideFolder', this.settings.clientSideFolder);
      this.config.set('appSubFolder', this.settings.appSubFolder);
      this.config.set('uirouter', this.settings.uirouter);

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
      var gulpFiles = ['gulpfile.js', 'gulp/.jshintrc', 'gulp/build.js', 'gulp/conf.js', 'gulp/inject.js', 'gulp/scripts.js', 'gulp/server.js', 'gulp/watch.js'];
      var that = this;
      _.each(gulpFiles, function (file) {
        that.installTemplate(
          that.templatePath(file),
          that.destinationPath(file)
        )
      });
    },

    projectfiles: function () {
      this.installTemplate(
        this.templatePath('client/_index.html'),
        this.destinationPath(this.config.get('clientSideFolder') + 'index.html')
      );
      this.installTemplate(
        this.templatePath('client/app/_app.module.js'),
        this.destinationPath(this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js')
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
    if (this.config('uirouter')) {
      this.spawnCommand('bower', ['install', 'angular-ui-router', '--save'], {});
    } else {
      this.spawnCommand('bower', ['install', 'angular-route', '--save'], {});
    }
  }
});
