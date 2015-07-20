/**
 * Separate configuration file for modules
 *   https://github.com/johnpapa/angular-styleguide#style-y129
 */
(function () {
  'use strict';

  angular.module('<%= appName %>.<%=name%>').config(config);

  /* @ngInject */
  function config($routeProvider) {
    /**
     * Always declare controllers with their routes
     *   https://github.com/johnpapa/angular-styleguide#style-y038
     */
    $routeProvider
      .when('/<%= nameParamCase %>', {
        templateUrl: '<%= appSubFolder %><%= nameParamCase %>/<%= nameParamCase %>.html',
        controller: '<%= namePascalCase %>Controller',
        controllerAs: 'vm',
        resolve: {}
      });
  }

  /**
   * Declare resolves here
   *   https://github.com/johnpapa/angular-styleguide#style-y081
   *
   * Manually call out resolver dependencies by placing the following comment above it: @ngInject
   *   https://github.com/johnpapa/angular-styleguide#style-y100
   */

})();
