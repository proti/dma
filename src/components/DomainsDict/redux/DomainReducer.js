import {
  GET_DOMAINS_REQUEST,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_ERROR,
  ADD_DOMAIN_REQUEST,
  ADD_DOMAIN_SUCCESS,
  ADD_DOMAIN_ERROR,
  REMOVE_DOMAIN_REQUEST,
  REMOVE_DOMAIN_ERROR,
  REMOVE_DOMAIN_SUCCESS,
  GET_DOMAIN_BY_ID_REQUEST,
  GET_DOMAIN_BY_ID_SUCCESS,
  GET_DOMAIN_BY_ID_ERROR,
  SAVE_DOMAIN_BY_ID_REQUEST,
  SAVE_DOMAIN_BY_ID_ERROR,
  SAVE_DOMAIN_BY_ID_SUCCESS
} from './DomainActionType';

const initialState = {
  data: null,
  domainList: null,
  status: null
};

export const DOMAIN_REDUCER = 'DOMAIN_REDUCER';

const domainReducer = (state = initialState, action) => {
  const newState = {
    ...state,
    data: null,
    status: action.type
  };

  switch (action.type) {
    case GET_DOMAINS_REQUEST:
    case REMOVE_DOMAIN_REQUEST:
    case GET_DOMAIN_BY_ID_REQUEST:
    case ADD_DOMAIN_REQUEST:
    case SAVE_DOMAIN_BY_ID_REQUEST:
      return newState;
    case GET_DOMAINS_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case REMOVE_DOMAIN_ERROR:
    case GET_DOMAIN_BY_ID_ERROR:
    case ADD_DOMAIN_ERROR:
    case SAVE_DOMAIN_BY_ID_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case REMOVE_DOMAIN_SUCCESS:
    case ADD_DOMAIN_SUCCESS:
    case SAVE_DOMAIN_BY_ID_SUCCESS:
      return {
        ...newState,
        status: action.payload
      };
    case GET_DOMAIN_BY_ID_SUCCESS:
      return {
        ...newState,
        data: action.payload
      };
    case GET_DOMAINS_SUCCESS:
      return {
        ...newState,
        domainList: action.payload
      };
    default:
      return state;
  }
};

export default domainReducer;
