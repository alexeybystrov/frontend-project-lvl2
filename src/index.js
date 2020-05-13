import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/formatters.js';

const getDifference = (firstObject, secondObject) => {
  const unitedKeys = _.union(Object.keys(firstObject), Object.keys(secondObject));

  const diff = unitedKeys.map((key) => {
    if (!_.has(firstObject, key)) {
      return { name: key, value: secondObject[key], status: 'added' };
    }

    if (!_.has(secondObject, key)) {
      return { name: key, value: firstObject[key], status: 'deleted' };
    }

    if (firstObject[key] === secondObject[key]) {
      return { name: key, value: firstObject[key], status: 'unmodified' };
    }

    if (_.isObjectLike(firstObject[key]) && _.isObjectLike(secondObject[key])) {
      return { name: key, children: getDifference(firstObject[key], secondObject[key]) };
    }

    return {
      name: key, first: firstObject[key], second: secondObject[key], status: 'modified',
    };
  });

  return diff;
};

export default (before, after, outputFormat) => (
  format(getDifference(parse(before), parse(after)), outputFormat));
