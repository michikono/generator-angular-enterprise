module.exports = function (Generator) {
  Generator.prototype.install = function () {
    // the install process NEEDS the files in place
    this.fs.commit([],  function() {
      this.installDependencies();
      if (this.options.skipInstall) {
        return;
      } else {
        if (this.config.get('uirouter')) {
          this.spawnCommand('bower', ['install', 'angular-ui-router', '--save'], {});
        } else {
          this.spawnCommand('bower', ['install', 'angular-route', '--save'], {});
        }
      }

    }.bind(this));
  }
}
