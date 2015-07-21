/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';

  describe('<%= name %>', function () {
    var $compile, $scope;

    beforeEach(function () {
      angular.mock.module('<%= appName %>.directives');
    });

    /**
     * Declare template caches here
     */
    beforeEach(function () {
      angular.mock.module('app/directives/<%= nameParamCase %>/<%= nameParamCase %>.directive.html');
    });

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $scope = _$rootScope_.$new();
    }));

    it('should exist', function () {
      var element = $compile('<<%= nameParamCase %>></<%= nameParamCase %>>')($scope);
      $scope.$digest();
      expect(element.html()).toContain('View for &lt;<%= nameParamCase %>&gt; directive');
    });
  });
})();
