import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './addNewProduct.scss';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import { addNewDict } from '../redux/ProductActions';
import LabelButton from '../../../common/components/LabelButton/LabelButton';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import { PRODUCT, COLOUR, PRICE } from '../ProductColumns';
import List from '../../../common/components/List/List';
import ProductListHeader from '../ProductListHeader/ProductListHeader';
import { HOME } from '../../../common/Routes';
import { COLOURS_DICT_REDUCER } from '../../ColoursDict/redux/ColoursDictReducer';
import DropDown from '../../../common/components/DropDown/DropDown';

const initiatlState = { dictName: null, inputsId: ['0'], items: [], errors: {} };
const { func, shape, arrayOf, number, string } = PropTypes;
class AddNewProduct extends Component {
  state = initiatlState;

  static propTypes = {
    addNewDict: func.isRequired,
    colours: arrayOf(shape({ id: number, value: string }))
  };

  static defaultProps = { colours: null };

  onNameChange = vo => this.setState({ dictName: vo.value });
  onSubmitHandler = () => {
    const { dictName, items } = this.state;
    const { addNewDict } = this.props;
    if (!dictName) {
      this.setState({ errors: { name: 'Name cannot be empty' } });
      return;
    }
    const dataToSave = { name: dictName, items };
    addNewDict(dataToSave);
    this.setState(initiatlState);
  };

  onAddRowClickHandler = () => {
    this.setState(prevState => {
      const inputsId = prevState.inputsId;
      const next = inputsId.length + '';
      return { inputsId: [...inputsId, next] };
    });
  };

  onRowRemoveHandler = rowId => {
    const { inputsId, items } = this.state;
    const newInputs = inputsId.filter(id => +id !== rowId);
    const restItems = items.filter(row => row.id !== rowId);
    this.setState({ inputsId: newInputs, items: [...restItems] });
  };

  onEditableItemChangeHandler = vo => {
    const { items } = this.state;
    const rowId = vo.id.split(':')[1];
    const inputId = vo.id.split(':')[0];
    let currentRow = items.find(row => row.id === rowId);
    const restItems = items.filter(row => row.id !== rowId);
    if (!currentRow) {
      currentRow = { id: rowId };
    }
    currentRow = { ...currentRow, [inputId]: vo.value };
    this.setState({ items: [...restItems, currentRow] });
  };

  renderInputs = () => {
    const { inputsId } = this.state;
    const { colours } = this.props;
    return inputsId.map(itemId => {
      const id = +itemId;
      const columns = [PRODUCT, COLOUR, PRICE];
      return (
        <ListItem key={itemId} id={id} onRemove={this.onRowRemoveHandler} isEditable>
          {columns.map(item => {
            const colId = `${item}:${id}`;
            if (item === COLOUR) {
              return (
                <DropDown
                  key={colId}
                  id={colId}
                  onChange={this.onEditableItemChangeHandler}
                  items={colours}
                />
              );
            }
            return (
              <EditableItem key={colId} id={colId} onChange={this.onEditableItemChangeHandler} />
            );
          })}
        </ListItem>
      );
    });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className={style.addNewProduct}>
        <form noValidate>
          <fieldset className={style.name}>
            Dictonary name:
            <span>
              <EditableItem id="dictName" onChange={this.onNameChange} />
            </span>
            <div className={style.error}>{errors.name}</div>
          </fieldset>
          <fieldset>
            <List label={<ProductListHeader />}>{this.renderInputs()}</List>
          </fieldset>
          <footer className={style.footer}>
            <LabelButton onClick={this.onAddRowClickHandler}>Add row</LabelButton>
            <LabelButton onClick={this.onSubmitHandler}>Save changes</LabelButton>
          </footer>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  colours: state[COLOURS_DICT_REDUCER].data
});
const mapDispatchToProps = dispatch => ({
  addNewDict: data => dispatch(addNewDict(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewProduct);
