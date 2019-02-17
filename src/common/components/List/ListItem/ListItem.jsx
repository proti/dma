import React from 'react';
import PropTypes from 'prop-types';
import style from './listItem.scss';
import LabelButton from '../../LabelButton/LabelButton';

const ListItem = ({ id, onClick, onRemove, children, isEditable }) => {
  const onRemoveClickHandler = () => onRemove(id);
  const onClickHandler = () => onClick(id);
  const isLabel = typeof children === 'string';

  return (
    <li className={style.listItem}>
      {isLabel ? (
        <div
          className={style.label}
          onClick={onClickHandler}
          onKeyPress={onClickHandler}
          role="button"
          tabIndex="0"
        >
          {children}
        </div>
      ) : (
        children
      )}
      <LabelButton onClick={onRemoveClickHandler} disabled={!isEditable}>
        Remove
      </LabelButton>
    </li>
  );
};

const { oneOfType, string, number, node, arrayOf, func, bool } = PropTypes;
ListItem.propTypes = {
  id: oneOfType([string, number]).isRequired,
  children: oneOfType([node, arrayOf(node)]),
  onClick: func,
  onRemove: func,
  isEditable: bool
};
ListItem.defaultProps = {
  children: null,
  onClick: () => {},
  onRemove: () => {},
  isEditable: false
};

export default ListItem;
