import {
  PRODUCT_REMOVE_REQUEST,
  PRODUCT_REMOVE_ERROR,
  PRODUCT_REMOVE_SUCCESS,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_ERROR,
  GET_PRODUCT_BY_ID_SUCCESS,
  ADD_NEW_PRODUCT_REQUEST,
  ADD_NEW_PRODUCT_ERROR,
  ADD_NEW_PRODUCT_SUCCESS,
  SAVE_PRODUCT_BY_ID_REQUEST,
  SAVE_PRODUCT_BY_ID_ERROR,
  SAVE_PRODUCT_BY_ID_SUCCESS,
  PRODUCTS_REQUEST,
  PRODUCTS_REQUEST_ERROR,
  PRODUCTS_REQUEST_SUCCESS
} from './ProductActionType';

const initialState = {
  data: null,
  dictDetails: null,
  status: null
};

export const PRODUCT_REDUCER = 'PRODUCT_REDUCER';

const productReducer = (state = initialState, action) => {
  const newState = {
    ...state,
    data: null,
    status: action.type
  };

  switch (action.type) {
    case PRODUCTS_REQUEST:
    case PRODUCT_REMOVE_REQUEST:
    case GET_PRODUCT_BY_ID_REQUEST:
    case ADD_NEW_PRODUCT_REQUEST:
    case SAVE_PRODUCT_BY_ID_REQUEST:
      return newState;
    case PRODUCTS_REQUEST_ERROR:
    case PRODUCT_REMOVE_ERROR:
    case GET_PRODUCT_BY_ID_ERROR:
    case ADD_NEW_PRODUCT_ERROR:
    case SAVE_PRODUCT_BY_ID_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case PRODUCT_REMOVE_SUCCESS:
    case ADD_NEW_PRODUCT_SUCCESS:
    case SAVE_PRODUCT_BY_ID_SUCCESS:
      return {
        ...newState,
        status: action.payload
      };
    case PRODUCTS_REQUEST_SUCCESS:
      return {
        ...newState,
        data: action.payload
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...newState,
        dictDetails: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
