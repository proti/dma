import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './dict.scss';
import { removeDict } from './DictActions';
import { DICT_REDUCER } from './DictReducer';
import DictPropTypes from './DictPropTypes';

const { string, func, shape } = PropTypes;
class Dict extends Component {

  state = { isRemoving: false };
  static propTypes = {
    ...DictPropTypes,
    removeDict: func.isRequired,
    onRemove: func.isRequired,
    onClick: func.isRequired,
    error: shape({ message: string })
  }

  static defaultProps = {
    error: null
  }

  onDictSelectedHandler = () => {
    const { onClick, id } = this.props;
    onClick(id);
  }

  onDictRemoveHandler = event => {
    event.stopPropagation();
    const { removeDict, id, onRemove } = this.props;
    this.setState({ isRemoving: true }, async () => {
      await removeDict(id);
      onRemove(id);
    });
  }

  renderRemoveButton = () => {
    const { isRemoving } = this.state;
    return (!isRemoving && <td><button type="button" onClick={this.onDictRemoveHandler}>Remove</button></td>);
  }

  renderLabel = () => {
    const { isRemoving } = this.state;
    const { name } = this.props;
    const label = isRemoving ? 'Removing dict ...' : name;
    return <td>{label}</td>;
  }

  render() {
    const { error } = this.props;
    if (error) {
      return error.message;
    }
    return (
      <tr className={style.dict} onClick={this.onDictSelectedHandler}>
        {this.renderLabel()}
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
