/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';
  describe('<%= name %> routes', function () {
    describe('state', function () {
      var $route, $templateCache;
      var view = '<%= appSubFolder %><%= nameParamCase %>/<%= nameParamCase %>.html';

      beforeEach(function () {
        angular.mock.module('<%= appName %>');
        angular.mock.module('<%= appName %>.<%= name %>');
      });

      beforeEach(inject(function (_$route_, _$templateCache_) {
        $route = _$route_;
        $templateCache = _$templateCache_;
        $templateCache.put(view, '');
      }));

      it('should map controller to url /<%= nameParamCase %>', function () {
        expect($route.routes['/<%= nameParamCase %>'].controller).toBe('<%= namePascalCase %>Controller');
      });

      it('should map /<%= nameParamCase %> route to <%= name %> View template', function () {
        expect($route.routes['/<%= nameParamCase %>'].templateUrl).toEqual(view);
      });
    });
  });
})();
