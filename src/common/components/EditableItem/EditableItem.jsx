import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './editableItem.scss';
import { PRICE } from '../../ColumnName';

const { string, func, bool } = PropTypes;
class EditableItem extends Component {
  state = { value: '' }

  static propTypes = {
    id: string.isRequired,
    onChange: func,
    disabled: bool,
    defaultValue: string
  };

  static defaultProps = {
    onChange: () => { },
    disabled: false,
    defaultValue: ''
  };

  onChangeHandler = event => {
    const { onChange, id } = this.props;
    const rawValue = event.target.value;
    const currency = rawValue.split(' ')[1] || (isNaN(rawValue) ? 0 : rawValue);
    const value = id === PRICE ? `CHF ${currency}` : rawValue;
    this.setState({ value }, () => onChange({ value, id }));
  }

  render() {
    const { value } = this.state;
    const { id, defaultValue, disabled } = this.props;
    return (
      <input
        id={id}
        type="text"
        onChange={this.onChangeHandler}
        value={value || defaultValue}
        disabled={disabled}
      />
    );
  }
}

export default EditableItem;
