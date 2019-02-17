import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './productList.scss';
import List from '../../../common/components/List/List';
import { fetchDicts, removeDict } from '../redux/DictActions';
import { DETAILS, HOME } from '../../../common/Routes';

import withDictionaryList from '../../../common/components/Dictionary/DictionaryList/DictionaryList';
import { DICT_REDUCER } from '../redux/DictReducer';

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
  data: state[DICT_REDUCER].data,
  error: state[DICT_REDUCER].error
});
const mapDispatchToProps = dispatch => ({
  removeDict: dictId => dispatch(removeDict(dictId)),
  fetchData: () => dispatch(fetchDicts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDictionaryList(ProductList));
