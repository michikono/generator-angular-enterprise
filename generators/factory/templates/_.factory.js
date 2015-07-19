(function () {
  'use strict';

  /**
   * Chain to fetch module
   *   https://github.com/johnpapa/angular-styleguide#style-y022
   */
  angular
    .module('<%= appName %>.providers')
    .filter('<%= name %>', <%= name %>);

  /**
   * Avoid anonymous functions as callbacks
   *   https://github.com/johnpapa/angular-styleguide#style-y024
   */
  /* @ngInject */
  function <%= name %>() {
    /**
     * Accessible members at top
     *   https://github.com/johnpapa/angular-styleguide#style-y052
     */
    return {
      publicMethod: publicMethod
    };

    ////////////

    function publicMethod() {
      return true;
    }
  }
})();
