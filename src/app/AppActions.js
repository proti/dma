import axios from 'axios';
import {
  DATASET_REQUEST,
  DATASET_REQUEST_SUCCESS,
  DATASET_REQUEST_ERROR
} from './AppActionType';

const getAction = (actionType, payload) => {
  return {
    type: actionType,
    payload
  };
};

const API_GET_DATASET = '/api/dataset';

const fetchDataset = () =>
  async dispatch => {
    dispatch(getAction(DATASET_REQUEST));
    try {
      const response = await axios.get(`${API_GET_DATASET}`);
      return dispatch(getAction(DATASET_REQUEST_SUCCESS, response.data));
    } catch (error) {
      return dispatch(getAction(DATASET_REQUEST_ERROR, error));
    }
  };

export default fetchDataset;
