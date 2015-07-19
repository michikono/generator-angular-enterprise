# generator-angular-enterprise

** currently in progress **


## What is this?

This generator creates Angular projects that _strictly_ adheres to the 
[most popular best practices guide](https://github.com/johnpapa/angular-styleguide). It meticulously documents any best practices that are being employed when generating a snippet. Resulting output looks something like this:

````javascript
// start example snippet ...
/**
 * Chain to fetch module
 *   https://github.com/johnpapa/angular-styleguide#style-y022
 */
angular
  .module('myApp.aboutPage')
  .controller('AboutPageController', AboutPageController);

/**
 * Avoid anonymous functions as callbacks
 *   https://github.com/johnpapa/angular-styleguide#style-y024
 *
 * Document dependency injenction using annotations
 *  https://github.com/johnpapa/angular-styleguide#style-y100
 */
/* @ngInject */
function AboutPageController() {
// ... end example snippet
````

It also generates tests and gives you a gulp build process.

## Do I need to be "Enterprise?"

Absolutely not. Most Angular tutorials teach _very_ bad patterns for creating larger Angular 
applications. Eventually, most devs hit a wall before realizing everybody else has abandoned 
the practices their tutorials once endorsed.

The known best practices are often called "enterprise" patterns simply because they aren't as 
useful in small projects. This generator should be useful for any project that plans to expand 
beyond a few primary states.


## What makes this generator superior to others

* Whenever possible, rules are directly linked to the standards guide where invoked. This will help prevent future 
  developers from undoing your hard work.
* Not only does it generate a base template, but it will also generate secondary assets such as directives and services.
* Generates extremely standard tests (no obscure frameworks or libraries outside of those known as Best Practices) 
* Generates... uh, tests!
* Leverages some of the toolchain Best Practices as well (jshint and jscs)


## Installation

To use it, you will need Yeoman - a tool for managing code generators - and this specific installer.

```bash
npm install -g yo
npm install -g generator-angular-enterprise
```

Then, initiate the generator:

```bash
yo angular-enterprise
```

## Other commands

```bash
yo angular-enterprise:feature myFeature # "myFeature" is the name of the module
```

## License

MIT. Copyright (c) 2015 Michi Kono


## Still todo ##

* Services
* ngannotate (https://github.com/johnpapa/angular-styleguide#style-y100)
* mocha (https://github.com/johnpapa/angular-styleguide#style-y191)
* Run tests
* Chai 
* Sinon (https://github.com/johnpapa/angular-styleguide#style-y193)
* Karma (https://github.com/johnpapa/angular-styleguide#style-y192)
* Phantomjs (https://github.com/johnpapa/angular-styleguide#style-y194)
