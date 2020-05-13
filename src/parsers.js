import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const readFile = (dir) => fs.readFileSync(path.resolve(dir), 'utf8');

const iniParser = (content) => {
  const data = ini.parse(content);

  const iter = (node) => Object.entries(node).reduce((acc, [key, value]) => {
    if (_.isObjectLike(value)) {
      acc[key] = iter(value);
    } else if (typeof (value) === 'boolean') {
      acc[key] = value;
    } else if (!Number.isNaN(Number(value))) {
      acc[key] = Number(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});

  return iter(data);
};

const parser = (pathToFile) => {
  let result;
  switch (path.extname(path.resolve(pathToFile))) {
    case '.yml':
      result = yaml.safeLoad(readFile(pathToFile));
      break;
    case '.ini':
      result = iniParser(readFile(pathToFile));
      break;
    case '.json':
      result = JSON.parse(readFile(pathToFile));
      break;
    default:
        // do nothing;
  }

  return result;
};

export default parser;
