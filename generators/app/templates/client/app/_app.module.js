/**
 * Separate configuration file for modules; wrap all code in closures
 *   https://github.com/johnpapa/angular-styleguide#style-y128
 *   https://github.com/johnpapa/angular-styleguide#style-y127
 *   https://github.com/johnpapa/angular-styleguide#style-y010
 */
(function () {
  'use strict';

  angular.module('<%= appName %>',
    ['ui.bootstrap', 'ui.utils', '<%= routerModuleName %>', 'ngAnimate']);

  angular
    .module('<%= appName %>')
    .config(configure);

  /* @ngInject */
  function configure($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }
})();
