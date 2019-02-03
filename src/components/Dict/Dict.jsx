import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './dict.scss';
import removeDict from './DictActions';
import { DICT_REDUCER } from './DictReducer';

const { number, string, bool, func, shape } = PropTypes;
class Dict extends Component {

  static propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    isEditable: bool,
    removeDict: func.isRequired,
    error: shape({ message: string })
  }

  static defaultProps = {
    error: null,
    isEditable: true
  }

  onDictSelectedHandler = (e) => {
    if (e.target.type !== 'button') {
      console.log("show items of dict:", this.props.id);
    }
  }

  onDictRemoveHandler = () => {
    const { removeDict, id } = this.props;
    removeDict(id);
  }

  renderRemoveButton = () => {
    const { isEditable } = this.props;
    return (isEditable && <td><button type="button" onClick={this.onDictRemoveHandler}>Remove dict</button></td>);
  }

  render() {
    const { name, error } = this.props;
    if (error) {
      return error.message;
    }
    return (
      <tr className={style.dict} onClick={this.onDictSelectedHandler}>
        <td>
          {name}
        </td>
        {this.renderRemoveButton()}
      </tr>
    );
  }
}
const mapStateToProps = state => ({
  error: state[DICT_REDUCER].error
});
const mapDispatchToProps = dispatch => ({
  removeDict: (dictId) => dispatch(removeDict(dictId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dict);
