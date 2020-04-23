import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parser = (pathToFile) => {
  const fullPathToFile = path.resolve(pathToFile);
  const fileContent = fs.readFileSync(fullPathToFile, 'utf8');

  let result;
  switch (path.extname(fullPathToFile)) {
    case '.json':
      result = JSON.parse(fileContent);
      break;
    case '.yml':
      result = yaml.safeLoad(fileContent);
      break;
    case '.ini':
      result = ini.parse(fileContent);
      break;
    default:
      // do nothing
  }

  return result;
};

export default parser;
