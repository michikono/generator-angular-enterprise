(function () {
  'use strict';

  /**
   * Chain to fetch module
   *   https://github.com/johnpapa/angular-styleguide#style-y022
   */
  angular
    .module('app.filters')
    .filter('myFilter', myFilter);

  /**
   * Avoid anonymous functions as callbacks
   *   https://github.com/johnpapa/angular-styleguide#style-y024
   *
   * Document dependency injenction using annotations
   *  https://github.com/johnpapa/angular-styleguide#style-y100
   */
  /* @ngInject */
  function myFilter() {
    return function() {

    };
    /**
     * Avoid using filters for scanning all properties of a complex object graph. Use filters for select properties.
     *   https://github.com/johnpapa/angular-styleguide#style-y420
     */
  }
})();
