Fomantic UI Meteorize
=====================

This tool generates 2 unofficial meteor packages based on Fomantic UI.

- [Fomantic-UI-Meteor-Data](https://github.com/mrmowgli/Fomantic-UI-Meteor-Data)
- [Fomantic-UI-Meteor](https://github.com/mrmowgli/Fomantic-UI-Meteor)

Pre-requisites
---------------

- Docker
- Write access to Fomantic-UI-Meteor-Data and Fomantic-UI-Meteor
- Publish access to Atmosphere for the packages
  - <https://atmospherejs.com/mrmowgli/fomantic-ui>
  - <https://atmospherejs.com/mrmowgli/fomantic-ui-data>

Versioning
----------

The versions of each packages are identical based on the version of Fomantic UI.

If `PACKAGE_VERSION` is `2.7.1` then it will download Semantic UI `v2.7.1` and generate the packages with version `2.7.1`.

Sometime you may want to fix a package and the version of Fomantic UI has not been changed. Therefore you can use `PACKAGE_VERSION=2.7.1_1` which will still download Fomantic UI `2.7.1` but will publish the packages with version `2.7.1_1`.

Usage
------

```bash
# Set up the package version
export PACKAGE_VERSION=2.7.1
# build docker image
$ make docker-build
# configure env.sh
$ cp env.template.sh env.sh
# edit env.sh properly
$ vim env.sh
# shell docker container
$ make docker-shell
# dependencies
$ make deps
# generate
$ make generate

# do some testing!!!

# publish mrmowgli:fomantic-ui-data
$ make publish-ui-data
# publish mrmowgli:fomantic-ui
$ make publish-ui
# clean
$ make clean
```

### Fix issues with the packages

```bash
# fix the problem
# commit it
$ git commit -am "fix..."
$ git push origin master

# change env var PACKAGE_VERSION with something like 2.2.6_1

# generate
$ make generate

# do some testing!!!

# publish mrmowgli:fomantic-ui-data
$ make publish-ui-data
# publish mrmowgli:fomantic-ui
$ make publish-ui
```

Testing
-------

TBD

Structure
---------

file/folder | description
--- | ---
dist/ | generated meteor packages
gulp-tasks/ | gulp tasks separated in multiple files to ease the development
lib/ | contains files that creates the data for themes, sites and definitions
meteor-test/ | meteor app that uses fomantic ui packages from dist/
scripts/ | script to publish the packages
templates/ | files to copy (and generates) to the packages
tmp/ | downloaded data like fomantic ui and generated data from gulp
gulpfile.js | tasks for generating the packages
