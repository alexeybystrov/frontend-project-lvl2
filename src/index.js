import _ from 'lodash';
import parser from './parsers.js';
import formatterJSON from './formatters/formatterJSON.js';

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
    return acc;
  }, []);

  return diff;
};

const genDiff = (before, after) => {
  const result = formatterJSON(getDifference(parser(before), parser(after)));
  // console.log(getDifference(parser(before), parser(after)));
  return `{\n${result}\n}`;
};

export default genDiff;
