import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '../../../common/components/List/List';
import { removeDict, fetchProducts } from '../redux/ProductActions';
import { DETAILS } from '../../../common/Routes';

import withDictionaryList from '../../../common/components/Dictionary/DictionaryList/DictionaryList';
import { PRODUCT_REDUCER } from '../redux/ProductReducer';

const { shape, func } = PropTypes;

class ProductList extends Component {
  static propTypes = {
    history: shape({}),
    fetchData: func.isRequired,
    removeDict: func.isRequired
  };

  static defaultProps = {
    history: {}
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  onItemRemove = async itemId => {
    const { removeDict } = this.props;
    await removeDict(itemId);
  };

  onItemClick = itemId => {
    const { history } = this.props;
    history.push(DETAILS + '/' + itemId);
  };

  render() {
    return <List label="Products:">{this.renderItems()}</List>;
  }
}

const mapStateToProps = state => ({
  data: state[PRODUCT_REDUCER].data,
  error: state[PRODUCT_REDUCER].error
});
const mapDispatchToProps = dispatch => ({
  removeDict: dictId => dispatch(removeDict(dictId)),
  fetchData: () => dispatch(fetchProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDictionaryList(ProductList));
