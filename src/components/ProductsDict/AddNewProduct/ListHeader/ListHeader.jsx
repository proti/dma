import React from 'react';
import PropTypes from 'prop-types';
import style from './listHeader.scss';
import { PRODUCT, COLOUR, PRICE } from '../../ColumnName';

const ListHeader = () => {
  return (
    <div className={style.listHeader}>
      <span>{PRODUCT}</span>
      <span>{COLOUR}</span>
      <span>{PRICE}</span>
    </div>
  );
};
const {} = PropTypes;
ListHeader.propTypes = {};
ListHeader.defaultProps = {};

export default ListHeader;
