import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import fetchDataset from './AppActions';
import Home from '../components/Home/Home';
import { HOME } from '../common/Routes';
import { APP_REDUCER } from './AppReducer';

const { func, shape, string } = PropTypes;
class App extends PureComponent {

  static propTypes = {
    dispatch: func.isRequired,
    error: shape({ message: string })
  }

  static defaultProps = {
    error: null
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataset());
  }

  render() {
    const { error } = this.props;
    if (error) {
      return error.message;
    }
    return (
      <Router>
        <Route path={HOME} component={Home} />
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  error: state[APP_REDUCER].error
});

export default connect(mapStateToProps)(App);
