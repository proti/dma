import {
  GET_COLOURS_REQUEST,
  GET_COLOURS_ERROR,
  GET_COLOURS_SUCCESS,
  SAVE_COLOURS_REQUEST,
  SAVE_COLOURS_SUCCESS,
  SAVE_COLOURS_ERROR,
  ADD_COLOUR_REQUEST,
  ADD_COLOUR_ERROR,
  ADD_COLOUR_SUCCESS
} from './ColoursDictActionType';

const initialState = {
  data: null,
  status: null
};

export const COLOURS_DICT_REDUCER = 'COLOURS_DICT_REDUCER';

const coloursDictReducer = (state = initialState, action) => {
  const newState = {
    ...state,

    status: action.type
  };

  switch (action.type) {
    case GET_COLOURS_REQUEST:
    case SAVE_COLOURS_REQUEST:
    case ADD_COLOUR_REQUEST:
      return newState;
    case GET_COLOURS_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case SAVE_COLOURS_ERROR:
    case ADD_COLOUR_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case SAVE_COLOURS_SUCCESS:
    case ADD_COLOUR_SUCCESS:
      return {
        ...newState,
        status: action.payload
      };
    case GET_COLOURS_SUCCESS:
      return {
        ...newState,
        data: action.payload
      };
    default:
      return state;
  }
};

export default coloursDictReducer;
