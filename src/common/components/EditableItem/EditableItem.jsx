import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './editableItem.scss';
import { PRICE } from '../../../components/ProductsDict/ProductColumns';

const { string, func, bool } = PropTypes;
class EditableItem extends Component {
  state = { value: '' };

  static propTypes = {
    id: string.isRequired,
    onChange: func,
    disabled: bool,
    defaultValue: string
  };

  static defaultProps = {
    onChange: () => {},
    disabled: false,
    defaultValue: ''
  };

  onChangeHandler = event => {
    const { onChange, id } = this.props;
    const rawValue = event.target.value;
    const currency = rawValue.split(' ')[1] || (isNaN(rawValue) ? '' : rawValue);
    const value = id.includes(PRICE) ? `CHF ${currency}` : rawValue;
    this.setState({ value }, () => onChange({ value, id }));
  };

  render() {
    const { value } = this.state;
    const { id, defaultValue, disabled } = this.props;
    return (
      <input
        id={id}
        type="text"
        onChange={this.onChangeHandler}
        value={defaultValue || value}
        disabled={disabled}
        className={style.editableItemInput}
      />
    );
  }
}

export default EditableItem;
