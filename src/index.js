import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (before, after) => {
  const firstObject = parser(before);
  const secondObject = parser(after);
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

    acc.push(`  - ${key}: ${firstObject[key]}\n`);
    acc.push(`  + ${key}: ${secondObject[key]}\n`);
    return acc;
  }, []);

  return `{\n${diff.join('')}}`;
};

export default genDiff;
