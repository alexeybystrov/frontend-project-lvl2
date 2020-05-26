import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const iniParser = (content) => {
  const data = ini.parse(content);

  const iter = (node) => Object.entries(node).reduce((acc, [key, value]) => {
    if (_.isObjectLike(value)) {
      return { ...acc, [key]: iter(value) };
    }
    if (typeof (value) === 'boolean') {
      return { ...acc, [key]: value };
    }
    if (!Number.isNaN(Number(value))) {
      return { ...acc, [key]: Number(value) };
    }
    return { ...acc, [key]: value };
  }, {});

  return iter(data);
};

const parse = (content, inputFormat) => {
  switch (inputFormat) {
    case '.yml':
      return yaml.safeLoad(content);
    case '.ini':
      return iniParser(content);
    case '.json':
      return JSON.parse(content);
    default:
      throw new Error('Unexpected input format!');
  }
};

export default parse;
