import {
  SAVE_PRODUCT_BY_ID_SUCCESS,
  PRODUCT_REMOVE_SUCCESS,
  ADD_NEW_PRODUCT_SUCCESS
} from './ProductActionType';
import { fetchProducts } from './ProductActions';

const actionTypes = [SAVE_PRODUCT_BY_ID_SUCCESS, PRODUCT_REMOVE_SUCCESS, ADD_NEW_PRODUCT_SUCCESS];
const ProductMiddleware = store => next => action => {
  if (actionTypes.includes(action.type)) {
    store.dispatch(fetchProducts());
  }
  next(action);
};
export default ProductMiddleware;
