var chalk = require('chalk');
var yosay = require('yosay');
var changeCase = require('change-case');


module.exports = function(Generator) {
  Generator.prototype.prompts = function() {
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
        name: 'appSubFolder',
        message: 'Sub-folder (in client-side folder) for application code',
        default: 'app/',
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
        type: 'confirm',
        name: 'swagger',
        message: 'Would you like to mock your api with Swagger?',
        default: true,
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
      this.config.set('swagger', this.choices.swagger);

      done();
    }.bind(this));
  }
}
