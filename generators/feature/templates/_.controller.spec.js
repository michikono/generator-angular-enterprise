/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';

  describe('<%= namePascalCase %>Controller', function () {
    var controller, $controller;

    beforeEach(function () {
      angular.mock.module('<%= appName %>.<%= name %>');
    });

    beforeEach(inject(function (_$controller_) {
      $controller = _$controller_;
    }));

    it('should exist', function () {
      controller = $controller('<%= namePascalCase %>Controller', []);
      expect(controller).not.to.be.null;
    });
  });
})();
