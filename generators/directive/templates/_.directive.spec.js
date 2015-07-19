/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';

  describe('<%= moduleName %>', function () {
    var $compile, $rootScope;

    beforeEach(function () {
      angular.mock.module('<%= moduleName %>');
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should exist', function () {
      var element = $compile('<div <%= moduleNameParamCase %> ></div>');
      $rootScope.$digest();
      expect(element.html()).toContain('View for <%= moduleName %>');
    });
  });
})();
