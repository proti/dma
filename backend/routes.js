const API_PREFIX = '/api';

const GET_DICTS_NAMES = `${API_PREFIX}/dicts`;
const GET_DICT_BY_ID = `${API_PREFIX}/dict/:id`;
const ADD_DICTIONARY = `${API_PREFIX}/dict`;
const SAVE_DICT_BY_ID = `${API_PREFIX}/dict/:id`;
const REMOVE_DICTIONARY = `${API_PREFIX}/dict/:id`;
const EDIT_DICTIONARY = `${API_PREFIX}/dict/:id`;

const GET_COLOURS = `${API_PREFIX}/colours`;
const EDIT_COLOURS = `${API_PREFIX}/colours`;

const ADD_COLOUR = `${API_PREFIX}/colour`;

const GET_DOMAINS_NAMES = `${API_PREFIX}/domains`;
const GET_DOMAIN_BY_ID = `${API_PREFIX}/domain/:id`;
const REMOVE_DOMAIN = `${API_PREFIX}/domain/:id`;
const SAVE_DOMAINS = `${API_PREFIX}/domain`;

const SAVE_DOMAIN = `${API_PREFIX}/domain/:id`;

module.exports = {
  GET_DICTS_NAMES,
  GET_DICT_BY_ID,
  ADD_DICTIONARY,
  SAVE_DICT_BY_ID,
  REMOVE_DICTIONARY,
  EDIT_DICTIONARY,

  GET_COLOURS,
  EDIT_COLOURS,
  ADD_COLOUR,

  GET_DOMAINS_NAMES,
  GET_DOMAIN_BY_ID,
  REMOVE_DOMAIN,
  SAVE_DOMAINS,

  SAVE_DOMAIN
};
