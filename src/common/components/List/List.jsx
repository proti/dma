import React from 'react';
import PropTypes from 'prop-types';
import style from '../../../scss/_list.scss';
import ListItem from './ListItem/ListItem';
import ListItemPropTypes from './ListItem/ListItemPropTypes';

const List = ({ items, onItemAction }) => {
  const onItemClickHandler = (listItemVo) => onItemAction(listItemVo);
  return (
    <table className={style.list}>
      <tbody>
        {items.map(item => {
          const { id, product, colour, price } = item;
          return <ListItem key={id} id={id} label={product} colour={colour} price={price} onClick={onItemClickHandler} />;
        })}
      </tbody>
    </table>
  );
};

const { arrayOf, shape, func } = PropTypes;
List.propTypes = {
  items: arrayOf(shape(ListItemPropTypes)),
  onItemAction: func
};

List.defaultProps = {
  items: null,
  onItemAction: () => { }
};

export default List;
