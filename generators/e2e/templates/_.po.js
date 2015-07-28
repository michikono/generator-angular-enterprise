/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var <%= namePascalCase %>Page = function() {
	// Assign elements to be tested to properties of page object
	// See http://angular.github.io/protractor/#/api for details on Protractor API
	this.el = element(by.css('body'));
};

module.exports = new <%= namePascalCase %>Page();