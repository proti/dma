import PropTypes from 'prop-types';

const {
  number,
  string,
  func
} = PropTypes;

const ListItemPropTypes = {
  id: number,
  label: string,
  colour: string,
  price: string,
  onClick: func
};
export default ListItemPropTypes;
