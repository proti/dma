const API_PREFIX = '/api';

const GET_DICTS_NAMES = `${API_PREFIX}/dicts`;
const GET_DICT_BY_ID = `${API_PREFIX}/dict/:id`;
const ADD_DICTIONARY = `${API_PREFIX}/dict`;
const REMOVE_DICTIONARY = `${API_PREFIX}/dict/:id`;
const EDIT_DICTIONARY = `${API_PREFIX}/dict/:id`;

const GET_COLOURS = `${API_PREFIX}/colours`;
const EDIT_COLOURS = `${API_PREFIX}/colours`;

const GET_COLOURS_DOMAINS_NAMES = `${API_PREFIX}/colours/domains`;
const GET_COLOURS_DOMAIN_BY_ID = `${API_PREFIX}/colours/domain/:id`;
const REMOVE_COLOURS_DOMAIN = `${API_PREFIX}/colours/domain/:id`;
const SAVE_COLOURS_DOMAIN = `${API_PREFIX}/colours/domain`;

module.exports = {
  GET_DICTS_NAMES,
  GET_DICT_BY_ID,
  ADD_DICTIONARY,
  REMOVE_DICTIONARY,
  EDIT_DICTIONARY,

  GET_COLOURS,
  EDIT_COLOURS,

  GET_COLOURS_DOMAINS_NAMES,
  GET_COLOURS_DOMAIN_BY_ID,
  REMOVE_COLOURS_DOMAIN,
  SAVE_COLOURS_DOMAIN
};
