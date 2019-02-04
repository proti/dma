import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './coloursDomain.scss';
import { COLOURS_DOMAIN_REDUCER } from './ColoursDomainReducer';
import { getDomains, saveDomain } from './ColoursDomainActions';

const { arrayOf, shape, number, string, func } = PropTypes;
class ColoursDomain extends Component {
  state = { domains: [] }

  static propTypes = {
    colours: arrayOf(string)
    // domains: arrayOf(shape({ id: number, colours: arrayOf(string) })),
  };

  static defaultProps = {
    colours: null
    // domains: null
  };

  renderDict = () => {
    const { domains } = this.state;
    //return data.map(colour =)
  }

  onSubmitHandler = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className={style.coloursDict}>
        <form onSubmit={this.onSubmitHandler} noValidate>
          <fieldset>
            <div>
              <span>Colours Domain:</span>
            </div>
          </fieldset>
          <fieldset>
            <table>
              <thead>
                <tr>
                  <th>
                    Domain
                  </th>
                  <th>
                    Range
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderDict()}
              </tbody>
            </table>
          </fieldset>
          <button type="button" onClick={this.onAddRowClickHandler}>Add row</button>
          <button type="submit">Save changes</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state[COLOURS_DOMAIN_REDUCER].error
});

const mapDispatchToProps = dispatch => ({
  saveDomain: (domain) => dispatch(saveDomain(domain))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColoursDomain);
