import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDictById, saveDictById } from '../redux/ProductActions';
import List from '../../../common/components/List/List';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import { PRODUCT, COLOUR, PRICE } from '../ProductColumns';
import withDetails from '../../../common/components/Dictionary/DictionaryDetails/withDetails';
import ProductListHeader from '../ProductListHeader/ProductListHeader';
import { COLOURS_DICT_REDUCER } from '../../ColoursDict/redux/ColoursDictReducer';
import DropDown from '../../../common/components/DropDown/DropDown';
import { PRODUCT_REDUCER } from '../redux/ProductReducer';
import { DOMAIN_REDUCER } from '../../DomainsDict/redux/DomainReducer';
import { getDomainById } from '../../DomainsDict/redux/DomainActions';

const { number, string, arrayOf, shape, object, func } = PropTypes;
class ProductDetails extends Component {
  static propTypes = {
    data: shape({ id: number, name: string, items: arrayOf(object) }),
    getDictById: func.isRequired,
    saveDictById: func.isRequired,
    colours: arrayOf(shape({ id: number, value: string }))
  };
  static defaultProps = {
    data: null,
    colours: null
  };

  onSaveHandler = () => {
    const { items, label } = this.state;
    const { saveDictById, data } = this.props;
    this.onEditHandler();
    const dataToSave = { ...data, name: label, items };
    saveDictById(dataToSave);
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
    const { getDictById } = this.props;
    await getDictById(this.id);
    const { data } = this.props;
    this.update(data && data.items, data.name);
  }

  renderItems = () => {
    const { editable, items } = this.state;
    const { colours } = this.props;
    return items.map(item => {
      const { id, product, colour, price } = item;
      const columns = { [PRODUCT]: product, [COLOUR]: colour, [PRICE]: price };
      return (
        <ListItem key={id} id={id} onRemove={this.onRowRemoveHandler} isEditable={editable}>
          {Object.keys(columns).map(column => {
            const columnId = `${id}:${column}`;
            const disabled = !editable;
            const defaultValue = disabled ? columns[column] : items[id][column];
            if (column === COLOUR && !disabled) {
              return (
                <DropDown
                  key={columnId}
                  id={columnId}
                  onChange={this.onEditableItemChangeHandler}
                  items={colours}
                  selected={defaultValue}
                />
              );
            }
            return (
              <EditableItem
                key={columnId}
                id={columnId}
                disabled={disabled}
                defaultValue={defaultValue}
                onChange={this.onEditableItemChangeHandler}
              />
            );
          })}
        </ListItem>
      );
    });
  };

  render() {
    return <List label={<ProductListHeader />}>{this.renderItems()}</List>;
  }
}
const mapStateToProps = state => ({
  data: state[PRODUCT_REDUCER].dictDetails,
  colours: state[COLOURS_DICT_REDUCER].data,
  domainList: state[DOMAIN_REDUCER].domainList,
  selctedDomain: state[DOMAIN_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  getDictById: dictId => dispatch(getDictById(dictId)),
  saveDictById: data => dispatch(saveDictById(data)),
  getDomainById: domainId => dispatch(getDomainById(domainId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDetails(ProductDetails, true));
