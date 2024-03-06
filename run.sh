#!/bin/bash

############################################################
# Help                                                     #
############################################################
Help()
{
   echo "Usage: ./script.sh [OPTIONS]"
   echo
   echo "Syntax: scriptTemplate [c|p|b]"
   echo "options:"
   echo "c     Docker clear."
   echo "p     Push Docker Image."
   echo "b     Build Docker Image."
   echo "R     Up Remote Docker Container."
   echo
}

PACKAGE_VERSION='';
re="\"(version)\": \"([^\"]*)\"";
while read -r l; do
    if [[ $l =~ $re ]]; then
        value="${BASH_REMATCH[2]}";
        PACKAGE_VERSION="$value";
    fi
done < package.json;

SCRIPTS_DIR="$(pwd)/scripts"
PACKAGE_NAME=rinha-de-backend-2024-q1-nodejs
DOCKER_IMAGE="tiracotech/${PACKAGE_NAME}:${PACKAGE_VERSION}"


function RunDockerCleanStart()
{
  sh $SCRIPTS_DIR/docker-clear.sh
}

function RunDockerImageBuild()
{
  npm run build
  docker build . -t $DOCKER_IMAGE
}

function RunDockerImagePush()
{
  docker push $DOCKER_IMAGE
}

function UpRemoteDockerContainer()
{
  docker compose -f ./docker-compose-remote.yml up
}


############################################################
# Process the input options. Add options as needed.        #
############################################################

DOCKER_CLEAR=false
DOCKER_BUILD=false
DOCKER_PUSH=false
DOCKER_UP_REMOTE=false

# Get the options
OPTSTRING=":hcbpR"
while getopts ${OPTSTRING} opt; do
  case $opt
  in
     h) # display Help
        Help
        exit;;
     c)
        DOCKER_CLEAR=true
        ;;
     b)
        DOCKER_BUILD=true
        ;;
     p)
        DOCKER_PUSH=true
        ;;      
     R)
        DOCKER_UP_REMOTE=true
        ;;      
    \?) # Invalid option
        echo $opt
        echo "Error: Invalid option"
        exit;;
  esac
done

############################################################
# Main                                                     #
############################################################
main() {
  if [ $DOCKER_CLEAR == true ]
  then
    RunDockerCleanStart
  fi

  if [ $DOCKER_BUILD == true ]
  then
    RunDockerImageBuild
  fi

  if [ $DOCKER_PUSH == true ]
  then
    RunDockerImagePush
  fi

  if [ $DOCKER_UP_REMOTE == true ]
  then
    UpRemoteDockerContainer
  fi
}


main