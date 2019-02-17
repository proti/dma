import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import style from './productDetails.scss';
import List from '../../../common/components/List/List';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import { COLOURS_DOMAIN_REDUCER } from '../redux/ColoursDomainReducer';
import { getDomainById } from '../redux/ColoursDomainActions';
import { DOMAIN, RANGE } from '../DomainsColumns';
import withDetails from '../../../common/components/Dictionary/DictionaryDetails/withDetails';
import DropDown from '../../../common/components/DropDown/DropDown';
import { COLOURS_DICT_REDUCER } from '../../ColoursDict/ColoursDictReducer';
import validate from '../AddNewDomain/Validator';
import DomainListHeader from '../DomainListHeader/DomainListHeader';

const { number, string, arrayOf, shape, object, func } = PropTypes;
class DomainDetails extends Component {
  static propTypes = {
    data: shape({ id: number, name: string, items: arrayOf(object) }),
    colours: arrayOf(shape({ id: number, name: string })),
    getDomainById: func.isRequired
  };

  static defaultProps = {
    data: null,
    colours: null
  };

  onSaveHandler = async () => {
    const { items, label } = this.state;
    const { colours, data } = this.props;
    const errors = validate(items, colours);
    if (!Object.keys(errors).length) {
      console.log('SAVE:', data, items);
      this.onEditHandler();
      const dataToSave = { ...data, name: label, items };
      //await saveDictById(dataToSave);
      //this.fetchData();
    }
    this.setState({ errors });
  };

  onEditableItemChangeHandler = item => {
    const [rowId, column] = item.id.split(':');
    const { items } = this.state;
    const currentRow = items.find(item => item.id === +rowId);
    const restRow = items.filter(item => item.id !== +rowId);
    const newValue = { ...currentRow, [column]: item.value };
    const newItems = [...restRow, newValue];
    this.update(newItems);
  };

  async fetchData() {
    const { getDomainById } = this.props;
    await getDomainById(this.id);
    const { data } = this.props;
    this.update(data && data.items, data.name);
  }

  renderItems = () => {
    const { colours } = this.props;
    const { editable, items, errors } = this.state;
    return items.map((item, index) => {
      const id = index;
      const { domain, range } = item;
      const columns = { [DOMAIN]: domain, [RANGE]: range };
      return (
        <ListItem key={id} id={id} onRemove={this.onDomainRemoveHandler}>
          {Object.keys(columns).map(column => {
            const columnId = `${id}:${column}`;
            const disabled = !editable;
            const defaultValue = disabled ? columns[column] : items[index][column];

            return disabled ? (
              <EditableItem
                key={columnId}
                id={columnId}
                disabled={disabled}
                defaultValue={defaultValue}
                onChange={this.onEditableItemChangeHandler}
              />
            ) : (
              <div key={columnId}>
                <DropDown
                  id={columnId}
                  onChange={this.onEditableItemChangeHandler}
                  items={colours}
                  selected={defaultValue}
                />
                <div>{errors && errors[column] && errors[column][id]}</div>
              </div>
            );
          })}
        </ListItem>
      );
    });
  };

  render() {
    return <List label={<DomainListHeader />}>{this.renderItems()}</List>;
  }
}
const mapStateToProps = state => ({
  data: state[COLOURS_DOMAIN_REDUCER].data,
  colours: state[COLOURS_DICT_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  getDomainById: domainId => dispatch(getDomainById(domainId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDetails(DomainDetails));