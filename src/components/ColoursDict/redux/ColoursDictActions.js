import axios from 'axios';
import Action from '../../../common/Action';
import {
  GET_COLOURS_REQUEST,
  GET_COLOURS_SUCCESS,
  GET_COLOURS_ERROR,
  SAVE_COLOURS_REQUEST,
  SAVE_COLOURS_SUCCESS,
  SAVE_COLOURS_ERROR,
  ADD_COLOUR_REQUEST,
  ADD_COLOUR_SUCCESS,
  ADD_COLOUR_ERROR
} from './ColoursDictActionType';

const API_COLOUR = '/api/colour';

const getColours = () => async dispatch => {
  dispatch(Action(GET_COLOURS_REQUEST));
  try {
    const response = await axios.get(`${API_COLOUR}/all`);
    return dispatch(Action(GET_COLOURS_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(GET_COLOURS_ERROR, error));
  }
};

const saveColours = data => async dispatch => {
  dispatch(Action(SAVE_COLOURS_REQUEST));
  try {
    const response = await axios.post(`${API_COLOUR}/all`, data);
    return dispatch(Action(SAVE_COLOURS_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(SAVE_COLOURS_ERROR, error));
  }
};

const addColour = data => async dispatch => {
  dispatch(Action(ADD_COLOUR_REQUEST));
  try {
    const response = await axios.post(`${API_COLOUR}`, data);
    return dispatch(Action(ADD_COLOUR_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(ADD_COLOUR_ERROR, error));
  }
};
export { getColours, saveColours, addColour };
