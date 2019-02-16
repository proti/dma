import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import style from './productDetails.scss';
import { DICT_REDUCER } from '../DictReducer';
import { getDictById, saveDictById } from '../DictActions';
import List from '../../../common/components/List/List';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import { PRODUCT, COLOUR, PRICE } from '../ColumnName';
import withDetails from '../../../common/components/Dictionary/DictionaryDetails/withDetails';

const { number, string, arrayOf, shape, object, func } = PropTypes;
class ProductDetails extends Component {
  static propTypes = {
    data: shape({ id: number, name: string, items: arrayOf(object) }),
    getDictById: func.isRequired,
    saveDictById: func.isRequired
  };
  static defaultProps = {
    data: null
  };

  onSaveHandler = async () => {
    const { items, label } = this.state;
    const { saveDictById, data } = this.props;
    this.onEditHandler();
    const dataToSave = { ...data, name: label, items };
    await saveDictById(dataToSave);
    this.fetchData();
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

  onLabelChangeHandler = vo => this.update(null, vo.value);

  async fetchData() {
    const { getDictById } = this.props;
    await getDictById(this.id);
    const { data } = this.props;
    const { label } = this.state;
    this.update(data && data.items, label || data.name);
  }

  renderItems = () => {
    const { data } = this.props;
    const { editable, items } = this.state;
    return data.items.map(item => {
      const { id, product, colour, price } = item;
      const columns = { [PRODUCT]: product, [COLOUR]: colour, [PRICE]: price };
      return (
        <ListItem key={id} id={id} onRemove={this.onDictRemoveHandler}>
          {Object.keys(columns).map(column => {
            const columnId = `${id}:${column}`;
            const disabled = !editable;
            const defaultValue = disabled ? columns[column] : items[id][column];
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

  renderLabel = () => {
    const { editable, label } = this.state;
    return (
      <EditableItem
        id="label"
        defaultValue={label}
        disabled={!editable}
        onChange={this.onLabelChangeHandler}
      />
    );
  };

  render() {
    const { data } = this.props;
    if (!data) return 'Fetchind data...';
    return <List label={this.renderLabel()}>{this.renderItems()}</List>;
  }
}
const mapStateToProps = state => ({
  data: state[DICT_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  getDictById: dictId => dispatch(getDictById(dictId)),
  saveDictById: dictId => dispatch(saveDictById(dictId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDetails(ProductDetails));
