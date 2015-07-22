#!/bin/bash
function help {
  echo "Following are the available command line options: "
  echo " "
  echo "ae new                   : Generate new application"
  echo "ae feature myFeature     : Generate new feature, named myFeature"
  echo "ae directive myDirective : Generate new feature, named myDirective"
  echo "ae filter myFilter       : Generate new feature, named myFilter"
  echo "ae factory myFactory     : Generate new feature, named myFactory"
  echo "ae service myService     : Generate new feature, named myService"
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
  if [[ $1 = "feature" || $1 = "directive" || $1 = "filter" || $1 = "factory" || $1 = "service" ]]; then
    yo angular-enterprise:$1 $2
  else
    help
  fi
fi