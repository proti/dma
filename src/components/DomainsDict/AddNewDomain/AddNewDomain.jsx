import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './addNewDomain.scss';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import DropDown from '../../../common/components/DropDown/DropDown';
import LabelButton from '../../../common/components/LabelButton/LabelButton';
import validate from '../Validator';
import { COLOURS_DICT_REDUCER } from '../../ColoursDict/redux/ColoursDictReducer';
import { addNewDomain } from '../redux/DomainActions';
import DomainListHeader from '../DomainListHeader/DomainListHeader';
import List from '../../../common/components/List/List';
import ListItem from '../../../common/components/List/ListItem/ListItem';

const { arrayOf, shape, number, string, func } = PropTypes;
const DOMAIN = 'domain';
const RANGE = 'range';
const initialRow = { id: 0, [DOMAIN]: '', [RANGE]: '' };

class AddNewDomain extends Component {
  state = { domainName: null, rows: [], errors: {} };

  static propTypes = {
    colours: arrayOf(shape({ id: number, value: string })),
    addNewDomain: func.isRequired
  };

  static defaultProps = {
    colours: null
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

  onSubmitHandler = () => {
    const { domainName, rows } = this.state;
    const { addNewDomain } = this.props;
    if (!domainName) {
      this.setState({ errors: { name: 'Name cannot be empty' } });
      return;
    }
    const dataToSave = { name: domainName, items: rows };
    addNewDomain(dataToSave);
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
        <ListItem key={id} id={id} onRemove={this.onRowRemoveHandler} isEditable>
          <div>
            <DropDown id={domainId} onChange={this.onColourValueChangeHandler} items={colours} />
            <div className={style.error}>{errors.domain && errors.domain[id]}</div>
          </div>
          <div>
            <DropDown id={rangeId} onChange={this.onColourValueChangeHandler} items={colours} />
            <div className={style.error}>{errors.range && errors.range[id]}</div>
          </div>
        </ListItem>
      );
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className={style.addNewDomain}>
        <form noValidate>
          <fieldset className={style.name}>
            Domain name:
            <span>
              <EditableItem id="domainName" onChange={this.onNameChange} />
            </span>
            <div className={style.error}>{errors.name}</div>
          </fieldset>
          <fieldset>
            <List label={<DomainListHeader />}>{this.renderInputs()}</List>
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
  addNewDomain: data => dispatch(addNewDomain(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewDomain);
