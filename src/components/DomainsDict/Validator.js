const prepareError = (column, msg) =>
  column.reduce((obj, item) => {
    obj[item] = `${msg} ${item}`;
    return obj;
  }, {});

const validate = (sortedRows, colours) => {
  let errors = {};
  const counted = colours.reduce((acc, curr) => {
    const domain = sortedRows.filter(row => row.domain === curr.name);
    const range = sortedRows.filter(row => row.range === curr.name);
    if ((domain.length || range.length) && !acc[curr.name]) {
      acc[curr.name] = {
        domain: domain.map(el => el.id),
        range: range.map(el => el.id)
      };
    }
    return acc;
  }, {});

  Object.keys(counted).map(key => {
    const rowColour = counted[key];

    if (rowColour.range.length > 0 && rowColour.domain.length > 0) {
      //issue : 3 & 4
      const range = prepareError(rowColour.range, 'Cycles range at row:');
      const domain = prepareError(rowColour.domain, 'Cycles domain at row:');
      errors = {
        range: {
          ...errors.range,
          ...range
        },
        domain: {
          ...errors.domain,
          ...domain
        }
      };
    }
    if (rowColour.domain.length > 1 && !rowColour.range.length) {
      //issue : 1 & 2
      const domain = prepareError(rowColour.domain, 'Duplicated domains at row:');
      errors = {
        range: {
          ...errors.range
        },
        domain: {
          ...errors.domain,
          ...domain
        }
      };
    }
    if (rowColour.range.length > 1 && !rowColour.domain.length) {
      //issue : 1 & 2
      const range = prepareError(rowColour.range, 'Duplicated ranges at row:');
      errors = {
        range: {
          ...errors.range,
          ...range
        },
        domain: {
          ...errors.domain
        }
      };
    }
  });
  return errors;
};
export default validate;
