var _ = require('lodash');
var path = require('path');
var merge = require('merge');
var changeCase = require('change-case');

module.exports = function (Generator) {
  Generator.prototype.writing = {
    app: function () {
    	var globOptions;
		if (!this.config.get('swagger')) {
			globOptions = {ignore: '**/api/**'};
		}
		this.installTemplateFolder({
			generator: this,
			destination: path.join(this.config.get('clientSideFolder'), '..'),
			fileMacros: {'_': changeCase.paramCase(this.name)},
			globOptions: globOptions
		});
    }
  }
};
