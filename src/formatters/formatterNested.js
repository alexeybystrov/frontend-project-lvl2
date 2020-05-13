import _ from 'lodash';

const stringify = (item, spaces) => {
  if (_.isObjectLike(item)) {
    return Object.keys(item).map((key) => (`{\n${spaces}      ${key}: ${stringify(item[key])}\n${spaces}  }`));
  }
  return item;
};

const format = (diffData) => {
  const iter = (data, spacesCount = 2) => data.map(({
    name, value, first, second, status, children,
  }) => {
    const spaces = ' '.repeat(spacesCount);

    let result;
    switch (status) {
      case 'added':
        result = `${spaces}+ ${name}: ${stringify(value, spaces)}`;
        break;
      case 'deleted':
        result = `${spaces}- ${name}: ${stringify(value, spaces)}`;
        break;
      case 'unmodified':
        result = `${spaces}  ${name}: ${stringify(value, spaces)}`;
        break;
      case 'modified':
        result = `${spaces}- ${name}: ${stringify(first, spaces)}\n${spaces}+ ${name}: ${stringify(second, spaces)}`;
        break;
      case undefined:
        result = `${spaces}  ${name}: {\n${iter(children, spacesCount + 4)}\n${spaces}  }`;
        break;
      default:
        // do nothing;
    }
    return result;
  }).join('\n');

  return `{\n${iter(diffData)}\n}`;
};

export default format;
