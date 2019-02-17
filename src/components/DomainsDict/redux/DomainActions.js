import axios from 'axios';
import {
  GET_DOMAINS_REQUEST,
  GET_DOMAINS_SUCCESS,
  GET_DOMAINS_ERROR,
  GET_DOMAIN_BY_ID_REQUEST,
  GET_DOMAIN_BY_ID_SUCCESS,
  GET_DOMAIN_BY_ID_ERROR,
  ADD_DOMAIN_REQUEST,
  ADD_DOMAIN_SUCCESS,
  ADD_DOMAIN_ERROR,
  REMOVE_DOMAIN_REQUEST,
  REMOVE_DOMAIN_SUCCESS,
  REMOVE_DOMAIN_ERROR
} from './DomainActionType';
import Action from '../../../common/Action';

const API_GET_DOMAINS = '/api/domains';
const API_DOMAIN = '/api/domain';

const getDomains = () => async dispatch => {
  dispatch(Action(GET_DOMAINS_REQUEST));
  try {
    const response = await axios.get(`${API_GET_DOMAINS}`);
    return dispatch(Action(GET_DOMAINS_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(GET_DOMAINS_ERROR, error));
  }
};

const removeDomain = domainId => async dispatch => {
  dispatch(Action(REMOVE_DOMAIN_REQUEST));
  try {
    const response = await axios.delete(`${API_DOMAIN}/${domainId}`);
    return dispatch(Action(REMOVE_DOMAIN_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(REMOVE_DOMAIN_ERROR, error));
  }
};

const getDomainById = domainId => async dispatch => {
  dispatch(Action(GET_DOMAIN_BY_ID_REQUEST));
  try {
    const response = await axios.get(`${API_DOMAIN}/${domainId}`);
    return dispatch(Action(GET_DOMAIN_BY_ID_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(GET_DOMAIN_BY_ID_ERROR, error));
  }
};

const addNewDomain = data => async dispatch => {
  dispatch(Action(ADD_DOMAIN_REQUEST));
  try {
    const response = await axios.post(`${API_DOMAIN}`, data);
    return dispatch(Action(ADD_DOMAIN_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(ADD_DOMAIN_ERROR, error));
  }
};

const saveDomainById = data => async dispatch => {
  dispatch(Action(ADD_DOMAIN_REQUEST));
  try {
    const response = await axios.post(`${API_DOMAIN}/${data.id}`, data);
    return dispatch(Action(ADD_DOMAIN_SUCCESS, response.data));
  } catch (error) {
    return dispatch(Action(ADD_DOMAIN_ERROR, error));
  }
};
export { getDomains, removeDomain, getDomainById, addNewDomain, saveDomainById };
