import axios from 'axios';
import {
  DICTS_REQUEST_SUCCESS,
  DICTS_REQUEST_ERROR,
  DICTS_REQUEST,
  DICT_REMOVE_REQUEST,
  DICT_REMOVE_SUCCESS,
  DICT_REMOVE_ERROR,
  GET_DICT_BY_ID_REQUEST,
  GET_DICT_BY_ID_SUCCESS,
  GET_DICT_BY_ID_ERROR,
  ADD_NEW_DICT_REQUEST,
  ADD_NEW_DICT_SUCCESS,
  ADD_NEW_DICT_ERROR,
  SAVE_DICT_BY_ID_REQUEST,
  SAVE_DICT_BY_ID_SUCCESS,
  SAVE_DICT_BY_ID_ERROR
} from './DictActionType';
import Action from '../../../common/Action';

const API_PRODUCT = '/api/product';

const fetchDicts = () => async dispatch => {
  dispatch(Action(DICTS_REQUEST));
  try {
    const response = await axios.get(`${API_PRODUCT}/all`);
    return dispatch(Action(DICTS_REQUEST_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(DICTS_REQUEST_ERROR, error));
  }
};

const removeDict = dictId => async dispatch => {
  dispatch(Action(DICT_REMOVE_REQUEST));
  try {
    const response = await axios.delete(`${API_PRODUCT}/${dictId}`);
    return dispatch(Action(DICT_REMOVE_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(DICT_REMOVE_ERROR, error));
  }
};

const getDictById = dictId => async dispatch => {
  dispatch(Action(GET_DICT_BY_ID_REQUEST));
  try {
    const response = await axios.get(`${API_PRODUCT}/${dictId}`);
    return dispatch(Action(GET_DICT_BY_ID_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(GET_DICT_BY_ID_ERROR, error));
  }
};

const addNewDict = data => async dispatch => {
  dispatch(Action(ADD_NEW_DICT_REQUEST));
  try {
    const response = await axios.post(`${API_PRODUCT}`, data);
    return dispatch(Action(ADD_NEW_DICT_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(ADD_NEW_DICT_ERROR, error));
  }
};

const saveDictById = data => async dispatch => {
  dispatch(Action(SAVE_DICT_BY_ID_REQUEST));
  try {
    const response = await axios.post(`${API_PRODUCT}/${data.id}`, data);
    return dispatch(Action(SAVE_DICT_BY_ID_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(SAVE_DICT_BY_ID_ERROR, error));
  }
};
export { fetchDicts, removeDict, getDictById, addNewDict, saveDictById };
