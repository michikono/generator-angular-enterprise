/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';

  describe('<%= name %>', function () {
    var $compile, $rootScope;

    beforeEach(function () {
      angular.mock.module('<%= appName %>.directives');
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));

    it('should exist', function () {
      var element = $compile('<<%= nameParamCase %>></<%= nameParamCase %>>');
      $rootScope.$digest();
      expect(element.html()).toContain('View for &lt;<%= nameParamCase %>&gt; directive');
    });
  });
})();
