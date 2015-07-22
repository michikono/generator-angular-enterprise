/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';

  describe('<%= name %>', function () {
    var <%= name %>;

    beforeEach(function () {
      angular.mock.module('<%= appName %>');
      angular.mock.module('<%= appName %>.providers');
    });

    beforeEach(inject(function (_<%= name %>_) {
      <%= name %> = _<%= name %>_;
    }));

    it('should exist', function () {
      expect(<%= name %>).not.toBe(null);
    });

    describe('publicMethod', function () {
      it('should return true', function () {
        expect(<%= name %>.publicMethod()).toBe(true);
      });
    });
  });
})();
