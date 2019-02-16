import React from 'react';
import PropTypes from 'prop-types';
//import style from './listItem.scss';
import LabelButton from '../../LabelButton/LabelButton';

const ListItem = ({ id, onClick, onRemove, children }) => {
  const onRemoveClickHandler = () => onRemove(id);
  const onClickHandler = () => onClick(id);
  return (
    <li>
      <LabelButton onClick={onClickHandler}>{children}</LabelButton>
      <LabelButton onClick={onRemoveClickHandler}>Remove</LabelButton>
    </li>
  );
};

const { oneOfType, string, number, node, arrayOf, func } = PropTypes;
ListItem.propTypes = {
  id: oneOfType([string, number]).isRequired,
  children: oneOfType([node, arrayOf(node)]),
  onClick: func,
  onRemove: func
};
ListItem.defaultProps = {
  children: null,
  onClick: () => {},
  onRemove: () => {}
};

export default ListItem;
