# Generator Angular Enterprise [![Build Status](https://travis-ci.org/michikono/generator-angular-enterprise.svg?branch=master)](https://travis-ci.org/michikono/generator-angular-enterprise)

## What is this?

This is the most comprehensive and strict code generator that adheres to Angular's
[most popular best practices guide](https://github.com/johnpapa/angular-styleguide). It also generates companion tests and gives you a gulp build/test process. It even documents best practices that are being employed when generating a snippet (see below).

## Why would I use this over other generators?

Most Angular tutorials teach _very_ bad patterns for creating larger Angular applications. Eventually, most devs hit a wall before realizing everybody else has abandoned the practices their tutorials once endorsed.

There are also a lot of really popular patterns that aren't always practiced in the JavaScript 
community (such as code coverage analysis). This generator encourages some of these patterns as well.

These known best t are often called "enterprise" patterns simply because they aren't critical 
in small projects. This generator should be used in any project that plans to expand 
beyond a few primary states.

## Main Features

* **Teaches Best Practices** - Clearly labels code structures based on best practices (see next section)
* **Enables Continuous Integration** - Out of the box support for [Travis](https://travis-ci.org/) and [Drone](https://github.com/drone/drone)
* **Encourages TDD + ATDD** - Built in build process for both unit and functional (e2e) testing 
* **Performs Code Analysis** - Leverages some of the toolchain Best Practices (code coverage, complexity analysis, jshint, htmlhint, and JSCS)
* **Integrates with Enterprise APIs** - Integrated [Swagger-based](https://www.npmjs.com/package/swagger-server) server for mocked end points

### Best Practices Annotations

Whenever possible, rules are directly linked to the standards guide where invoked. This will help ensure future 
developers continue building on the best practices. For example, when generating a controller:

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


## Installation

To use it, you will need Yeoman - a tool for managing code generators.

```bash
npm install -g yo
```

Next, you'll need to install the generator

```bash
npm install -g generator-angular-enterprise
```

Now, create a new directory where you want your angular app to live. Then enter that directory.

```bash
cd Projects/
mkdir new-angular-app
cd new-angular-app
```

Then, initiate the generator:

```bash
ae new
```

Create your application's starting point:

```bash
ae feature myStartingSection
```

The above would generate the following folder/files in your designated application folder:

    app/
        my-starting-section/
            my-starting-section.module.js
            my-starting-section.route.js
            my-starting-section.route.spec.js

You would then add sub-components such as controllers to this module:

```bash
ae controller myStartingPage
```

Now your app looks like this:

    app/
        my-starting-section/
            my-starting-page.controller.js
            my-starting-page.controller.spec.js
            my-starting-page.html
            my-starting-section.module.js
            my-starting-section.route.js # <= modified with new routes
            my-starting-section.route.spec.js # <= modified with new routes
            

## Other commands

Running the app:

```bash
gulp serve
```

Running tests:

```bash
npm test
```

While developing, run tests and refresh the app automatically as you make changes:

```bash
gulp watch
```


### Other Generators

```bash
ae directive myDirective # "myDirective" is the camel case representation of your directive name
ae feature myFeature # "myFeature" is the name of the module (will generate a controller/routes)
ae filter myFilter # "myFilter" is what you would use in the HTML
ae factory myFactory # "myFactory" is the name of factory
ae service myService # "myService" is the name of service (singleton)
```


## Contributing

If you want to make changes to the generator, you'll want to make sure to observe our testing patterns. You can run tests with:

```bash
gulp test
```

And enable auto-testing via:

```bash
gulp watch
```

To develop on this generator, you will want to clone this repo and run:

```bash
npm link
```

This will "install" your local copy of this repository as a registered Yeoman generator. Note that the name of the
project folder you clone to *must* match the name of this generator (e.g., `generator-...`).


## License

MIT. Copyright (c) 2015 Michi Kono, John Katsnelson, Forrest Thomas


## Still todo ##

* Closure-ifying all files instead of manually doing it
* Code coverage analysis (cyclomatic, halstead)
* Complexity analysis
* TS support
