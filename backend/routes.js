const API_PREFIX = '/api';

const GET_DICTS = `${API_PREFIX}/dicts`;
const GET_DICT_BY_ID = `${API_PREFIX}/dict/:id`;
const ADD_DICTIONARY = `${API_PREFIX}/dict`;
const REMOVE_DICTIONARY = `${API_PREFIX}/dict/:id`;
const EDIT_DICTIONARY = `${API_PREFIX}/dict/:id`;

module.exports = {
  GET_DICTS,
  GET_DICT_BY_ID,
  ADD_DICTIONARY,
  REMOVE_DICTIONARY,
  EDIT_DICTIONARY
};
