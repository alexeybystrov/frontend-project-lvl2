const format = (diffData, concatedName = '') => diffData
  .filter(({ status }) => (status !== 'unmodified'))
  .map(({
    name, value, first, second, status, children,
  }) => {
    const formatValue = (item) => {
      switch (typeof item) {
        case 'object':
          return '[complex value]';
        case 'string':
          return `'${item}'`;
        default:
          return item;
      }
    };

    const newName = concatedName === '' ? name : `${concatedName}.${name}`;

    let result;
    switch (status) {
      case 'added':
        result = `Property '${newName}' was added with value: ${formatValue(value)}`;
        break;
      case 'deleted':
        result = `Property '${newName}' was deleted`;
        break;
      case 'modified':
        result = `Property '${newName}' was changed from ${formatValue(first)} to ${formatValue(second)}`;
        break;
      case undefined:
        result = format(children, newName);
        break;
      default:
        // do nothing;
    }
    return result;
  }).join('\n');

export default format;
