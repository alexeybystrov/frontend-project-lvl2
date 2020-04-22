import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';


const before = path.resolve('__tests__/fixtures/before.json');
const after = path.resolve('__tests__/fixtures/after.json');
const result = fs.readFileSync(path.resolve('__tests__/fixtures/result'), 'utf8');


test('JSON', () => {
  expect(genDiff(before, after)).toMatch(result);
});
