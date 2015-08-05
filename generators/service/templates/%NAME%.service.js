(function () {
  'use strict';

  /**
   * Chain to fetch module
   *   https://github.com/johnpapa/angular-styleguide#style-y022
   */
  angular
    .module('<%= appName %>.providers')
    .service('<%= name %>', <%= namePascalCase %>);

  /**
   * Avoid anonymous functions as callbacks
   *   https://github.com/johnpapa/angular-styleguide#style-y024
   */
  /* @ngInject */
  function <%= namePascalCase %>() {
    /**
     * Accessible members at top
     *   https://github.com/johnpapa/angular-styleguide#style-y052
     */
    this.publicMethod = _publicMethod;

    _initialize();

    ////////////

    /**
     * startup logic goes here
     *   https://github.com/johnpapa/angular-styleguide#style-y080
     */
    function _initialize() {

    }

    function _publicMethod() {
      return true;
    }
  }
})();
