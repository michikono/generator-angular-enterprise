var path = require('path');
var helpers = require('yeoman-generator').test;

module.exports = setupBaseGenerator = function(callback) {
    helpers.testDirectory(path.join(__dirname, '../.tmp'), function() {
      helpers.run(path.join(__dirname, '../../generators/app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          appName: 'app',
          clientSideFolder: 'client',
          directivePrefix: ' ',
          appSubFolder: 'app'
        })
        .on('end', function() {
          callback();
        });
    });
};
