# Weather for location

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
