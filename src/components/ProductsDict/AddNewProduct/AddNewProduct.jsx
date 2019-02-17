import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './addNewProduct.scss';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import { addNewDict, fetchDicts } from '../redux/DictActions';
import LabelButton from '../../../common/components/LabelButton/LabelButton';
import ListItem from '../../../common/components/List/ListItem/ListItem';
import { PRODUCT, COLOUR, PRICE } from '../ProductColumns';
import List from '../../../common/components/List/List';
import ListHeader from '../ListHeader/ListHeader';
import { HOME } from '../../../common/Routes';

const { func, shape } = PropTypes;
class AddNewProduct extends Component {
  state = { dictName: null, inputsId: ['0'], items: [] };

  static propTypes = {
    addNewDict: func.isRequired,
    history: shape({})
  };

  static defaultProps = {
    history: {}
  };

  onNameChange = vo => this.setState({ dictName: vo.value });
  onSubmitHandler = async () => {
    const { dictName, items } = this.state;
    const { addNewDict, history } = this.props;

    const dataToSave = { name: dictName, items };
    await addNewDict(dataToSave);
    history.push(HOME);
    //refetchDicts(); TODO Add middleware wich reFetch new data
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
    return inputsId.map(itemId => {
      const id = +itemId;
      const columns = [PRODUCT, COLOUR, PRICE];
      return (
        <ListItem key={itemId} id={id} onRemove={this.onRowRemoveHandler}>
          {columns.map(item => {
            const colId = `${item}:${id}`;
            return (
              <EditableItem key={colId} id={colId} onChange={this.onEditableItemChangeHandler} />
            );
          })}
        </ListItem>
      );
    });
  };

  render() {
    return (
      <div className={style.addNewProduct}>
        <form noValidate>
          <fieldset>
            <div>
              <span>Dictonary name:</span>
              <EditableItem id="dictName" onChange={this.onNameChange} />
            </div>
          </fieldset>
          <fieldset>
            <List label={<ListHeader />}>{this.renderInputs()}</List>
          </fieldset>
          <LabelButton onClick={this.onAddRowClickHandler}>Add row</LabelButton>
          <LabelButton onClick={this.onSubmitHandler}>Save changes</LabelButton>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  addNewDict: data => dispatch(addNewDict(data)),
  refetchDicts: () => dispatch(fetchDicts())
});

export default connect(
  null,
  mapDispatchToProps
)(AddNewProduct);
