'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var run = require('gulp-run');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');
var lodash = require('lodash');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes,
    port: 3000
  };

  /*
   * You can add a proxy to your backend by uncommenting the line below.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  server.middleware = proxyMiddleware('/api', {target: 'http://localhost:3002'});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

var serverSynonyms = ['s', 'serve', 'server', 'servalicious'];

serverSynonyms.map(function(s) {
  gulp.task(s, ['watch'], function() {
    browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
  });
  gulp.task(s+':dist', ['build'], function () {
    browserSyncInit(conf.paths.dist);
  });
  gulp.task(s+':e2e', ['inject'], function () {
    browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
  });
  gulp.task(s+':e2e-dist', ['build'], function () {
    browserSyncInit(conf.paths.dist, []);
  });
});



gulp.task('swagger', function() {
  run('node api/server.js').exec();
});
