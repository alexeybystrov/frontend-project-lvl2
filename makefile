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
	npx babel-node src/bin/gendiff.js -f json __fixtures__/before.ini __fixtures__/after.ini

lint:
	npx eslint .