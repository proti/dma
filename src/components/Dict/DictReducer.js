import {
  DICT_REMOVE_REQUEST,
  DICT_REMOVE_ERROR,
  DICT_REMOVE_SUCCESS
} from './DictActionType';

const initialState = {
  data: null,
  status: null
};

export const DICT_REDUCER = 'DictReducer';

const dictReducer = (state = initialState, action) => {

  const newState = {
    ...state,
    status: action.type
  };

  switch (action.type) {
    case DICT_REMOVE_REQUEST:
      return newState;
    case DICT_REMOVE_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case DICT_REMOVE_SUCCESS:
      return {
        ...newState,
        data: action.payload
      };
    default:
      return state;
  }
};

export default dictReducer;
