const API_PREFIX = '/api';

const GET_DATASET = `${API_PREFIX}/dataset`;
const ADD_DICTIONARY = `${API_PREFIX}/add-dict`;
const REMOVE_DICTIONARY = `${API_PREFIX}/dict/:id`;
const EDIT_DICTIONARY = `${API_PREFIX}/dict`;

module.exports = {
  GET_DATASET,
  ADD_DICTIONARY,
  REMOVE_DICTIONARY,
  EDIT_DICTIONARY
};
