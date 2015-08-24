# Weather for location

## Table of contents

* [Overview](#overview)

* [Prerequisites](#prerequisites)

* [Installing](#installing)

* [Development setup](#development-setup)

* [Production setup](#production-setup)

* [Releasing](#releasing)

* [Troubleshooting](#troubleshooting)

* [Acknowledgements](#acknowledgements)


## Overview

*Weather for location* shows the current weather together with an 8 day forecast for the current (gps)
location and a number of predefined international locations.

The application consists of an Angular.js 1.x frontend, together with a Node.js Express 5.x backend.
[Open Weather Maps](http://openweathermap.org/api) is used for provisioning of weather forecasts. [Weather
icons](http://erikflowers.github.io/weather-icons/) by [Eric Flowers](http://www.twitter.com/Erik_UX).
Application UX design inspired by [STUDIOJQ](https://www.behance.net/JonathanQuintin)'s
[Weather Dashboard Global Outlook](https://www.behance.net/gallery/Weather-Dashboard-Global-Outlook/12748107).

The project adheres to the [The twelve-factor app methodology](http://12factor.net/)
for building software-as-a-service apps, for items applicable.

### Frontend
* SPA (single page application).
* [Angular.js](https://angularjs.org/): services, controllers, custom directives, routing, ...
* [Less](http://lesscss.org/).
* [Browserify](http://browserify.org/).
* Media queries for managing different screen sizes.
* CSS vendor prefixing managed via [grunt-postcss](https://github.com/nDmitry/grunt-postcss)
and [caniuse-db](https://www.npmjs.com/package/caniuse-db).
* CSS Flexbox.
* Location images for the respective international locations.
* Weather forecast data consumed from the backend using angular.js's [$http service](https://docs.angularjs.org/api/ng/service/$http).
* Check performed on application startup for Open Weather Maps service availability.
* Unit tests using [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/).


### Backend
* Weather forecast data retrieved from Open Weather Maps, then transformed into a format suitable
for the frontend and presented via a REST-like interface.
* Caching of weather forecasts.
* Node 0.10.x compatible (using [Bluebird](https://github.com/petkaantonov/bluebird) for promises).
* [Request-retry](https://www.npmjs.com/package/requestretry) for managing unreliable network connections.
* [Winston](https://www.npmjs.com/package/winston) for configuring application logging levels.
* Open Weather Maps' (multitude of) weather conditions codes mapped to available weather icons.
* Time zone management for showing correct local time for the respective location in the dashboard view.
* Daytime or night time weather icon depending on whether it is daytime hours at the respective location.
* Unit tests using [Mocha](https://www.npmjs.com/package/mocha), [Chai](https://www.npmjs.com/package/chai)
and [Sinon](https://www.npmjs.com/package/sinon).


### Environment
* `.editorconfig`, covering tools expecting file formats of their own (make, npm, ...).
* `.gitattributes`, for e.g. normalizing checkouts on different platforms.
* `.jshintrc`, for most common jshint rules.

### General
* [Npm](https://www.npmjs.com/) used for dependency management.
* `Make` for creating deployment packages.
* [Node-config](https://github.com/lorenwest/node-config) for keeping runtime configurations separate
from the application code.
* Date and time management using [Moment.js](http://momentjs.com/).

### Build system
* [Grunt](http://gruntjs.com/) based build system.
* Adding of vendor prefixes as part of the build process.
* Revving of assets.
* Moving of source maps from (browserify) bundle to separate file.
* Uglifying of code.
* Minifying of html, css and images.
* Watching of source files.

### Design thoughts
* The application is structured by feature, i.e. code for a certain feature (js, markup, less, ...)
is grouped into a single directory.
* The design (as far as it makes sense) adheres to the
[browserify handbook's module philosophy](https://github.com/substack/browserify-handbook#module-philosophy)
with lean high cohesion modules (i.e. with single well defined responsibilities).
* The frontend is built with modern browsers in mind and hence requires IE 11 or later to work correctly.


## Prerequisites

### Development and runtime environment

#### Node.js

`Node.js` version 0.10.x or later. [Install instructions](https://nodejs.org/download/).

#### Npm

Npm is included in the Node.js installation. Npm is however updated more frequently than node.js,
and hence it is recommended to update npm to the most recent version:

```bash
$ sudo npm install npm -g
```

#### Grunt.js

`Grunt.js` version 0.4.5 or later. [Install instructions](http://gruntjs.com/getting-started).

#### Mocha.js

`Mocha.js` installed globally. (In case of permission problems, try `sudo` npm install ...).

```bash
$ npm install -g mocha
```

#### Gitflow

This project uses the [the gitflow model](http://nvie.com/posts/a-successful-git-branching-model/).
Installing the [gitflow git extension](https://github.com/nvie/gitflow):

```bash
$ sudo apt-get install git-flow
$ git flow init    # Accept default option for all questions, except version tag prefix - input a single letter `v`.
```

### Weather service API key

For being able to retrieve forecasts from the [Open Weather Map](http://openweathermap.org/) weather service
it is necessary to [sign up](http://openweathermap.org/appid) for a (free) API key.

Create a new file `local.json` under `<repo root dir>/config` with the following content:

```json
{
    "OpenWeatherMap": {
        "appId": "<Open Weather Map API key>"
    }
}
```

## Installing

Steps to perform after cloning the repo:

```bash
$ cd path/to/weather-for-location
$ npm install
```

## Development setup

### Backend

Start the backend server using nodemon (restarts the server on source code changes):

```bash
$ nodemon server.js
```

Run unit tests on source code changes (in a separate window):

```bash
$ npm run watch-test
```

### Frontend development builds

Build during development (no optimizing):

```bash
$ grunt build
```

Watching and rebuilding the frontend on source code changes:

```bash
$ grunt watch:build
```

### Frontend production builds

Build for production (all build steps):

```bash
$ grunt build-release
```

Watching and creating production builds on source code changes:

```bash
$ grunt watch:buildRelease
```

## Production setup

### Backend

Start the backend server:

```bash
$ node server.js
```

### Frontend production build

Create a frontend production build (if not done so already):

```bash
$ grunt build-release
```

## Releasing

### Before you start

Fetch the latest content from the server.

```bash
$ git fetch --prune
```

Make sure your local `master` branch is at the same commit as `origin/master`:

```bash
$ git checkout master
$ git reset --hard origin/master
```

Make sure your local `develop` branch is at the same commit as `origin/develop`:

```bash
$ git checkout develop
$ git reset --hard origin/develop
```

### Start the release process

For releasing e.g. version `0.2.0`:

```bash
$ git flow release start 0.2.0
```

### Bump version

Then, update the`package.json` `version` field. The version string should exist in one
single commit only (the one with the git tag `v0.2.0` created by `git flow`),
in order for the released version not to be mistaken by any other variation of the app.

```bash
$ git commit -am 'Bump version to 0.2.0.'
$ git flow release finish 0.2.0
```

Then update the `version` field in the `develop`  branch's `package.json`, to the next
planned version increment, with the extension `-alpha`. In this case `0.3.0-alpha`.

```bash
$ git checkout develop 	# if not on the develop branch already
$ git commit -am 'Bump version to 0.3.0-alpha.'
```

### Verify

Then, check that the release works:

```bash
$ git checkout master
$ rm -rf ./node_modules
$ npm install
$ grunt build-release
```

### Push `master` and version tag

Push the `master` branch and the numbered release tag:

```bash
$ git push origin master v0.2.0
```

### Push `develop`

```bash
$ git push origin develop
```


## Troubleshooting

### Retrieving weather forecasts

#### Cannot retrieve weather forecasts when starting the backend server

The backend server is started from the command line and does not use web browser
proxy settings. In case of being behind e.g. a corporate proxy it is necessary
to  tunnel the traffic through the proxy (which may or may not be an acceptable
solution in your organization).


#### Retrieving weather forecasts suddenly stops working

The weather service used by the application has proven not to be entirely predictable.
In case of unexpected errors, check your network connection, or try again in a
little while.


## Acknowledgements

weather-for-location is a project by [Magnus Tingberg](https://github.com/mtingberg).
