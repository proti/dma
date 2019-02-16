import {
  APP_INIT,
  DICTS_REQUEST,
  DICTS_REQUEST_ERROR,
  DICTS_REQUEST_SUCCESS
} from './AppActionType';

const initialState = {
  data: null,
  status: null
};

export const APP_REDUCER = 'APP_REDUCER';

const appReducer = (state = initialState, action) => {
  const newState = {
    ...state,
    status: action.type
  };

  switch (action.type) {
    case APP_INIT:
    case DICTS_REQUEST:
      return newState;
    case DICTS_REQUEST_ERROR:
      return {
        ...newState,
        error: action.payload
      };
    case DICTS_REQUEST_SUCCESS:
      return {
        ...newState,
        data: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;
