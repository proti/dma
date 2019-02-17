import axios from 'axios';
import {
  GET_COLOURS_DOMAINS_REQUEST,
  GET_COLOURS_DOMAINS_SUCCESS,
  GET_COLOURS_DOMAINS_ERROR,
  GET_COLOURS_DOMAIN_BY_ID_REQUEST,
  GET_COLOURS_DOMAIN_BY_ID_SUCCESS,
  GET_COLOURS_DOMAIN_BY_ID_ERROR,
  ADD_COLOURS_DOMAIN_REQUEST,
  ADD_COLOURS_DOMAIN_SUCCESS,
  ADD_COLOURS_DOMAIN_ERROR,
  REMOVE_COLOURS_DOMAIN_REQUEST,
  REMOVE_COLOURS_DOMAIN_SUCCESS,
  REMOVE_COLOURS_DOMAIN_ERROR
} from './ColoursDomainActionType';
import Action from '../../../common/Action';

const API_GET_DOMAINS = '/api/colours/domains';
const API_DOMAIN = '/api/colours/domain';

const getDomains = () => async dispatch => {
  dispatch(Action(GET_COLOURS_DOMAINS_REQUEST));
  try {
    const response = await axios.get(`${API_GET_DOMAINS}`);
    return dispatch(Action(GET_COLOURS_DOMAINS_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(GET_COLOURS_DOMAINS_ERROR, error));
  }
};

const removeDomain = domainId => async dispatch => {
  dispatch(Action(REMOVE_COLOURS_DOMAIN_REQUEST));
  try {
    const response = await axios.delete(`${API_DOMAIN}/${domainId}`);
    return dispatch(Action(REMOVE_COLOURS_DOMAIN_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(REMOVE_COLOURS_DOMAIN_ERROR, error));
  }
};

const getDomainById = domainId => async dispatch => {
  dispatch(Action(GET_COLOURS_DOMAIN_BY_ID_REQUEST));
  try {
    const response = await axios.get(`${API_DOMAIN}/${domainId}`);
    return dispatch(Action(GET_COLOURS_DOMAIN_BY_ID_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(GET_COLOURS_DOMAIN_BY_ID_ERROR, error));
  }
};

const addNewDomain = data => async dispatch => {
  dispatch(Action(ADD_COLOURS_DOMAIN_REQUEST));
  try {
    const response = await axios.post(`${API_DOMAIN}`, data);
    return dispatch(Action(ADD_COLOURS_DOMAIN_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(ADD_COLOURS_DOMAIN_ERROR, error));
  }
};

export { getDomains, removeDomain, getDomainById, addNewDomain };
