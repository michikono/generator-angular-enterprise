(function() {
  'use strict';

  /**
   * Chain to fetch module
   *   https://github.com/johnpapa/angular-styleguide#style-y022
   */
  angular
    .module('<%= appName %>')
    .filter('<%= moduleName %>', <%= moduleName %>);

  /**
   * Avoid anonymous functions as callbacks
   *   https://github.com/johnpapa/angular-styleguide#style-y024
   */
  function <%= moduleName %>() {
    return function() {
      
    }
    /**
     * Avoid using filters for scanning all properties of a complex object graph. Use filters for select properties.
     *   https://github.com/johnpapa/angular-styleguide#style-y420
     */
  }


})();