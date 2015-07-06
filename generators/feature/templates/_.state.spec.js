/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';
  describe('<%= moduleName %> routes', function () {
    describe('state', function () {
      var $state, $templateCache;
      var view = '<%= clientSideFolder %><%= appSubFolder %><%= moduleNameParamCase %>/<%= moduleNameParamCase %>.html';

      beforeEach(function () {
        angular.mock.module('<%= appName %>.<%= moduleName %>');
      });

      beforeEach(inject(function (_$state_, _$templateCache_) {
        $state = _$state_;
        $templateCache = _$templateCache_;
        $templateCache.put(view, '');
      }));

      it('should map state <%= stateName %> to url <%= stateUrl %> ', function () {
        expect($state.href('<%= stateName %>', {})).to.equal('<%= stateUrl %>');
      });

      it('should map <%= stateUrl %> route to <%= stateName %> View template', function () {
        expect($state.get('<%= stateName %>').templateUrl).to.equal(view);
      });
    });
  });
})();
