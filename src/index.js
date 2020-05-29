import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import format from './formatters/index.js';

const readFile = (pathToFile) => fs.readFileSync(path.resolve(pathToFile), 'utf8');
const getInputFormat = (pathToFile) => path.extname(path.resolve(pathToFile));

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
      return { name: key, children: getDifference(firstObject[key], secondObject[key]), status: 'nested value' };
    }

    return {
      name: key, oldValue: firstObject[key], newValue: secondObject[key], status: 'modified',
    };
  });

  return diff;
};

export default (firstConfig, secondConfig, outputFormat) => {
  const inputFormat = getInputFormat(firstConfig);
  const parsedFirstConfig = parse(readFile(firstConfig), inputFormat);
  const parsedSecondconfig = parse(readFile(secondConfig), inputFormat);
  const difference = getDifference(parsedFirstConfig, parsedSecondconfig);

  return format(difference, outputFormat);
};
