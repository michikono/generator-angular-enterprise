/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';
  describe('<%= name %> routes', function () {
    describe('state', function () {
      var $route;

      beforeEach(function () {
        angular.mock.module('<%= appName %>');
        angular.mock.module('<%= appName %>.<%= name %>');

        // Place template loading modules below here
        // [INJECT:ROUTE_TEST_TEMPLATES] templates module for test loaded here, at this indent level. DO NOT REMOVE.
      });

      beforeEach(inject(function (_$route_) {
        $route = _$route_;
      }));

      // [INJECT:ROUTE_TESTS] Generated routes appear here, at this indent level. DO NOT REMOVE.
    });
  });
})();
