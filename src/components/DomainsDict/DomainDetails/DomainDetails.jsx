import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import style from './productDetails.scss';
import List from '../../../common/components/List/List';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import { COLOURS_DOMAIN_REDUCER } from '../../ColoursDict/ColoursDomain/redux/ColoursDomainReducer';
import { getDomainById } from '../../ColoursDict/ColoursDomain/redux/ColoursDomainActions';
import { DOMAIN, RANGE } from '../DomainsColumns';
import withDetails from '../../../common/components/Dictionary/DictionaryDetails/withDetails';

const { number, string, arrayOf, shape, object, func } = PropTypes;
class DomainDetails extends Component {
  static propTypes = {
    data: shape({ id: number, name: string, items: arrayOf(object) }),
    getDomainById: func.isRequired
  };
  static defaultProps = {
    data: null
  };

  fetchData() {
    const { getDomainById } = this.props;
    getDomainById(this.id);
  }

  renderItems = () => {
    const { data } = this.props;
    return data.items.map((item, index) => {
      const id = `row${index}`;
      const { domain, range } = item;
      return (
        <ListItem key={id} id={id} onRemove={this.onDictRemoveHandler}>
          <EditableItem
            id={DOMAIN}
            disabled
            defaultValue={domain}
            onChange={this.onEditableItemChangeHandler}
          />
          <EditableItem
            id={RANGE}
            disabled
            defaultValue={range}
            onChange={this.onEditableItemChangeHandler}
          />
        </ListItem>
      );
    });
  };

  render() {
    const { data } = this.props;
    if (!data) return 'Fetchind data...';
    return <List label={data.name}>{this.renderItems()}</List>;
  }
}
const mapStateToProps = state => ({
  data: state[COLOURS_DOMAIN_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  getDomainById: domainId => dispatch(getDomainById(domainId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDetails(DomainDetails));
