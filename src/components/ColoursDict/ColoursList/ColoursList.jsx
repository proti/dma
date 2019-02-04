import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import { COLOURS_DICT_REDUCER } from '../ColoursDictReducer';
import { getColours, saveColours } from '../ColoursDictActions';
import style from './coloursList.scss';
import { COLOURS_DOMAINS } from '../../../common/Routes';

const { arrayOf, shape, number, string, func } = PropTypes;
class ColoursList extends Component {
  state = { colours: [] }

  static propTypes = {
    data: arrayOf(shape({ id: number, value: string })),
    getColours: func.isRequired,
    saveColours: func.isRequired
  };

  static defaultProps = {
    data: null
  };

  componentDidMount() {
    const { getColours } = this.props;
    getColours();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if (data && prevProps.data !== data) {
      this.update(data);
    }
  }

  update = (colours) => this.setState({ colours });

  itemChangeHandler = vo => {
    const { colours } = this.state;
    const idToNum = +vo.id;
    let currentColour = colours.find(colour => colour.id === idToNum);
    const restColours = colours.filter(colour => colour.id !== idToNum);
    if (!currentColour) {
      currentColour = { id: idToNum };
    }
    currentColour = { ...currentColour, value: vo.value };
    this.update([...restColours, currentColour]);
  }

  onAddNewClickHandler = () => {
    const { colours } = this.state;
    const newColour = { id: colours.length, value: '' };
    this.update([...colours, newColour]);
  }

  renderColours = () => {
    const { colours } = this.state;

    if (!colours) return 'Fetching colours...';
    return colours.map(colour => {
      const id = colour.id + '';
      const value = colour.value;
      return (
        <tr key={id}>
          <td>
            <EditableItem id={id} defaultValue={value} onChange={this.itemChangeHandler} />
          </td>
        </tr>
      );
    }
    );
  }

  onSubmitHandler = async () => {
    event.preventDefault();
    const { colours } = this.state;
    const { saveColours, getColours } = this.props;
    await saveColours(colours);
    getColours();
  }

  render() {
    return (
      <div className={style.colours}>
        <form onSubmit={this.onSubmitHandler} noValidate>
          <fieldset>
            <div>
              <span>Colours:</span>
              <Link to={COLOURS_DOMAINS}>Domains</Link>
            </div>
          </fieldset>
          <fieldset>
            <table>
              <thead>
                <tr>
                  <th>
                    Name:
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderColours()}
              </tbody>
            </table>
          </fieldset>
          <button type="button" onClick={this.onAddNewClickHandler}>Add new</button>
          <button type="submit">Save changes</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state[COLOURS_DICT_REDUCER].error,
  data: state[COLOURS_DICT_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  getColours: () => dispatch(getColours()),
  saveColours: (colours) => dispatch(saveColours(colours))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColoursList);
