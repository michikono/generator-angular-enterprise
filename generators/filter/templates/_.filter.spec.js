/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';

  describe('<%= name %>', function () {
    var filter, $filter;

    beforeEach(function () {
      angular.mock.module('<%= appName %>');
      angular.mock.module('<%= appName %>.filters');
    });

    beforeEach(inject(function (_$filter_) {
      $filter = _$filter_;
    }));

    it('should exist', function () {
      filter = $filter('<%= name %>', []);
      expect(filter).not.toBe(null);
    });
  });
})();
