import {
  APP_INIT,
  DATASET_REQUEST,
  DATASET_REQUEST_ERROR,
  DATASET_REQUEST_SUCCESS
} from './AppActionType';

const initialState = {
  data: null,
  status: null
};

export const APP_REDUCER = 'AppReducer';

const appReducer = (state = initialState, action) => {

  const newState = {
    ...state,
    status: action.type
  };

  switch (action.type) {
    case APP_INIT:
    case DATASET_REQUEST:
      return newState;
    case DATASET_REQUEST_ERROR:
      return {
        ...newState,
        error: action.payload
      };
    case DATASET_REQUEST_SUCCESS:
      return {
        ...newState,
        data: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;
