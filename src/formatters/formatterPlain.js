const format = (diffData, concatedName = '') => diffData
  .filter(({ status }) => (status !== 'unmodified'))
  .map(({
    name, value, oldValue, newValue, status, children,
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

    switch (status) {
      case 'added':
        return `Property '${newName}' was added with value: ${formatValue(value)}`;
      case 'deleted':
        return `Property '${newName}' was deleted`;
      case 'modified':
        return `Property '${newName}' was changed from ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      case undefined:
        return format(children, newName);
      default:
        throw new Error('Unexpected status!');
    }
  }).join('\n');

export default format;
