import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (before, after) => {
  const firstObject = parser(before);
  const secondObject = parser(after);
  const unitedKeys = _.uniq([...Object.keys(firstObject), ...Object.keys(secondObject)]);

  const diff = unitedKeys.reduce((acc, key) => {
    if (!_.has(firstObject, key)) {
      acc.push({ name: key, value: secondObject[key], status: 'added' });
      return acc;
    }

    if (!_.has(secondObject, key)) {
      acc.push({ name: key, value: firstObject[key], status: 'deleted' });
      return acc;
    }

    if (firstObject[key] === secondObject[key]) {
      acc.push({ name: key, value: firstObject[key], status: 'unmodified' });
      return acc;
    }

    acc.push({ name: key, value: firstObject[key], status: 'deleted' });
    acc.push({ name: key, value: secondObject[key], status: 'added' });
    return acc;
  }, []);

  const formatter = diff.map(({ name, value, status }) => {
    let result;
    switch (status) {
      case 'added':
        result = `  + ${name}: ${value}`;
        break;
      case 'deleted':
        result = `  - ${name}: ${value}`;
        break;
      case 'unmodified':
        result = `    ${name}: ${value}`;
        break;
      default:
        // do nothing
    }
    return result;
  });

  return `{\n${formatter.join('\n')}\n}`;
  // return diff;
};

export default genDiff;


/* {
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: true
} */
