import axios from 'axios';
import {
  PRODUCTS_REQUEST_SUCCESS,
  PRODUCTS_REQUEST_ERROR,
  PRODUCTS_REQUEST,
  PRODUCT_REMOVE_REQUEST,
  PRODUCT_REMOVE_SUCCESS,
  PRODUCT_REMOVE_ERROR,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  ADD_NEW_PRODUCT_REQUEST,
  ADD_NEW_PRODUCT_SUCCESS,
  ADD_NEW_PRODUCT_ERROR,
  SAVE_PRODUCT_BY_ID_REQUEST,
  SAVE_PRODUCT_BY_ID_SUCCESS,
  SAVE_PRODUCT_BY_ID_ERROR
} from './ProductActionType';
import Action from '../../../common/Action';

const API_PRODUCT = '/api/product';

const fetchProducts = () => async dispatch => {
  dispatch(Action(PRODUCTS_REQUEST));
  try {
    const response = await axios.get(`${API_PRODUCT}/all`);
    return dispatch(Action(PRODUCTS_REQUEST_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(PRODUCTS_REQUEST_ERROR, error));
  }
};

const removeDict = dictId => async dispatch => {
  dispatch(Action(PRODUCT_REMOVE_REQUEST));
  try {
    const response = await axios.delete(`${API_PRODUCT}/${dictId}`);
    return dispatch(Action(PRODUCT_REMOVE_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(PRODUCT_REMOVE_ERROR, error));
  }
};

const getDictById = dictId => async dispatch => {
  dispatch(Action(GET_PRODUCT_BY_ID_REQUEST));
  try {
    const response = await axios.get(`${API_PRODUCT}/${dictId}`);
    return dispatch(Action(GET_PRODUCT_BY_ID_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(GET_PRODUCT_BY_ID_ERROR, error));
  }
};

const addNewDict = data => async dispatch => {
  dispatch(Action(ADD_NEW_PRODUCT_REQUEST));
  try {
    const response = await axios.post(`${API_PRODUCT}`, data);
    return dispatch(Action(ADD_NEW_PRODUCT_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(ADD_NEW_PRODUCT_ERROR, error));
  }
};

const saveDictById = data => async dispatch => {
  dispatch(Action(SAVE_PRODUCT_BY_ID_REQUEST));
  try {
    const response = await axios.post(`${API_PRODUCT}/${data.id}`, data);
    return dispatch(Action(SAVE_PRODUCT_BY_ID_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(SAVE_PRODUCT_BY_ID_ERROR, error));
  }
};
export { fetchProducts, removeDict, getDictById, addNewDict, saveDictById };
