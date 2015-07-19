/**
 * Separate configuration file for modules; wrap all code in closures
 *   https://github.com/johnpapa/angular-styleguide#style-y128
 *   https://github.com/johnpapa/angular-styleguide#style-y127
 *   https://github.com/johnpapa/angular-styleguide#style-y010
 */
(function () {
  'use strict';

  /**
   * Move reused depencnies into separate core app module
   *   https://github.com/johnpapa/angular-styleguide#style-y165
   */
  angular.module('<%= appName %>.core', [
    'ui.bootstrap',
    'ui.utils',
    '<%= routerModuleName %>',
    'ngAnimate',
    '<%= appName %>.directives',
    '<%= appName %>.filters',
    '<%= appName %>.providers'
  ]);

  angular
    .module('<%= appName %>')
    .config(configure);

  /* @ngInject */
  function configure($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }
})();
