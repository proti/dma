import React from 'react';
import PropTypes from 'prop-types';

const DropDown = ({ id, items, onChange }) => {

  const onChangeHandler = event => {
    const value = event.target.value;
    onChange({ id, value });
  };

  const renderOptions = () => {
    if (items) {
      return items.map(item => {
        const itemId = `dropDown${id}_${item.id}`;
        const value = item.value;
        return <option key={itemId} value={value}>{value}</option>;
      });
    }
    return null;
  };

  return <select name={id} onChange={onChangeHandler}>{renderOptions()}</select>;
};

const { arrayOf, string, shape, number, func } = PropTypes;
DropDown.propTypes = {
  id: string,
  items: arrayOf(shape({ id: number, value: string })).isRequired,
  onChange: func
};
DropDown.defaultProps = {
  id: '',
  onChange: () => { }
};

export default DropDown;
