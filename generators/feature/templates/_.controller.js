(function() {
  'use strict';

  /**
   * Chain to fetch module
   *   https://github.com/johnpapa/angular-styleguide#style-y022
   */
  angular
    .module('<%= appName %>.<%=name%>')
    .controller('<%= namePascalCase %>Controller', <%= namePascalCase %>Controller);

  /**
   * Avoid anonymous functions as callbacks
   *   https://github.com/johnpapa/angular-styleguide#style-y024
   *
   * Document dependency injenction using annotations
   *  https://github.com/johnpapa/angular-styleguide#style-y100
   */
  /* @ngInject */
  function <%= namePascalCase %>Controller() {

    /**
     * Attach any view properties to this variable
     *   https://github.com/johnpapa/angular-styleguide#style-y032
     */
    /* jshint validthis: true */
    var vm = this;

    /**
     * Bindable vm.* members (in alphabetical order)
     *   All variables here should be part of the vm object and not bound to `this`
     *   https://github.com/johnpapa/angular-styleguide#style-y033
     */
    vm.activate = activate;

    activate();

    /**
     * startup logic goes here
     *   https://github.com/johnpapa/angular-styleguide#style-y080
     */
    function activate() {

    }

    /**
     * Non-1-liner view methods here; declare as regular functions
     *   Implementation details should be declared here and linked via references (note that functions are hoisted up)
     *   https://github.com/johnpapa/angular-styleguide#style-y034
     */
  }

})();
