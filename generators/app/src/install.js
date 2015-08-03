module.exports = function (Generator) {
  Generator.prototype.install = function () {
    this.installDependencies();
  }
}
