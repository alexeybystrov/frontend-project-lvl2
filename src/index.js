import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const genDiff = (before, after) => {
  const firstObject = JSON.parse(fs.readFileSync(path.resolve(before)));
  const secondObject = JSON.parse(fs.readFileSync(path.resolve(after)));
  const unitedKeys = _.uniq([...Object.keys(firstObject), ...Object.keys(secondObject)]);

  const diff = unitedKeys.reduce((acc, key) => {
    if (!_.has(firstObject, key)) {
      acc.push(`  + ${key}: ${secondObject[key]}\n`);
      return acc;
    }

    if (!_.has(secondObject, key)) {
      acc.push(`  - ${key}: ${firstObject[key]}\n`);
      return acc;
    }

    if (firstObject[key] === secondObject[key]) {
      acc.push(`    ${key}: ${firstObject[key]}\n`);
      return acc;
    }

    acc.push(`  - ${key}: ${firstObject[key]}\n`, `  + ${key}: ${secondObject[key]}\n`);
    return acc;
  }, []);

  return `{\n${diff.join('')}}`;
};

export default genDiff;
