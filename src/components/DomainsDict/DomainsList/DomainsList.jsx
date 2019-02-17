import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '../../../common/components/List/List';

import { DETAILS_DOMAIN } from '../../../common/Routes';

import withDictionaryList from '../../../common/components/Dictionary/DictionaryList/DictionaryList';

import { DOMAIN_REDUCER } from '../redux/DomainReducer';
import { getDomains, removeDomain } from '../redux/DomainActions';

const { shape, func } = PropTypes;

class DomainsList extends Component {
  static propTypes = {
    history: shape({}),
    getDomains: func.isRequired,
    removeDomain: func.isRequired
  };

  static defaultProps = {
    history: {}
  };

  componentDidMount() {
    const { getDomains } = this.props;
    getDomains();
  }

  onItemRemove = async itemId => {
    const { removeDomain } = this.props;
    await removeDomain(itemId);
  };

  onItemClick = itemId => {
    const { history } = this.props;
    history.push(DETAILS_DOMAIN + '/' + itemId);
  };

  render() {
    return <List label="Domains:">{this.renderItems()}</List>;
  }
}

const mapStateToProps = state => ({
  error: state[DOMAIN_REDUCER].error,
  data: state[DOMAIN_REDUCER].domainList
});

const mapDispatchToProps = dispatch => ({
  getDomains: () => dispatch(getDomains()),
  removeDomain: domainId => dispatch(removeDomain(domainId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDictionaryList(DomainsList));
