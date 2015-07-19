/** Alleviate jshint on tests https://github.com/johnpapa/angular-styleguide#style-y196 */
/* jshint -W117, -W030 */
(function () {
  'use strict';

  describe('<%= moduleName %>', function () {
    var filter, $filter;

    beforeEach(function () {
      angular.mock.module('<%= moduleName %>');
    });

    beforeEach(inject(function (_$filter_) {
      $filter = _$filter_;
    }));

    it('should exist', function () {
      filter = $filter('<%= moduleName %>', []);
      expect(filter).not.to.be.null;
    });
  });
})();
