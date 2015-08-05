'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.mainEl.getText()).toBe('Congratulations, you\'ve scaffolded an app with Hestia!');
  });

});
