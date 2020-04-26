import _ from 'lodash';
import parser from './parsers.js';

const getDifference = (firstObject, secondObject) => {
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

    if (_.isObjectLike(firstObject[key]) && _.isObjectLike(secondObject[key])) {
      acc.push({ name: key, childrenSSS: getDifference(firstObject[key], secondObject[key]) });
      return acc;
    }

    acc.push({ name: key, value: firstObject[key], status: 'deleted' });
    acc.push({ name: key, value: secondObject[key], status: 'added' });
    return acc;
  }, []);

  return diff;
};

/* const genDiff = (before, after) => {
  const result = getDifference(parser(before), parser(after));
  return result;
}; */

const formatter = (diffData, spacesCount = 2) => diffData.map(({
  name, value, status, childrenSSS,
}) => {
  const spaces = ' '.repeat(spacesCount);

  const stringify = (item) => {
    if (_.isObjectLike(item)) {
      return Object.keys(item).map((key) => (`{\n${spaces}      ${key}: ${stringify(item[key])}\n${spaces}  }`));
    }
    return item;
  };

  switch (status) {
    case 'added':
      return `${spaces}+ ${name}: ${stringify(value)}`;
    case 'deleted':
      return `${spaces}- ${name}: ${stringify(value)}`;
    case 'unmodified':
      return `${spaces}  ${name}: ${stringify(value)}`;
    default:
      return `${spaces}  ${name}: {\n${formatter(childrenSSS, spacesCount + 4)}\n${spaces}  }`;
  }
}).join('\n');


const genDiff = (before, after) => {
  const result = formatter(getDifference(parser(before), parser(after)));
  return `{\n${result}\n}`;
};

export default genDiff;

/* _
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
        setting6: {
            key: value
          + ops: vops
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}
*/
