import _ from 'lodash';

const stringify = (item, spaces) => {
  if (!_.isObjectLike(item)) {
    return item;
  }
  return Object.keys(item).map((key) => (`{\n${spaces}      ${key}: ${stringify(item[key])}\n${spaces}  }`));
};

const format = (diffData) => {
  const iter = (data, spacesCount = 2) => data.map(({
    name, value, oldValue, newValue, status, children,
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
        return `${spaces}- ${name}: ${stringify(oldValue, spaces)}\n${spaces}+ ${name}: ${stringify(newValue, spaces)}`;
      case undefined:
        return `${spaces}  ${name}: {\n${iter(children, spacesCount + 4)}\n${spaces}  }`;
      default:
        throw new Error(`Unexpected status: '${status}'!`);
    }
  }).join('\n');

  return `{\n${iter(diffData)}\n}`;
};

export default format;
