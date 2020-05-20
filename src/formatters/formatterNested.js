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

    switch (status) {
      case 'added':
        return `${spaces}+ ${name}: ${stringify(value, spaces)}`;
      case 'deleted':
        return `${spaces}- ${name}: ${stringify(value, spaces)}`;
      case 'unmodified':
        return `${spaces}  ${name}: ${stringify(value, spaces)}`;
      case 'modified':
        return `${spaces}- ${name}: ${stringify(first, spaces)}\n${spaces}+ ${name}: ${stringify(second, spaces)}`;
      case undefined:
        return `${spaces}  ${name}: {\n${iter(children, spacesCount + 4)}\n${spaces}  }`;
      default:
        throw new Error('Unexpected status!');
    }
  }).join('\n');

  return `{\n${iter(diffData)}\n}`;
};

export default format;
