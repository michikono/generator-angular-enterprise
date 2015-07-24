var _ = require('lodash');

module.exports = function (Generator) {
  Generator.prototype.writing = {
    app: function () {
      this.installTemplateFolder({
        generator: this,
        destination: path.join(this.config.get('clientSideFolder'), '..'),
        fileMacros: {'_': changeCase.paramCase(this.name)}
      });
    }
  }
}
