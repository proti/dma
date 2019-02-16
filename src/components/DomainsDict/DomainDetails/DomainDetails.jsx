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
import DropDown from '../../../common/components/DropDown/DropDown';
import { COLOURS_DICT_REDUCER } from '../../ColoursDict/ColoursDictReducer';
import validate from '../AddNewDomain/Validator';

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
//console.log(errors,":",items,":",colours)
    if (Object.keys(errors).length) {

      this.setState({ errors });
    } else {
      //this.onEditHandler();
    }
    //  const dataToSave = { ...data, name: label, items };
    //  await saveDictById(dataToSave);
    //  this.fetchData();
  };

  onEditableItemChangeHandler = item => {
    console.log(item)
    const [rowId, column] = item.id.split('row:');
    const { items } = this.state;
    const currentRow = items.find(item => item.id === +rowId);
    const restRow = items.filter(item => item.id !== +rowId);
    const newValue = { ...currentRow, [column]: item.value };
    const newItems = [...restRow, newValue];
    //this.update(newItems);
  };

  onLabelChangeHandler = vo => this.update(null, vo.value);

  async fetchData() {
    const { getDomainById } = this.props;
    await getDomainById(this.id);
    const { data } = this.props;
    const { label } = this.state;
    this.update(data && data.items, label || data.name);
  }

  renderItems = () => {
    const { data, colours } = this.props;
    const { editable, items, errors } = this.state;
    return data.items.map((item, index) => {
      const id = `row${index}`;
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
                <div>{errors.domain && errors.domain[id]}</div>
              </div>
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
