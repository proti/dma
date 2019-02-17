import React from 'react';
import style from './productlistHeader.scss';
import { PRODUCT, COLOUR, PRICE } from '../ProductColumns';

const ProductListHeader = () => {
  return (
    <div className={style.productListHeader}>
      <div>{PRODUCT}</div>
      <div>{COLOUR}</div>
      <div>{PRICE}</div>
    </div>
  );
};

export default ProductListHeader;
