import axios from 'axios';
import { DICTS_REQUEST, DICTS_REQUEST_SUCCESS, DICTS_REQUEST_ERROR } from './AppActionType';
import Action from '../common/Action';

const API_GET_DICTS = '/api/dicts';

const fetchDataset = () => async dispatch => {
  dispatch(Action(DICTS_REQUEST));
  try {
    const response = await axios.get(`${API_GET_DICTS}`);
    return dispatch(Action(DICTS_REQUEST_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(DICTS_REQUEST_ERROR, error));
  }
};

export default fetchDataset;
