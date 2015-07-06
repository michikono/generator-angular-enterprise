'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case');

module.exports = yeoman.generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    yeoman.generators.Base.apply(this, arguments);
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
        type:'list',
        name: 'router',
        message: 'Which router would you like to use?',
        default: 0,
        choices: ['Standard Angular Router','Angular UI Router']
      },
      {
        type: 'input',
        name: 'appSubFolder',
        message: 'Sub-folder (in client-side folder) for application code',
        default: 'app/',
        store: true
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.appName = changeCase.camelCase(this.props.appName);
      this.props.clientSideFolder = changeCase.paramCase(this.props.clientSideFolder).replace(/(.*?)\/$/, '$1') + '/';
      this.props.appSubFolder = changeCase.paramCase(this.props.appSubFolder).replace(/(.*?)\/$/, '$1') + '/';
      if (props.router === 'Angular UI Router') {
        this.props.uirouter = true;
        this.props.routerJs = 'bower_components/angular-ui-router/release/angular-ui-router.js';
        this.props.routerModuleName = 'ui.router';
        this.props.routerViewDirective = 'ui-view';
      } else {
        this.props.uirouter = false;
        this.props.routerJs = 'bower_components/angular-route/angular-route.js';
        this.props.routerModuleName = 'ngRoute';
        this.props.routerViewDirective = 'ng-view';
      }

      this.config.set('appName', this.props.appName);
      this.config.set('clientSideFolder', this.props.clientSideFolder);
      this.config.set('appSubFolder', this.props.appSubFolder);
      this.config.set('uirouter',this.props.uirouter);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this.props
      );
    },

    projectfiles: function () {
      this.fs.copyTpl(
        this.templatePath('core/_index.html'),
        this.destinationPath(this.config.get('clientSideFolder') + 'index.html'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('core/app/_app.module.js'),
        this.destinationPath(this.config.get('clientSideFolder') + this.config.get('appSubFolder') + 'app.module.js'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('jscsrc'),
        this.destinationPath('.jscsrc'),
        this.props
      );
    }
  },

  install: function () {
    this.installDependencies();
    if(this.props.uirouter) {
      this.spawnCommand('bower', ['install', 'angular-ui-router', '--save'], {});
    } else {
      this.spawnCommand('bower', ['install', 'angular-route', '--save'], {});
    }
  }
});
