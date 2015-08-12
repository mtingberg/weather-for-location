# Weather for location

*Weather for location* shows the current weather and an 8 day forecast for the current (gps) location
and a number of predefined international locations.
The application consists of an Angular.js 1.x frontend, together with a Node.js Express 5.x backend.
[Open Weather Maps](http://openweathermap.org/api) is used for retrieving weather forecasts. [Weather
icons](http://erikflowers.github.io/weather-icons/) by [Eric Flowers](http://www.twitter.com/Erik_UX).
Application UX design inspired by [STUDIOJQ](https://www.behance.net/JonathanQuintin)'s
[Weather Dashboard Global Outlook](https://www.behance.net/gallery/Weather-Dashboard-Global-Outlook/12748107).

The project adheres to the [The twelve-factor app methodology](http://12factor.net/)
for building software-as-a-service apps, for the items applicable.

### Frontend
* SPA (single page application).
* [Angular.js](https://angularjs.org/): services, controllers, custom directives, routing, ...
* [Less](http://lesscss.org/).
* [Browserify](http://browserify.org/).
* Media queries for managing different screen sizes.
* CSS vendor prefixing managed via [grunt-postcss](https://github.com/nDmitry/grunt-postcss)
and [caniuse-db](https://www.npmjs.com/package/caniuse-db).
* CSS Flexbox.
* Location images for the respective international location.
* Weather forecast data consumed from the backend using angular.js's [$http service](https://docs.angularjs.org/api/ng/service/$http).
* Check performed on application startup for Open Weather Maps service availability.


### Backend
* Weather forecast data retrieved from Open Weather Maps, then transformed into a format suitable
for the frontend and presented via a REST-like interface.
* Cached weather forecasts.
* Node 0.10.x compatible (using bluebird for promises support).
* [Request-retry](https://www.npmjs.com/package/requestretry) for managing unreliable network connections.
* [Winston](https://www.npmjs.com/package/winston) for configuring application logging levels.
* Open Weather Maps's (multitude of) weather conditions codes mapped to available weather icons.
* Time zone management for showing correct local time for the respective location in the dashboard view.
* Daytime or night time weather icon displayed depending on whether it is daytime hours at the
respective location.


### Environment
* `.editorconfig`, covering tools expecting file formats of their own (make, npm, ...).
* `.gitattributes`, for e.g. normalizing checkouts on different platforms.
* `.jshintrc`, for most common jshint rules.

### General
* [Npm](https://www.npmjs.com/) for dependency management.
* `Make` for creating deployment packages.
* [Node-config](https://github.com/lorenwest/node-config) for keeping runtime configurations separate
from the application code.
* [Moment.js](http://momentjs.com/) for time and date management.

### Build system
* [Grunt](http://gruntjs.com/) based build system.
* Adding of browser prefixes according to specified browsers and versions (grunt-postcss).
* Revving of assets.
* Moving of source maps from (browserify) bundle to separate file.
* Uglifying of code.
* Minifying of html, css and images.
* Watching of source files.
* Local connect web server.

### Design thoughts
* The application is structured by feature, i.e. all code (js, markup, less, ...) for
a certain feature is grouped into a single directory.
* The design (as far as it makes sense) adheres to the
[browserify handbook's module philosophy](https://github.com/substack/browserify-handbook#module-philosophy)
with lean modules that performs a single well defined thing only.
* The frontend is built with modern browsers in mind and hence requires IE 11 or later to work correctly.


## Prerequisites

`Node.js` version 0.10.x or later. [Install instructions](https://nodejs.org/download/).

`Grunt.js` version 0.4.5 or later. [Install instructions](http://gruntjs.com/getting-started).


## Installing

Steps to perform after cloning the repo:

```bash
$ cd path/to/weather-for-location
$ npm install
```

## Building

### Development builds

Build during development (no optimizing):

```bash
$ grunt build
```

Start a local (connect) server on port 8888, with development build steps, live reload and watch.

```bash
$ grunt server
```

Same as `grunt server` but with no live reload

```bash
$ grunt server-nlr
```

### Production builds

Build for production (all build steps):

```bash
$ grunt build-release
```

Start a local (connect) server on port 8888, with release build steps, live reload and watch.

```bash
$ grunt server-release
```

Same as `server-release` but with no live reload

```bash
$ grunt server-release-nlr
```

## Git Workflow

This project uses the [the git-flow model](http://nvie.com/posts/a-successful-git-branching-model/).
For tooling please see the [gitflow](https://github.com/nvie/gitflow) git extensions.

```bash
$ sudo apt-get install git-flow
$ git flow init                   # answer default to all questions, except version tag prefix. Answer a single letter `v`.
```


## Release Procedure

### Before you start

Open `gitk` and keep it open during the entire release, refreshing it between every command,
so you can follow along and see what's happening.

```bash
$ gitk --all &
```

Fetch the latest stuff from the server.

```bash
$ git fetch --prune
```

Make sure your local `master` branch is at the same commit as `origin/master`. To force it there:

```bash
$ git checkout master
$ git reset --hard origin/master
```

Make sure your local `develop` branch is at the same commit as `origin/develop`. To force it there:

```bash
$ git checkout develop
$ git reset --hard origin/develop
```

### Start the release

Example, for releasing `0.2.0`, e.g. after completing Sprint 2:

```bash
$ git flow release start 0.2.0
```

### Bump version

Then, update this project's version in `package.json` (and any `bower.json` to `0.2.0`).
That version string means _the finished release of Sprint 2_. This exact version string
must only exist in one single commit (the one with the git tag `v0.2.0` created by `git flow`).
For the released version not to be mistaken by any other variation of the app.

```bash
$ git commit -am 'Bump version to 0.2.0.'
$ git flow release finish 0.2.0
$ git checkout develop 	# if not on the develop branch already
```

Then, update this project's version in `package.json` and any `bower.json` to `0.3.0-alpha`.
That version string means _a version which will become `0.3.0`, but is not finished yet_.

```bash
$ git commit -am 'Bump version to 0.3.0-alpha.'
```

Note: do not push `develop` at this point.

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


## Acknowledgements

weather-for-location is a project by [Magnus Tingberg](https://github.com/mtingberg).
