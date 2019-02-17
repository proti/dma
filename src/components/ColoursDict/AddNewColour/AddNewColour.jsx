import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './addNewColour.scss';
import EditableItem from '../../../common/components/EditableItem/EditableItem';
import LabelButton from '../../../common/components/LabelButton/LabelButton';
import { getColours, addColour } from '../redux/ColoursDictActions';
import { COLOURS_DICT_REDUCER } from '../redux/ColoursDictReducer';
import { HOME } from '../../../common/Routes';

const { arrayOf, shape, number, string, func } = PropTypes;
class AddNewColour extends Component {
  static propTypes = {
    data: arrayOf(shape({ id: number, name: string })),
    addColour: func.isRequired,
    getColours: func.isRequired
  };
  static defaultProps = {
    data: null
  };
  state = { collourName: '', error: null };

  onNameChange = vo => this.setState({ collourName: vo.value, error: null });

  onSubmitHandler = async () => {
    const { collourName } = this.state;
    const { data, addColour, getColours } = this.props;

    await getColours();
    const id = Math.max(...data.map(colour => colour.id)) + 1;
    const findDuplicates = data.find(colour => colour.name === collourName);
    if (findDuplicates) {
      this.setState({ error: 'Colour name already exists' });
    } else {
      if (!collourName) {
        this.setState({ error: 'Colour name cannot be empty' });
        return;
      }
      const dataToSave = { id, name: collourName };
      addColour(dataToSave);
      this.setState({ collourName: '', error: null });
    }
  };

  render() {
    const { error, collourName } = this.state;
    return (
      <div className={style.addNewColour}>
        <form noValidate>
          <fieldset className={style.name}>
            Colour name:
            <EditableItem id="colourName" defaultValue={collourName} onChange={this.onNameChange} />
            <div className={style.error}>{error}</div>
          </fieldset>
          <footer className={style.footer}>
            <LabelButton onClick={this.onSubmitHandler}>Save changes</LabelButton>
          </footer>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state[COLOURS_DICT_REDUCER].data
});

const mapDispatchToProps = dispatch => ({
  addColour: data => dispatch(addColour(data)),
  getColours: () => dispatch(getColours())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewColour);
