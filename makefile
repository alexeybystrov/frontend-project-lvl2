install:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run

run:
	npx babel-node src/bin/gendiff.js -f plain __fixtures__/Before.json __fixtures__/After.json

lint:
	npx eslint .