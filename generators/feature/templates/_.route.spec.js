/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';
  describe('<%= moduleName %> routes', function () {
    describe('state', function () {
      var $route, $templateCache;
      var view = '<%= clientSideFolder %><%= appSubFolder %><%= moduleNameParamCase %>/<%= moduleNameParamCase %>.html';

      beforeEach(function () {
        angular.mock.module('<%= appName %>.<%= moduleName %>');
      });

      beforeEach(inject(function (_$route_, _$templateCache_) {
        $route = _$route_;
        $templateCache = _$templateCache_;
        $templateCache.put(view, '');
      }));

      it('should map controller to url <%= stateUrl %>', function () {
        expect($route.routes['<%= stateUrl %>'].controller).to.be('<%= moduleNamePascalCase %>Controller');
      });

      it('should map <%= stateUrl %> route to <%= stateName %> View template', function () {
        expect($route.routes['<%= stateUrl %>'].templateUrl).to.equal(view);
      });
    });
  });
})();
