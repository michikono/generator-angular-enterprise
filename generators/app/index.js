'use strict';

var helpers = require('../../lib/helpers');

var Generator = helpers.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    helpers.Base.apply(this, arguments);
  }
});

require('./src/prompts')(Generator);
require('./src/write')(Generator);
require('./src/install')(Generator);

module.exports = Generator;
