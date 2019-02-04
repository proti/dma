import axios from 'axios';
import Action from '../../common/Action';
import {
  GET_COLOURS_REQUEST,
  GET_COLOURS_SUCCESS,
  GET_COLOURS_ERROR,
  SAVE_COLOURS_REQUEST,
  SAVE_COLOURS_SUCCESS,
  SAVE_COLOURS_ERROR
} from './ColoursDictActionType';

const API_GET_DATASET = '/api/colours';

const getColours = () =>
  async dispatch => {
    dispatch(Action(GET_COLOURS_REQUEST));
    try {
      const response = await axios.get(`${API_GET_DATASET}`);
      return dispatch(Action(GET_COLOURS_SUCCESS, response.data));
    } catch (error) {
      return dispatch(Action(GET_COLOURS_ERROR, error));
    }
  };

const saveColours = (data) =>
  async dispatch => {
    dispatch(Action(SAVE_COLOURS_REQUEST));
    try {
      const response = await axios.post(`${API_GET_DATASET}`, data);
      return dispatch(Action(SAVE_COLOURS_SUCCESS, response.data));
    } catch (error) {
      return dispatch(Action(SAVE_COLOURS_ERROR, error));
    }
  };

export {
  getColours,
  saveColours
};
