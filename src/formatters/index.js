import formatPlain from './formatterPlain.js';
import formatNested from './formatterNested.js';

const format = (diff, outputFormat) => {
  switch (outputFormat) {
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      return formatNested(diff);
  }
};

export default format;
