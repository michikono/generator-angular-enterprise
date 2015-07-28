'use strict';

describe('<%= namePascalCase %> Page', function () {
  var page;

  beforeEach(function () {
    // Get the page being tested and require page object
    // This assumes you are writing an e2e test per page
    browser.get('/<% nameParamCase %>');
    page = require('./<%= nameParamCase %>.po');
  });

  it('should exist', function() {
    expect(page.el).not.toBe(undefined);
  });

});