# generator-angular-enterprise

** currently in progress **


## What is this?

This generator creates Angular projects that strictly adheres to the 
[most popular best practices guide](https://github.com/johnpapa/angular-styleguide).


## Enterprise?

Do you need to be an "enterprise" solution to use this? Absolutely not. However, most Angular tutorials teach _very_
bad patterns for creating larger Angular applications. Eventually, most devs hit a wall before realizing everybody else
has abandoned the practices their tutorials once endorsed.

The known best practices are often called "enterprise" patterns simply because they aren't as useful in small projects.
However, they are great for any project that plans to expand beyond a few primary controllers ("pages"/states).


## What makes this generator superior to others

* Whenever possible, rules are directly linked to the standards guide where invoked. This will help prevent future 
  developers from undoing your hard work.
* Not only does it generate a base template, but it will also generate secondary assets such as directives and services.
* Generates extremely standard tests (no obscure frameworks or libraries outside of those known as Best Practices) 
* Generates... uh, tests!
* Leverages some of the toolchain best practices as well (jshint and jscs)


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

* Gulp
* Run a server
* Services, filters, directives
* ngannotate (https://github.com/johnpapa/angular-styleguide#style-y100)
* mocha (https://github.com/johnpapa/angular-styleguide#style-y191)
* Run tests
* Chai 
* Sinon (https://github.com/johnpapa/angular-styleguide#style-y193)
* Karma (https://github.com/johnpapa/angular-styleguide#style-y192)
* Phantomjs (https://github.com/johnpapa/angular-styleguide#style-y194)
