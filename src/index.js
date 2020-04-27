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
      acc.push({ name: key, children: getDifference(firstObject[key], secondObject[key]) });
      return acc;
    }

    acc.push({
      name: key, first: firstObject[key], second: secondObject[key], status: 'modified',
    });
    // acc.push({ name: key, value: firstObject[key], status: 'deleted' });
    // acc.push({ name: key, value: secondObject[key], status: 'added' });
    return acc;
  }, []);

  return diff;
};

const formatter = (diffData, spacesCount = 2) => diffData.map(({
  name, value, first, second, status, children,
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
    case 'modified':
      return `${spaces}- ${name}: ${stringify(first)}\n${spaces}+ ${name}: ${stringify(second)}`;
    default:
      return `${spaces}  ${name}: {\n${formatter(children, spacesCount + 4)}\n${spaces}  }`;
  }
}).join('\n');


const genDiff = (before, after) => {
  const result = formatter(getDifference(parser(before), parser(after)));
  // console.log(getDifference(parser(before), parser(after)));
  return `{\n${result}\n}`;
};

export default genDiff;
