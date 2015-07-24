var _ = require('lodash');
var fs = require('fs');
var getSnippet = require('./get-snippet');
var chalk = require('chalk');

/**
 * Adds a partial into a target file
 * Arguments:
 *   generator: instance of a generator
 *   partial: the path to the file being modified
 *   macroName: the name of the macro to search and replace which will be in a comment block surrounded by brackets,
 *              for example:
 *                  // [INJECT:ROUTES]
 *              Would be converted to an argument represented simply as:
 *                  INJECT:ROUTES
 *   intoFile: the partial (which will have its variables interpolated)
 */
module.exports = function(generator, partialFile, macroName, intoFile) {
  macroName = _.escapeRegExp(macroName);

  // open the file, inject code, save new file
  var data = fs.readFileSync(intoFile, 'utf-8');
  var snippetContents = getSnippet(generator, partialFile);

  // if the snippet is already in the file, move on
  if (data.match(new RegExp('\\s*' + _.escapeRegExp(snippetContents).replace(/[\s\n]/g, '\\s*').replace(/\\n/g, '\\s*') + '\\s*'))) {
    return;
  }

  // find and replace the template marker
  var regex = '^([\\t ]*)(\\/[/* \\t]+\\[' + macroName + '\\].*)$';
  var tabMatch = data.match(new RegExp(regex, 'mi'));
  if (tabMatch === null) {
    throw Error('Bad macro attempt for ' + macroName + ' in ' + partialFile + ' => ' + intoFile);
  }
  var tab = tabMatch[1];
  var newValue = data.replace(
    new RegExp(regex, 'gmi'),
    // make sure formatting of newly inserted template looks right
    snippetContents
      // rtrim
      .replace(/\n+$/g, '').replace(/~+$/, '')
      // indent all lines that have content
      .replace(/^(.+)$/gm, tab + '$1')
      // re-insert a new marker for next time
    + '\n' + tab + '$2'
  );
  generator.log('Injecting code into ' + intoFile.replace(generator.templatePath(), '') + ':\n  '
    + chalk.green('[' + macroName + ']')
    + ' <= ' + chalk.green(partialFile.replace(generator.templatePath(), ''))
  );
  fs.writeFileSync(intoFile, newValue, 'utf-8');
};
