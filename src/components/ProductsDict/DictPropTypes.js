import PropTypes from 'prop-types';

const { number, string, arrayOf, shape } = PropTypes;

const DictPropTypes = {
  id: number.isRequired,
  name: string,
  items: arrayOf(
    shape({
      id: number,
      product: string,
      color: string,
      price: string
    })
  )
};
export default DictPropTypes;
