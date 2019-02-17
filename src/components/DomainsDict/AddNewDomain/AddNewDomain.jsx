import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './addNewDomain.scss';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import DropDown from '../../../common/components/DropDown/DropDown';
import LabelButton from '../../../common/components/LabelButton/LabelButton';
import validate from './Validator';
import { COLOURS_DICT_REDUCER } from '../../ColoursDict/ColoursDictReducer';
import { addNewDomain, getDomains } from '../redux/ColoursDomainActions';

const { arrayOf, shape, number, string, func } = PropTypes;
const DOMAIN = 'domain';
const RANGE = 'range';
const initialRow = { id: 0, [DOMAIN]: '', [RANGE]: '' };

class AddNewDomain extends Component {
  state = { domainName: null, rows: [], errors: {} };

  static propTypes = {
    colours: arrayOf(shape({ id: number, value: string })),
    addNewDomain: func.isRequired,
    getDomains: func
  };

  static defaultProps = {
    colours: null,
    getDomains: () => {}
  };

  componentDidMount() {
    this.updateRows([this.initialRowValues]);
  }

  componentDidUpdate(prevProps) {
    const { colours } = this.props;
    if (colours && prevProps.colours !== colours) {
      this.updateRows([this.initialRowValues]);
    }
  }

  get initialRowValues() {
    const { colours } = this.props;
    const colour = (colours && colours[0].name) || '';
    return { ...initialRow, [DOMAIN]: colour, [RANGE]: colour };
  }

  updateRows = newRows => {
    const sortedRows = newRows.sort((a, b) => a.id - b.id);
    const { colours } = this.props;
    let errors = {};
    if (colours && sortedRows.length > 1) {
      console.log(sortedRows);
      errors = validate(sortedRows, colours);
    }
    this.setState({ rows: [...sortedRows], errors });
  };

  onNameChange = vo => this.setState({ domainName: vo.value });

  onAddRowClickHandler = () => {
    const { rows } = this.state;
    const id = rows.length ? rows[rows.length - 1].id + 1 : 0;
    const newRow = { ...this.initialRowValues, id };
    this.updateRows([...rows, newRow]);
  };

  onRowRemoveHandler = rowId => {
    const { rows } = this.state;
    const rowsLeft = rows.filter(row => row.id !== rowId);
    this.updateRows(rowsLeft);
  };

  onColourValueChangeHandler = colour => {
    const { rows } = this.state;
    const [property, currentId] = colour.id.split(':');
    const currentRow = rows.find(row => row.id === +currentId);
    const rowsLeft = rows.filter(row => row.id !== +currentId);
    const newRow = { ...currentRow, [property]: colour.value };

    this.updateRows([...rowsLeft, newRow]);
  };

  onSubmitHandler = async () => {
    const { domainName, rows } = this.state;
    const { addNewDomain, getDomains } = this.props;

    const dataToSave = { name: domainName, items: rows };

    await addNewDomain(dataToSave);
    getDomains();
  };

  renderInputs = () => {
    const { rows, errors } = this.state;
    const { colours } = this.props;
    if (!colours) return null;
    return rows.map(row => {
      const id = row.id;
      const domainId = `${DOMAIN}:${id}`;
      const rangeId = `${RANGE}:${id}`;
      return (
        <tr key={id}>
          <td>
            <DropDown id={domainId} onChange={this.onColourValueChangeHandler} items={colours} />
            <div>{errors.domain && errors.domain[id]}</div>
          </td>
          <td>
            <DropDown id={rangeId} onChange={this.onColourValueChangeHandler} items={colours} />
            <div>{errors.range && errors.range[id]}</div>
          </td>
          <td>
            <LabelButton id={id} onClick={this.onRowRemoveHandler}>
              Remove row
            </LabelButton>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className={style.addNewDict}>
        <form noValidate>
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
                  <th>Domain</th>
                  <th>Range</th>
                </tr>
              </thead>
              <tbody>{this.renderInputs()}</tbody>
            </table>
          </fieldset>
          <LabelButton onClick={this.onAddRowClickHandler}>Add row</LabelButton>
          <LabelButton onClick={this.onSubmitHandler}>Save changes</LabelButton>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  colours: state[COLOURS_DICT_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  addNewDomain: data => dispatch(addNewDomain(data)),
  getDomains: () => dispatch(getDomains())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewDomain);