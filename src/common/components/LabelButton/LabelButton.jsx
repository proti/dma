import React from 'react';
import PropTypes from 'prop-types';
import style from './labelButton.scss';

const LabelButton = ({ id, onClick, children, disabled }) => {
  const onClickHandler = event => {
    if (onClick) {
      event.stopPropagation();
      onClick(id);
    }
  };
  return (
    <button
      type="button"
      onClick={onClickHandler}
      className={style.labelButton}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
const { oneOfType, number, string, func, arrayOf, node, bool } = PropTypes;
LabelButton.propTypes = {
  id: oneOfType([number, string]),
  onClick: func,
  children: oneOfType([arrayOf(node), node]),
  disabled: bool
};
LabelButton.defaultProps = {
  id: 0,
  onClick: null,
  children: null,
  disabled: false
};

export default LabelButton;
