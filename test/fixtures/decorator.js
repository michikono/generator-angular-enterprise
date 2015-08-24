/**
 * Separate configuration file for modules
 *   https://github.com/johnpapa/angular-styleguide#style-y128
 */
(function () {
  'use strict';

  angular.module('app').config(config);

  /* @ngInject */
  function config($provide) {

    function logDecorator($delegate) {
      return {};
    };

    $provide.decorator('log', logDecorator);
    // [INJECT:DECORATORS] Generated decorators appear here, at this indent level. DO NOT REMOVE.
  }
})();
