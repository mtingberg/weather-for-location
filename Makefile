SHELL := /bin/bash
GRUNT_BIN = grunt
GRUNT_RELEASE_FLAGS =
AUTO_PREFIXER_CORE = ./node_modules/grunt-autoprefixer/node_modules/autoprefixer-core

all: release

clean:
	$(GRUNT_BIN) clean
	rm deploy-package.tgz || true

clean-node:
	rm -rf node_modules

install: node_modules

release: $(GRUNT_BIN) caniuse-db node_modules
	$(GRUNT_BIN) build-release
	npm run test
	cp -R backend dist
	cp -R bin dist

node_modules:
	npm install

caniuse-db: node_modules
	npm update caniuse-db

dist/node_modules: node_modules
	(cd dist && ( rm -rf node_modules || true ) && npm install --production)

deploy-package: release dist/node_modules
	(cd dist && tar czf ../deploy-package.tgz app backend bin config *.js node_modules package.json)

.PHONY: grunt
