import React from 'react';
import style from './listItem.scss';
import ListItemPropTypes from './ListItemPropTypes';
import { EDIT, REMOVE } from './ListItemAction';

const ListItem = ({ id, label, colour, price, onClick }) => {

  const onEditClickHandler = () => onClick({ id, action: EDIT });
  const onRemoveClickHandler = () => onClick({ id, action: REMOVE });

  return (
    <tr className={style.listItemRow}>
      <td>{label}</td>
      <td>{colour}</td>
      <td>{price}</td>
      <td><button type="button" onClick={onEditClickHandler}>edit</button></td>
      <td><button type="button" onClick={onRemoveClickHandler}>remove</button></td>
    </tr>
  );
};

ListItem.propTypes = ListItemPropTypes;
ListItem.defaultProps = {
  id: 0,
  label: null,
  colour: null,
  price: null,
  onClick: () => { }
};

export default ListItem;
