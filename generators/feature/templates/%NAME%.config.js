/**
 * Separate configuration file for modules
 *   https://github.com/johnpapa/angular-styleguide#style-y128
 */
(function () {
  'use strict';

  angular.module('<%= appName %>.<%=name%>').config(config);

  /* @ngInject */
  function config() {
  }
})();
