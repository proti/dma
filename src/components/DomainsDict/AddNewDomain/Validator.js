const validate = (sortedRows, colours) => {
  let errors = {};
  console.log('===validation:');
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
  console.log('Errors:', counted);

  Object.keys(counted).map(key => {
    const rowColour = counted[key];
    console.log(key, ':', counted[key], rowColour.range.length, rowColour.domain.length);

    if (rowColour.range.length > 0 && rowColour.domain.length > 0) {
      //issue : 3 & 4
      //TODO : CHECK IF THE SAME ROW!!!!
      console.log(
        key,
        ': Cycles range at row:',
        rowColour.range.join(', '),
        'Cycles domain at row:',
        rowColour.domain.join(', ')
      );
      // const range = rowColour.range.map(err => 'Cycles range at row:' + err);

      const range = rowColour.range.reduce((obj, item) => {
        obj[item] = 'Cycles range at row:' + item;
        return obj;
      }, {});
      const domain = rowColour.domain.reduce((obj, item) => {
        obj[item] = 'Cycles domain at row:' + item;
        return obj;
      }, {});
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
      console.log(key, ': Duplicated domains at row: ', rowColour.domain.join(', '));

      const domain = rowColour.domain.reduce((obj, item) => {
        obj[item] = 'Duplicated domains at row:' + item;
        return obj;
      }, {});
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
      console.log(key, ': Duplicated ranges at row: ', rowColour.range.join(', '));
      const range = rowColour.range.reduce((obj, item) => {
        obj[item] = 'Duplicated ranges at row:' + item;
        return obj;
      }, {});
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
