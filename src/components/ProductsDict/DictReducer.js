import {
  DICT_REMOVE_REQUEST,
  DICT_REMOVE_ERROR,
  DICT_REMOVE_SUCCESS,
  GET_DICT_BY_ID_REQUEST,
  GET_DICT_BY_ID_ERROR,
  GET_DICT_BY_ID_SUCCESS,
  ADD_NEW_DICT_REQUEST,
  ADD_NEW_DICT_ERROR,
  ADD_NEW_DICT_SUCCESS,
  SAVE_DICT_BY_ID_REQUEST,
  SAVE_DICT_BY_ID_ERROR,
  SAVE_DICT_BY_ID_SUCCESS
} from './DictActionType';

const initialState = {
  data: null,
  status: null
};

export const DICT_REDUCER = 'DICT_REDUCER';

const dictReducer = (state = initialState, action) => {
  const newState = {
    ...state,
    data: null,
    status: action.type
  };

  switch (action.type) {
    case DICT_REMOVE_REQUEST:
    case GET_DICT_BY_ID_REQUEST:
    case ADD_NEW_DICT_REQUEST:
    case SAVE_DICT_BY_ID_REQUEST:
      return newState;
    case DICT_REMOVE_ERROR:
    case GET_DICT_BY_ID_ERROR:
    case ADD_NEW_DICT_ERROR:
    case SAVE_DICT_BY_ID_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case DICT_REMOVE_SUCCESS:
    case ADD_NEW_DICT_SUCCESS:
    case SAVE_DICT_BY_ID_SUCCESS:
      return {
        ...newState,
        status: action.payload
      };
    case GET_DICT_BY_ID_SUCCESS:
      return {
        ...newState,
        data: action.payload
      };
    default:
      return state;
  }
};

export default dictReducer;
