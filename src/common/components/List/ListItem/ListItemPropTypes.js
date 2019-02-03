import PropTypes from 'prop-types';

const {
  number,
  string,
  func,
  bool
} = PropTypes;

const ListItemPropTypes = {
  id: number,
  label: string,
  colour: string,
  price: string,
  isEditable: bool,
  onClick: func,
  onChange: func
};
export default ListItemPropTypes;
