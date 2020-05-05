import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fullPathToFile = (filename) => path.resolve(__dirname, '..', '__fixtures__', filename);

let resultNested;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultNested = fs.readFileSync(fullPathToFile('resultNested'), 'utf8');
  resultPlain = fs.readFileSync(fullPathToFile('resultPlain'), 'utf8');
  resultJson = fs.readFileSync(fullPathToFile('resultJson'), 'utf8');
});

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])('compares %s and %s and mathces the difference with prepared result', (before, after) => {
  const first = fullPathToFile(before);
  const second = fullPathToFile(after);

  expect(genDiff(first, second)).toMatch(resultNested);
  expect(genDiff(first, second, 'plain')).toMatch(resultPlain);
  expect(genDiff(first, second, 'json')).toMatch(resultJson);
});
