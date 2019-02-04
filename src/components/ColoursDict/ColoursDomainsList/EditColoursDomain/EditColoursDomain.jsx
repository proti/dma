import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './editColoursDomain.scss';
import { COLOURS_DOMAIN_REDUCER } from '../../ColoursDomain/ColoursDomainReducer';
import { getDomainById } from '../../ColoursDomain/ColoursDomainActions';

const { shape, object, func, number, string, arrayOf } = PropTypes;
class EditColoursDomain extends Component {

  static propTypes = {
    match: shape({ params: object }).isRequired,
    getDomainById: func.isRequired,
    data: shape({
      id: number,
      name: string,
      items: arrayOf(
        shape({
          domain: string,
          range: string
        })
      )
    })
  }

  static defaultProps = {
    data: null
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    const { data } = this.props;
    if (data && (data.id !== this.domainId)) {
      this.fetchData();
    }
  }

  get domainId() {
    const { match: { params: { domainId } } } = this.props;
    return +domainId;
  }

  onListItemActionHandler = itemVo => {
    console.log('EditColoursDomain.onListItemActionHandler:', itemVo);
  }

  fetchData() {
    const { getDomainById } = this.props;
    getDomainById(this.domainId);
  }

  renderTable = () => {
    const { data: { name, items } } = this.props;

    if (!name && !items) return null;
    return (
      <table className={style.dict}>
        <thead><tr><th>Domain</th><th>Range</th></tr></thead>
        <tbody>
          {items.map((item, index) => <tr key={`row${index}`}><td>{item.domain}</td><td>{item.range}</td></tr>)}
        </tbody>
      </table>
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div className={style.edit}>
        <div>{data && data.name}</div>
        <div>
          {!data ? 'Fetching dict...' : this.renderTable()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state[COLOURS_DOMAIN_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  getDomainById: (domainId) => dispatch(getDomainById(domainId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditColoursDomain);
