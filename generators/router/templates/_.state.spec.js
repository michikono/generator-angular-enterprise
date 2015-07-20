/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';
  describe('<%= name %> routes', function () {
    describe('state', function () {
      var $state, $templateCache;
      var view = '<%= appSubFolder %><%= nameParamCase %>/<%= nameParamCase %>.html';

      beforeEach(function () {
        angular.mock.module('<%= appName %>.<%= name %>');
      });

      beforeEach(inject(function (_$state_, _$templateCache_) {
        $state = _$state_;
        $templateCache = _$templateCache_;
        $templateCache.put(view, '');
      }));

      it('should map state <%= name %> to url /<%= nameParamCase %> ', function () {
        expect($state.href('/<%= nameParamCase %>', {})).to.equal('<%= name %>');
      });

      it('should map <%= nameParamCase %> route to view template', function () {
        expect($state.get('<%= name %>').templateUrl).to.equal(view);
      });
    });
  });
})();
