import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './addNewDict.scss';
import ListItem from '../../common/components/List/ListItem/ListItem';
import { REMOVE } from '../../common/components/List/ListItem/ListItemAction';
import EditableItem from '../../common/components/EditableItem/EditableItem';
import { addNewDict } from '../Dict/DictActions';
import fetchDataset from '../../app/AppActions';

const { func } = PropTypes;
class AddNewDict extends Component {
  state = { dictName: null, inputsId: ['0'], items: [] }
  static propTypes = {
    addNewDict: func.isRequired,
    refetchDicts: func
  };

  static defaultProps = {
    refetchDicts: () => { }
  }

  onNameChange = vo => this.setState({ dictName: vo.value });

  onSubmitHandler = async event => {
    event.preventDefault();

    const { dictName, items } = this.state;
    const { addNewDict, refetchDicts } = this.props;

    const dataToSave = { name: dictName, items };
    await addNewDict(dataToSave);
    refetchDicts();
  }

  onAddRowClickHandler = () => {
    this.setState(prevState => {
      const inputsId = prevState.inputsId;
      const next = inputsId.length + '';
      return { inputsId: [...inputsId, next] };
    });
  }

  onRowClick = vo => {
    if (vo.action === REMOVE) {
      const { inputsId, items } = this.state;
      const newInputs = inputsId.filter(id => +id !== vo.id);
      const restItems = items.filter(row => row.id !== vo.id);
      this.setState({ inputsId: newInputs, items: [...restItems] });
    }
  }

  onRowInputChange = vo => {
    const { items } = this.state;
    let currentRow = items.find(row => row.id === vo.id);
    const restItems = items.filter(row => row.id !== vo.id);
    if (!currentRow) {
      currentRow = { id: vo.id };
    }
    currentRow = { ...currentRow, [vo.inputId]: vo.value };
    this.setState({ items: [...restItems, currentRow] });
  }

  renderInputs = () => {
    const { inputsId } = this.state;
    return inputsId.map(itemId =>
      (
        <ListItem
          key={itemId}
          id={+itemId}
          isEditable
          onClick={this.onRowClick}
          onChange={this.onRowInputChange}
        />
      )
    );
  }

  render() {
    return (
      <div className={style.addNewDict}>
        <form onSubmit={this.onSubmitHandler} noValidate>
          <fieldset>
            <div>
              <span>Dictonary name:</span>
              <EditableItem id="dictName" onChange={this.onNameChange} />
            </div>
          </fieldset>
          <fieldset>
            <table>
              <thead>
                <tr>
                  <th>
                    Label
                  </th>
                  <th>
                    Colour
                  </th>
                  <th>
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderInputs()}
              </tbody>
            </table>
          </fieldset>
          <button type="button" onClick={this.onAddRowClickHandler}>Add row</button>
          <button type="submit">Save changes</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addNewDict: (data) => dispatch(addNewDict(data)),
  refetchDicts: () => dispatch(fetchDataset())
});

export default connect(null, mapDispatchToProps)(AddNewDict);
