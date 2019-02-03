import React from 'react';
import style from './listItem.scss';
import ListItemPropTypes from './ListItemPropTypes';
import { EDIT, REMOVE, CHANGE } from './ListItemAction';
import EditableItem from '../../EditableItem/EditableItem';
import { PRODUCT, COLOUR, PRICE } from '../../../ColumnName';

const ListItem = ({ id, label, colour, price, onClick, onChange, isEditable }) => {

  const onEditClickHandler = () => onClick({ id, action: EDIT });
  const onRemoveClickHandler = () => onClick({ id, action: REMOVE });
  const onInputChangeHandler = input => onChange({ id, action: CHANGE, value: input.value, inputId: input.id });

  return (
    <tr className={style.listItemRow}>
      <td><EditableItem id={PRODUCT} disabled={!isEditable} defaultValue={label} onChange={onInputChangeHandler} /></td>
      <td><EditableItem id={COLOUR} disabled={!isEditable} defaultValue={colour} onChange={onInputChangeHandler} /></td>
      <td><EditableItem id={PRICE} disabled={!isEditable} defaultValue={price} onChange={onInputChangeHandler} /></td>
      <td>{!isEditable && <button type="button" onClick={onEditClickHandler}>edit</button>}</td>
      <td><button type="button" onClick={onRemoveClickHandler}>remove</button></td>
    </tr>
  );
};

ListItem.propTypes = ListItemPropTypes;
ListItem.defaultProps = {
  id: 0,
  label: '',
  colour: '',
  price: '',
  isEditable: false,
  onClick: () => { },
  onChange: () => { }
};

export default ListItem;
