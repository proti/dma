import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './addColoursDomain.scss';
import { REMOVE } from '../../../../common/components/List/ListItem/ListItemAction';
import EditableItem from '../../../../common/components/EditableItem/EditableItem';
import { addNewDomain, getDomains } from '../../ColoursDomain/ColoursDomainActions';
import { COLOURS_DICT_REDUCER } from '../../ColoursDictReducer';

const { arrayOf, shape, number, string, func } = PropTypes;
class AddColoursDomain extends Component {
  state = { dictName: null, inputsId: ['0'], items: [] }

  static propTypes = {
    colours: arrayOf(shape({ id: number, value: string })),
    addNewDomain: func.isRequired,
    getDomains: func
  };

  static defaultProps = {
    colours: null,
    getDomains: () => { }
  }

  onNameChange = vo => this.setState({ dictName: vo.value });

  onSubmitHandler = async event => {
    event.preventDefault();

    const { dictName, items } = this.state;
    const { addNewDomain, getDomains } = this.props;

    const dataToSave = { name: dictName, items };
    await addNewDomain(dataToSave);
    getDomains();
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
    const { colours } = this.props;

    return inputsId.map(itemId =>
      (
        <tr key={itemId}>
          <td><select>{colours && colours.map(colour => <option key={colour.id} value={colour.value}>{colour.value}</option>)}</select></td>
          <td><select>{colours && colours.map(colour => <option key={colour.id} value={colour.value}>{colour.value}</option>)}</select></td>
        </tr>
      )
    );
  }

  render() {
    return (
      <div className={style.addNewDict}>
        <form onSubmit={this.onSubmitHandler} noValidate>
          <fieldset>
            <div>
              <span>Domain name:</span>
              <EditableItem id="domainName" onChange={this.onNameChange} />
            </div>
          </fieldset>
          <fieldset>
            <table>
              <thead>
                <tr>
                  <th>
                    Domain
                  </th>
                  <th>
                    Range
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
const mapStateToProps = state => ({
  colours: state[COLOURS_DICT_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  addNewDomain: (data) => dispatch(addNewDomain(data)),
  getDomains: () => dispatch(getDomains())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddColoursDomain);
