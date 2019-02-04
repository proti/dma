const HOME = '/';
const ADD_DICT = '/add/dict';
const REMOVE = '/remove';
const EDIT = '/edit';
const EDIT_ID = `${EDIT}/:dictId`;

const COLOURS = '/colours';

const COLOURS_DOMAINS = `${COLOURS}/domain`;

const ADD_COLOURS_DOMAIN = `${COLOURS}/domain/add`;
const EDIT_COLOURS_DOMAIN = `${COLOURS}/domain/edit`;
const EDIT_COLOURS_DOMAIN_ID = `${EDIT_COLOURS_DOMAIN}/:domainId`;

export {
  HOME,
  ADD_DICT,
  REMOVE,
  EDIT,
  EDIT_ID,
  COLOURS,
  COLOURS_DOMAINS,
  ADD_COLOURS_DOMAIN,

  EDIT_COLOURS_DOMAIN,
  EDIT_COLOURS_DOMAIN_ID
};
