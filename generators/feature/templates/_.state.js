/**
 * Separate configuration file for modules
 *   https://github.com/johnpapa/angular-styleguide#style-y129
 */
(function () {
  'use strict';

  angular.module('<%= appName %>.<%=moduleName%>').config(setRouteState);

  function setRouteState($stateProvider) {
    /**
     * Always declare controllers with their routes
     *   https://github.com/johnpapa/angular-styleguide#style-y038
     */
    var state = {
      url: '<%= stateUrl %>',
      templateUrl: '<%= clientSideFolder %><%= appSubFolder %><%= moduleNameParamCase %>/<%= moduleNameParamCase %>.html',
      controller: '<%= moduleName %>Controller',
      controllerAs: 'vm',
      resolve: {}
    };
    $stateProvider.state('<%= stateName %>', state);
  }

  /**
   * Declare resolves here
   *   https://github.com/johnpapa/angular-styleguide#style-y081
   *
   * Manually call out resolver dependencies by placing the following comment above it: @ngInject
   *   https://github.com/johnpapa/angular-styleguide#style-y100
   */

})();