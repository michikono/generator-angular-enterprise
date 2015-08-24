#!/usr/bin/env node
var kexec = require('kexec');

var help = function () {
  console.log("Following are the available command line options: ");
  console.log(" ");
  console.log("ae new                       : Generate new application");
  console.log("ae feature myFeature         : Generate new feature, named myFeature");
  console.log("ae directive myDirective     : Generate new directive, named myDirective");
  console.log("ae filter myFilter           : Generate new filter, named myFilter");
  console.log("ae factory myFactory         : Generate new factory, named myFactory");
  console.log("ae service myService         : Generate new service, named myService");
  console.log("ae controller myController   : Generate new controller, named myController");
  console.log("ae e2e myFeature             : Generate new e2e test for myFeature");
  console.log("ae decorator \$http          : Generate new decorator for $http service");
  console.log(" ");
};

var options = {
  feature: true,
  directive: true,
  filter: true,
  factory: true,
  service: true,
  controller: true,
  e2e: true,
  decorator: true
};

if ( process.argv.length <= 2 || process.argv.length > 4 ) {
  help();
}

if ( process.argv.length === 3 ) {
	if ( process.argv[2] = "new" ) {
		kexec("yo", ["angular-enterprise"]);
	} else {
		help();
	}

}

if ( process.argv.length === 4 ) {
  if ( options[process.argv[2]] ) {
    kexec("yo", ["angular-enterprise:" + process.argv[2], process.argv[3]]);
  } else {
    help();
  }
}
