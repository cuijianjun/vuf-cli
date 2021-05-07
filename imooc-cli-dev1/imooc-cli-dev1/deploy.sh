#!/bin/bash
git add .
git commit -m "$1"
default="master"
targetBranch=$2
branch=${targetBranch-$default}
git push origin $branch