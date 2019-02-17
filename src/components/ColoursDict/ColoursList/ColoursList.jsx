import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getColours, saveColours } from '../redux/ColoursDictActions';
import withDictionaryList from '../../../common/components/Dictionary/DictionaryList/DictionaryList';
import List from '../../../common/components/List/List';
import { COLOURS_DICT_REDUCER } from '../redux/ColoursDictReducer';

const { func } = PropTypes;
class ColoursList extends Component {
  static propTypes = {
    getColours: func.isRequired,
    saveColours: func.isRequired
  };
  static defaultProps = {};

  componentDidMount() {
    const { getColours } = this.props;
    getColours();
  }

  onItemRemove = () => {
    const { saveColours } = this.props;
    const { items } = this.state;
    saveColours(items);
  };

  // onItemClick = itemId => {};

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
