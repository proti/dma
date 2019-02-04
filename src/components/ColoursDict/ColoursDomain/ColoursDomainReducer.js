import {
  GET_COLOURS_DOMAINS_REQUEST,
  GET_COLOURS_DOMAINS_SUCCESS,
  GET_COLOURS_DOMAINS_ERROR,
  ADD_COLOURS_DOMAIN_REQUEST,
  ADD_COLOURS_DOMAIN_SUCCESS,
  ADD_COLOURS_DOMAIN_ERROR,
  REMOVE_COLOURS_DOMAIN_REQUEST,
  REMOVE_COLOURS_DOMAIN_ERROR,
  REMOVE_COLOURS_DOMAIN_SUCCESS,
  GET_COLOURS_DOMAIN_BY_ID_REQUEST,
  GET_COLOURS_DOMAIN_BY_ID_SUCCESS,
  GET_COLOURS_DOMAIN_BY_ID_ERROR
} from './ColoursDomainActionType';

const initialState = {
  data: null,
  domainList: null,
  status: null
};

export const COLOURS_DOMAIN_REDUCER = 'COLOURS_DOMAIN_REDUCER';

const coloursDomainReducer = (state = initialState, action) => {

  const newState = {
    ...state,
    data: null,
    status: action.type
  };

  switch (action.type) {
    case GET_COLOURS_DOMAINS_REQUEST:
    case REMOVE_COLOURS_DOMAIN_REQUEST:
    case GET_COLOURS_DOMAIN_BY_ID_REQUEST:
    case ADD_COLOURS_DOMAIN_REQUEST:
      return newState;
    case GET_COLOURS_DOMAINS_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case REMOVE_COLOURS_DOMAIN_ERROR:
    case GET_COLOURS_DOMAIN_BY_ID_ERROR:
    case ADD_COLOURS_DOMAIN_ERROR:
      return {
        ...newState,
        error: action.payload.response.data
      };
    case REMOVE_COLOURS_DOMAIN_SUCCESS:
    case ADD_COLOURS_DOMAIN_SUCCESS:
      return {
        ...newState,
        status: action.payload
      };
    case GET_COLOURS_DOMAIN_BY_ID_SUCCESS:
      return {
        ...newState,
        data: action.payload
      };
    case GET_COLOURS_DOMAINS_SUCCESS:
      return {
        ...newState,
        domainList: action.payload
      };
    default:
      return state;
  }
};

export default coloursDomainReducer;
