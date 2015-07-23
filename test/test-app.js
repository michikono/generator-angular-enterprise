'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('generation tests', function () {

  describe('app generation', function() {
    beforeEach(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .withOptions({ skipInstall: true })
        .withPrompts({
          appName: 'app',
          clientSideFolder: 'client',
          directivePrefix: ' ',
          appSubFolder: 'app'
        })
        .on('end', done);
    });

    it('creates dependency and config files', function () {
      assert.file([
        'bower.json',
        'package.json',
        '.editorconfig',
        '.jscsrc',
        '.jshintrc'
      ]);
    });

    it('creates build tool files', function () {
      assert.file([
        'karma.conf.js',
        'gulpfile.js'
      ]);
    });

    it('creates core app files', function () {
      assert.file([
        'client/app/app.core.module.js',
        'client/app/app.directives.module.js',
        'client/app/app.filters.module.js',
        'client/app/app.module.js',
        'client/app/app.providers.module.js'
      ]);
    });

    describe('core', function() {
      it('should contain app dependencies', function() {
        assert.fileContent([
          [
            'client/app/app.core.module.js', 
            /angular\.module/
          ],
          [
            'client/app/app.core.module.js', 
            /app\.core/
          ],
          [
            'client/app/app.core.module.js', 
            /ui\.bootstrap/
          ],
          [
            'client/app/app.core.module.js', 
            /ui\.utils/
          ],
          [
            'client/app/app.core.module.js', 
            /ngAnimate/
          ],
          [
            'client/app/app.core.module.js', 
            /app\.directives/
          ],
          [
            'client/app/app.core.module.js', 
            /app\.filters/
          ],
          [
            'client/app/app.core.module.js', 
            /app\.providers/
          ]
        ]);
      });
    });

    describe('directives', function() {
      it('should register the directives module', function() {
        assert.fileContent(
          'client/app/app.directives.module.js',
          /angular\.module\('app\.directives', \[\]\);/
          )
      });
    });

    describe('filters', function() {
      it('should register the filters module', function() {
        assert.fileContent(
          'client/app/app.filters.module.js',
          /angular\.module\('app\.filters', \[\]\);/
          )
      });
    });

    describe('providers', function() {
      it('should register the providers module', function() {
        assert.fileContent(
          'client/app/app.providers.module.js',
          /angular\.module\('app\.providers', \[\]\);/
          )
      });
    });

  });

});
