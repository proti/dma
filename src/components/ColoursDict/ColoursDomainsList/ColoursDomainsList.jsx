import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { EDIT_COLOURS_DOMAIN, ADD_COLOURS_DOMAIN } from '../../../common/Routes';

import style from './coloursDomainsList.scss';
import { COLOURS_DOMAIN_REDUCER } from '../ColoursDomain/ColoursDomainReducer';
import { getDomains } from '../ColoursDomain/ColoursDomainActions';
import ColoursDomain from './ColoursDomain/ColoursDomain';

const { arrayOf, shape, number, string, func } = PropTypes;
class ColoursDomainsList extends Component {

  static propTypes = {
    data: arrayOf(shape({
      id: number,
      name: string
    })),
    getDomains: func.isRequired,
    history: shape({})
  };

  static defaultProps = {
    data: null,
    history: {}
  };


  componentDidMount() {
    const { getDomains } = this.props;
    getDomains();
  }

  onDomainRemoveHandler = domainId => {
    const { getDomains } = this.props;
    getDomains();
  }

  onDomainClickHandler = domainId => {
    this.goTo(EDIT_COLOURS_DOMAIN + '/' + domainId);
  }

  goTo(url) {
    const { history } = this.props;
    history.push(url);
  }

  renderDomains = () => {
    const { data } = this.props;
    if (!data) return <tr><td>Fetching domains...</td></tr>;
    return data.map(domain => {
      const { id, ...rest } = domain;
      return <ColoursDomain key={id} id={id} {...rest} onRemove={this.onDomainRemoveHandler} onClick={this.onDomainClickHandler} />;
    });
  }

  render() {
    return (
      <div className={style.coloursDomainsList}>
        <table className={style.dictList}>
          <thead>
            <tr>
              <th>Domains:</th>
              <th><Link to={ADD_COLOURS_DOMAIN}>New domain</Link></th>
            </tr>
          </thead>
          <tbody>{this.renderDomains()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state[COLOURS_DOMAIN_REDUCER].error,
  data: state[COLOURS_DOMAIN_REDUCER].domainList
});

const mapDispatchToProps = dispatch => ({
  getDomains: () => dispatch(getDomains())
  //saveDomain: (domain) => dispatch(saveDomain(domain))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColoursDomainsList);
