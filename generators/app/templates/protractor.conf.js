'use strict';

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

 // Capabilities to be passed to the webdriver instance.
 capabilities: {
   'browserName': 'phantomjs',

   /* 
    * Can be used to specify the phantomjs binary path.
    * This can generally be ommitted if you installed phantomjs globally.
    */
   'phantomjs.binary.path': require('phantomjs').path,

   /*
    * Command line args to pass to ghostdriver, phantomjs's browser driver.
    * See https://github.com/detro/ghostdriver#faq
    */
   'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']
 },
  
  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directory when
  // protractor is called.
  specs: ['e2e/**/*.js'],

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};