var ejs = require('ejs');
var merge = require('merge');
var fs = require('fs');

/**
 * Gets a snippet with all variables interpolated
 * Arguments:
 *  generator - instance of a generator
 *  filename - A file to load and return interpolated contents of
 */
module.exports = function (generator, file) {
  return ejs.render(fs.readFileSync(file, 'utf-8'), merge(generator.config.getAll(), generator.choices));
};
