import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parser = (pathToFile) => {
  const fullPathToFile = path.resolve(pathToFile);
  const fileContent = fs.readFileSync(fullPathToFile, 'utf8');

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


  let result;
  switch (path.extname(fullPathToFile)) {
    case '.json':
      result = JSON.parse(fileContent);
      break;
    case '.yml':
      result = yaml.safeLoad(fileContent);
      break;
    case '.ini':
      result = iniParser(fileContent);
      break;
    default:
      // do nothing
  }

  return result;
};

export default parser;
