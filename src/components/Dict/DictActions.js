import axios from 'axios';
import {
  DICT_REMOVE_REQUEST,
  DICT_REMOVE_SUCCESS,
  DICT_REMOVE_ERROR,
  GET_DICT_BY_ID_REQUEST,
  GET_DICT_BY_ID_SUCCESS,
  GET_DICT_BY_ID_ERROR,
  ADD_NEW_DICT_REQUEST,
  ADD_NEW_DICT_SUCCESS,
  ADD_NEW_DICT_ERROR
} from './DictActionType';
import Action from '../../common/Action';

const API_GET_DATASET = '/api/dict';

const removeDict = dictId =>
  async dispatch => {
    dispatch(Action(DICT_REMOVE_REQUEST));
    try {
      const response = await axios.delete(`${API_GET_DATASET}/${dictId}`);
      return dispatch(Action(DICT_REMOVE_SUCCESS, response.data));
    } catch (error) {
      return dispatch(Action(DICT_REMOVE_ERROR, error));
    }
  };

const getDictById = dictId =>
  async dispatch => {
    dispatch(Action(GET_DICT_BY_ID_REQUEST));
    try {
      const response = await axios.get(`${API_GET_DATASET}/${dictId}`);
      return dispatch(Action(GET_DICT_BY_ID_SUCCESS, response.data));
    } catch (error) {
      return dispatch(Action(GET_DICT_BY_ID_ERROR, error));
    }
  };

const addNewDict = data =>
  async dispatch => {
    dispatch(Action(ADD_NEW_DICT_REQUEST));
    try {
      const response = await axios.post(`${API_GET_DATASET}`, data);
      return dispatch(Action(ADD_NEW_DICT_SUCCESS, response.data));
    } catch (error) {
      return dispatch(Action(ADD_NEW_DICT_ERROR, error));
    }
  };

export {
  removeDict,
  getDictById,
  addNewDict
};
