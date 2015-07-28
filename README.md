# Generator Angular Enterprise [![Build Status](https://travis-ci.org/michikono/generator-angular-enterprise.svg?branch=master)](https://travis-ci.org/michikono/generator-angular-enterprise)

** Currently in progress; now in a usable state! **


## What is this?

This is the most comprehensive and strict code generator that adheres to Angular's
[most popular best practices guide](https://github.com/johnpapa/angular-styleguide). It also generates companion tests and gives you a gulp build/test process. It even documents best practices that are being employed when generating a snippet (see below).

## Do I need to be "Enterprise?"

Absolutely not. Most Angular tutorials teach _very_ bad patterns for creating larger Angular 
applications. Eventually, most devs hit a wall before realizing everybody else has abandoned 
the practices their tutorials once endorsed.

There are also a lot of really popular patterns that aren't always practiced in the JavaScript 
community (such as code coverage analysis). This generator encourages some of these patterns as well.

These known best practices are often called "enterprise" patterns simply because they aren't as 
useful in small projects. This generator should be useful for any project that plans to expand 
beyond a few primary states.

## Main Features

* **Supports Typed Languages** - TypeScript/ES6 ready (beneficial to large teams)
* **Enables Continuous Integration** - Out of the box support for [Travis](https://travis-ci.org/) and [Drone](https://github.com/drone/drone)
* **Integrates with Enterprise APIs** - Integrated [Swagger-based](https://www.npmjs.com/package/swagger-server) server for mocked end points
* **Encourages TDD + ATDD** - Built in build process for both unit and functional (e2e) testing 
* **Performs Code Analysis** - Leverages some of the toolchain Best Practices (code coverage, complexity analysis, jshint, and JSCS)
* **Teaches Best Practices** - Clearly labels code structures based on best practices (see next section)


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

To use it, you will need Yeoman - a tool for managing code generators - and this specific installer.

```bash
npm install -g yo
npm install -g generator-angular-enterprise
```

Then, initiate the generator:

```bash
yo angular-enterprise
```

And then create your application's starting point:

```bash
yo angular-enterprise:feature myStartingSection
```

For example, the above would generate the following folder/files in your designated application folder:

    app/
        my-starting-section/
            my-starting-section.module.js
            my-starting-section.route.js
            my-starting-section.route.spec.js

You would then add sub-components such as controllers to this module:

Then, initiate the generator:

```bash
yo angular-enterprise:controller myStartingController
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
yo angular-enterprise:directive myDirective # "myDirective" is the camel case representation of your directive name
yo angular-enterprise:feature myFeature # "myFeature" is the name of the module (will generate a controller/routes)
yo angular-enterprise:filter myFilter # "myFilter" is what you would use in the HTML
yo angular-enterprise:factory myFactory # "myFactory" is the name of factory
yo angular-enterprise:service myService # "myService" is the name of service (singleton)
```

## Alias

Typing the command:

```bash
yo angular-enterprise
```

for each generation is cumbersome. Unfortunately, there is no way to alias the generation command through the Yeoman API. If you would like to use an alias, please follow the proceeding steps.
**Note that you may have to do this as root (ie. sudo)**

1.You can put this file anywhere, but I am putting it in `~/.bin`.Navigate to your `~/.bin` directory (or whichever directory you have chosen) and create a file titled `ae.sh`

```bash
touch ~/.bin/ae.sh
```

2.Copy the contents of the `ae.sh` file located in this repo. 'ae.sh' is located in the `/scripts` directory of this repo.


3.You will need to give this file the correct permissions.

```bash
chmod +x ~/.bin/ae.sh
```

4.Now, we need to set up an alias in order to use this script. In your `.bash_profile` (or `.bashrc` or `.aliases`, etc), append this line to that file:

```bash
alias ae='sh ~/.bin/ae.sh'
```

5.Save this file, close it and open a new terminal (alternatively you can just `source` this file as well). Navigate to your project directory and make use of the new alias `ae`.


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

* Built in support for mocked server (Swagger)
* TypeScript support
* Closure-ifying all files instead of manually doing it
* Code coverage analysis (cyclomatic, halstead)
* Complexity analysis
