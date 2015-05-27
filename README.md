# Weather for location

## Installing

Steps to perform after cloning the repo:

```bash
$ cd path/to/webapp-template
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


## Acknowledgements

weather-for-location is a project by [Magnus Tingberg](https://github.com/mtingberg).
