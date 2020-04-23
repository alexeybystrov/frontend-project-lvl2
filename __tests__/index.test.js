import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const result = fs.readFileSync(path.resolve('__tests__/fixtures/result'), 'utf8');

test('JSON', () => {
  const before = path.resolve('__tests__/fixtures/before.json');
  const after = path.resolve('__tests__/fixtures/after.json');

  expect(genDiff(before, after)).toMatch(result);
});

test('YML', () => {
  const before = path.resolve('__tests__/fixtures/before.yml');
  const after = path.resolve('__tests__/fixtures/after.yml');

  expect(genDiff(before, after)).toMatch(result);
});

test('INI', () => {
  const before = path.resolve('__tests__/fixtures/before.ini');
  const after = path.resolve('__tests__/fixtures/after.ini');

  expect(genDiff(before, after)).toMatch(result);
});
