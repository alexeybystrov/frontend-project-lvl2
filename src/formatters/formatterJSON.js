import _ from 'lodash';

const formatter = (diffData, spacesCount = 2) => diffData.map(({
  name, value, first, second, status, children,
}) => {
  const spaces = ' '.repeat(spacesCount);

  const stringify = (item) => {
    if (_.isObjectLike(item)) {
      return Object.keys(item).map((key) => (`{\n${spaces}      ${key}: ${stringify(item[key])}\n${spaces}  }`));
    }
    return item;
  };

  switch (status) {
    case 'added':
      return `${spaces}+ ${name}: ${stringify(value)}`;
    case 'deleted':
      return `${spaces}- ${name}: ${stringify(value)}`;
    case 'unmodified':
      return `${spaces}  ${name}: ${stringify(value)}`;
    case 'modified':
      return `${spaces}- ${name}: ${stringify(first)}\n${spaces}+ ${name}: ${stringify(second)}`;
    default:
      return `${spaces}  ${name}: {\n${formatter(children, spacesCount + 4)}\n${spaces}  }`;
  }
}).join('\n');

export default formatter;
