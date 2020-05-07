import formatterPlain from './formatterPlain.js';
import formatterNested from './formatterNested.js';

const formatter = (diff, format) => {
  switch (format) {
    case 'plain':
      return formatterPlain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      return formatterNested(diff);
  }
};

export default formatter;
