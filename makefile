install:
	npm install

build:
	rm -rf dist
	npm run build

publish:
	npm publish --dry-run

run:
	npx babel-node src/bin/gendiff.js temp/before.json temp/after.json

lint:
	npx eslint .