module.exports = function (Generator) {
  Generator.prototype.install = function () {
    // the install process NEEDS the files in place
    this.fs.commit([],  function() {
      this.installDependencies();
    }.bind(this));
  }
}
