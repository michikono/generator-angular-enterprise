#!/bin/bash
function help {
  echo "Following are the available command line options: "
  echo " "
  echo "ae new                          : Generate new application"
  echo "ae feature myFeature            : Generate new feature, named myFeature"
  echo "ae directive myDirective        : Generate new directive, named myDirective"
  echo "ae filter myFilter              : Generate new filter, named myFilter"
  echo "ae factory myFactory            : Generate new factory, named myFactory"
  echo "ae service myService            : Generate new service, named myService"
  echo "ae controller myController      : Generate new controller, named myController"
  echo "ae e2e myFeature                : Generate new e2e test for myFeature"
  echo " "
}
if [[ $# = 0 || $# > 2 ]]; then
  help
fi

if [ $# = 1 ]; then
  if [ $1 = "new" ]; then
    yo angular-enterprise
  else
    help
  fi
fi

if [ $# = 2 ]; then
  if [[ $1 = "feature" || $1 = "directive" || $1 = "filter" || $1 = "factory" || $1 = "service" || $1 = "controller" || $1 = "e2e" ]]; then
    yo angular-enterprise:$1 $2
  else
    help
  fi
fi