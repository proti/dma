import React from 'react';
import PropTypes from 'prop-types';

const LabelButton = ({ id, onClick, children }) => {
  const onClickHandler = event => {
    if (onClick) {
      event.stopPropagation();
      onClick(id);
    }
  };
  return (
    <button type="button" onClick={onClickHandler}>
      {children}
    </button>
  );
};
const { oneOfType, number, string, func, arrayOf, node } = PropTypes;
LabelButton.propTypes = {
  id: oneOfType([number, string]),
  onClick: func,
  children: oneOfType([arrayOf(node), node])
};
LabelButton.defaultProps = {
  id: 0,
  onClick: null,
  children: null
};

export default LabelButton;
