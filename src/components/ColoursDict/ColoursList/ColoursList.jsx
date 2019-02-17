import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getColours, saveColours } from '../redux/ColoursDictActions';
import style from './coloursList.scss';
import withDictionaryList from '../../../common/components/Dictionary/DictionaryList/DictionaryList';
import List from '../../../common/components/List/List';
import { COLOURS_DICT_REDUCER } from '../redux/ColoursDictReducer';
import { HOME } from '../../../common/Routes';

const { shape, func } = PropTypes;
class ColoursList extends Component {
  static propTypes = {
    history: shape({}),
    getColours: func.isRequired,
    saveColours: func.isRequired
  };
  static defaultProps = {
    history: {}
  };

  componentDidMount() {
    const { getColours } = this.props;
    getColours();
  }

  onItemRemove = () => {
    const { saveColours } = this.props;
    const { items } = this.state;
    saveColours(items);
  };

  onItemClick = itemId => {
    const { history } = this.props;
    //history.push(DETAILS + '/' + dictId);
  };

  render() {
    return <List label="Colours:">{this.renderItems()}</List>;
  }
}
const mapStateToProps = state => ({
  data: state[COLOURS_DICT_REDUCER].data,
  error: state[COLOURS_DICT_REDUCER].error
});
const mapDispatchToProps = dispatch => ({
  saveColours: colours => dispatch(saveColours(colours)),
  getColours: () => dispatch(getColours())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withDictionaryList(ColoursList));
