import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const fullPathToFile = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const resultJSON = fs.readFileSync(fullPathToFile('resultJSON'), 'utf8');
const resultPlain = fs.readFileSync(fullPathToFile('resultPlain'), 'utf8');

test('JSON', () => {
  const before = fullPathToFile('before.json');
  const after = fullPathToFile('after.json');

  expect(genDiff(before, after)).toMatch(resultJSON);
  expect(genDiff(before, after, 'plain')).toMatch(resultPlain);
});

test('YML', () => {
  const before = fullPathToFile('before.yml');
  const after = fullPathToFile('after.yml');

  expect(genDiff(before, after)).toMatch(resultJSON);
  expect(genDiff(before, after, 'plain')).toMatch(resultPlain);
});

test('INI', () => {
  const before = fullPathToFile('before.ini');
  const after = fullPathToFile('after.ini');

  expect(genDiff(before, after)).toMatch(resultJSON);
  expect(genDiff(before, after, 'plain')).toMatch(resultPlain);
});
