var chalk = require('chalk');
var installTemplate = require('./install-template');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var _ = require('lodash');

/**
 * Installs a target folder of template files to a new destination. Automatically applies all EJS interpolations
 * in any template or partials encountered.
 *
 * Arguments: expects a single object hash with the following keys
 *  generator     instance of a generator
 *  destination   the destination directory to install all generated files relative to
 *  fileMacros    (optional) filename macros in k/v pairs. For example { NAME: 'foo' } would change NAME.module.js
 *                  to foo.module.js. This macro is applied to all files and directories within the src.
 *  selector      (default: '** /*' without the space) glob for the template/ in the current generator folder
 */
module.exports = function (options) {
  var generator = options.generator;
  var destination = options.destination;
  var fileMacros = options.fileMacros || {};
  var selector = options.selector || '**/*';

  // grab all files
  glob(path.join(generator.templatePath(), selector), {}, function (er, files) {
    if (er) {
      console.error(er);
    } else {
      // first install all files
      files.forEach(function (file) {
        var basename = path.basename(file);

        // skip copying partials and directories
        if (fs.lstatSync(file).isDirectory() || file.match(/partial./)) {
          return;
        }

        // the file path after the template/
        var relativeFileLocation = file.replace(generator.templatePath(), '');

        // run all macros on the destination path
        var relativeDestinationFileLocation = relativeFileLocation;
        _.forEach(fileMacros, function (replacement, macro) {
          relativeDestinationFileLocation = relativeDestinationFileLocation.replace(new RegExp(_.escapeRegExp(macro), 'g'), replacement);
        });

        var absoluteDestinationPath = path.join(
          generator.destinationPath(),
          destination,
          relativeDestinationFileLocation
        );

        installTemplate(generator, generator.templatePath(relativeFileLocation), absoluteDestinationPath);
      });
    }
  });
};
