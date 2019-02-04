import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from './colourDomain.scss';
import { removeDomain } from '../../ColoursDomain/ColoursDomainActions';
import { COLOURS_DOMAIN_REDUCER } from '../../ColoursDomain/ColoursDomainReducer';

const { number, string, func, shape } = PropTypes;
class ColoursDomain extends Component {

  state = { isRemoving: false };
  static propTypes = {
    id: number.isRequired,
    name: string,
    removeDomain: func.isRequired,
    onRemove: func.isRequired,
    onClick: func.isRequired,
    error: shape({ message: string })
  }

  static defaultProps = {
    error: null,
    name: ''
  }

  onDomainSelectedHandler = () => {
    const { onClick, id } = this.props;
    onClick(id);
  }

  onDomainRemoveHandler = event => {
    event.stopPropagation();
    const { removeDomain, id, onRemove } = this.props;
    this.setState({ isRemoving: true }, async () => {
      await removeDomain(id);
      onRemove(id);
    });
  }

  renderRemoveButton = () => {
    const { isRemoving } = this.state;
    return (!isRemoving && <td><button type="button" onClick={this.onDomainRemoveHandler}>Remove</button></td>);
  }

  renderLabel = () => {
    const { isRemoving } = this.state;
    const { name } = this.props;
    const label = isRemoving ? 'Removing domain...' : name;
    return <td>{label}</td>;
  }

  render() {
    const { error } = this.props;
    if (error) {
      return error.message;
    }
    return (
      <tr className={style.dict} onClick={this.onDomainSelectedHandler}>
        {this.renderLabel()}
        {this.renderRemoveButton()}
      </tr>
    );
  }
}
const mapStateToProps = state => ({
  error: state[COLOURS_DOMAIN_REDUCER].error
});

const mapDispatchToProps = dispatch => ({
  removeDomain: (domainId) => dispatch(removeDomain(domainId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColoursDomain);
