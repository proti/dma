import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './addColoursDomain.scss';
import EditableItem from '../../../../common/components/EditableItem/EditableItem';
import { addNewDomain, getDomains } from '../../ColoursDomain/ColoursDomainActions';
import { COLOURS_DICT_REDUCER } from '../../ColoursDictReducer';
import DropDown from '../../../../common/components/DropDown/DropDown';

const { arrayOf, shape, number, string, func } = PropTypes;
const DOMAIN = 'domain';
const RANGE = 'range';
const initialRow = { id: 0, [DOMAIN]: '', [RANGE]: '' };
class AddColoursDomain extends Component {
  state = { domainName: null, rows: [] }

  static propTypes = {
    colours: arrayOf(shape({ id: number, value: string })),
    addNewDomain: func.isRequired,
    getDomains: func
  };

  static defaultProps = {
    colours: null,
    getDomains: () => { }
  }

  componentDidUpdate(prevProps) {
    const { colours } = this.props;
    if (colours && prevProps.colours !== colours) {
      this.updateRows([this.initialRowValues]);
    }
  }

  get initialRowValues() {
    const { colours } = this.props;
    const colour = colours[0].value;
    return { ...initialRow, [DOMAIN]: colour, [RANGE]: colour };
  }

  updateRows = newRows => {
    const sortedRows = newRows.sort((a, b) => a.id - b.id);
    this.setState({ rows: [...sortedRows] });
  }
  onNameChange = vo => this.setState({ domainName: vo.value });

  onAddRowClickHandler = () => {
    this.setState(prevState => {
      const rows = prevState.rows;
      const id = rows.length ? rows[rows.length - 1].id + 1 : 0;
      const newRow = { ...this.initialRowValues, id };
      return { rows: [...rows, newRow] };
    });
  }

  onRowRemoveHandler = rowId => {
    const { rows } = this.state;
    const rowsLeft = rows.filter(row => row.id !== rowId);
    this.updateRows(rowsLeft);
  }

  onColourValueChangeHandler = (colour) => {
    const { rows } = this.state;
    const [property, currentId] = colour.id.split('_');
    const currentRow = rows.find(row => row.id === +currentId);
    const rowsLeft = rows.filter(row => row.id !== +currentId);
    const newRow = { ...currentRow, [property]: colour.value };

    this.updateRows([...rowsLeft, newRow]);
  }

  onSubmitHandler = async event => {
    event.preventDefault();

    const { domainName, rows } = this.state;
    const { addNewDomain, getDomains } = this.props;

    const dataToSave = { name: domainName, items: rows };

    await addNewDomain(dataToSave);
    getDomains();
  }

  renderInputs = () => {
    const { rows } = this.state;
    const { colours } = this.props;
    if (!colours) return null;
    return rows.map(row => {
      const id = row.id;
      const domainId = `${DOMAIN}_${id}`;
      const rangeId = `${RANGE}_${id}`;
      return (
        <tr key={id}>
          <td><DropDown id={domainId} onChange={this.onColourValueChangeHandler} items={colours} /></td>
          <td><DropDown id={rangeId} onChange={this.onColourValueChangeHandler} items={colours} /></td>
          <td><button type="button" onClick={() => this.onRowRemoveHandler(id)}>-</button></td>
        </tr>
      );
    }
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
