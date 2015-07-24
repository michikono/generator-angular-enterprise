var merge = require('merge');

/**
 * Copies template files while applying EJS variables from config and choices
 * Equivalent to calling fs.copyTpl(src, dest, merge(this.config.getAll(), this.choices))
 * Arguments:
 *  generator - instance of a generator
 *  source - template file
 *  destination - installed file name/location
 */
module.exports = function installTemplate(generator, src, dest) {
  if (generator.choices === null) {
    throw Error('this.choices should be set to {} if unused');
  }
  return generator.fs.copyTpl(src, dest, merge(generator.config.getAll(), generator.choices));
};
