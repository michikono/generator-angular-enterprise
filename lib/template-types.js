/**
 * list of all valid template types
 *
 * Top level key is the type of generator supported
 *    @boolean subModule is whether or not that particular generation creates a module (and thus has its own folder)
 *    @string subFolder is the folder to place all contents (and nests inside a subModule folder)
 */
module.exports = {
  directive: {
    subModule: true,
    destination: 'directives/'
  },
  factory: {
    subModule: false,
    destination: 'providers/'
  },
  feature: {
    subModule: true,
    destination: false
  },
  filter: {
    subModule: false,
    destination: 'filters/'
  },
  service: {
    subModule: false,
    destination: 'providers/'
  }
};
