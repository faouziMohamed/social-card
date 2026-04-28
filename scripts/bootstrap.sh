#!/bin/bash

OS=$(uname)
Color_Off='\033[0m'
Color_Green='\033[0;32m'
Color_Red='\033[0;31m'


echo_success() {
  echo -e "${Color_Green}${1}${Color_Off}"
}

echo_error() {
  echo -e "${Color_Red}${1}${Color_Off}"
}


# Step 0: Clean
# ================

echo_success "Bootstrap package: ${PWD##*/}"

echo "Remove node modules..."
rm -rf node_modules


# Step 1: Setup project
# ================

echo "Install node modules"
pnpm install

echo "Setup project..."
find ./ops/scripts/ -type f -iname "*.sh" -exec chmod +x {} \;


# Step final: Complete
# ================

echo_success "Bootstrap completed!"
