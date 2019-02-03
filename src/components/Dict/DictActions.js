import axios from 'axios';
import {
  DICT_REMOVE_REQUEST,
  DICT_REMOVE_SUCCESS,
  DICT_REMOVE_ERROR
} from './DictActionType';

const getAction = (actionType, payload) => {
  return {
    type: actionType,
    payload
  };
};

const API_GET_DATASET = '/api/dict';

const removeDict = (dictId) =>
  async dispatch => {
    dispatch(getAction(DICT_REMOVE_REQUEST));
    try {
      const response = await axios.delete(`${API_GET_DATASET}/${dictId}`);
      return dispatch(getAction(DICT_REMOVE_SUCCESS, response.data));
    } catch (error) {
      return dispatch(getAction(DICT_REMOVE_ERROR, error));
    }
  };

export default removeDict;
