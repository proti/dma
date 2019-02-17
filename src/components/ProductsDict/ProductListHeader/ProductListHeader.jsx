import React from 'react';
import PropTypes from 'prop-types';
import style from './productlistHeader.scss';
import { PRODUCT, COLOUR, PRICE } from '../ProductColumns';

const ProductListHeader = () => {
  return (
    <div className={style.listHeader}>
      <span>{PRODUCT}</span>
      <span>{COLOUR}</span>
      <span>{PRICE}</span>
    </div>
  );
};
const {} = PropTypes;
ProductListHeader.propTypes = {};
ProductListHeader.defaultProps = {};

export default ProductListHeader;
