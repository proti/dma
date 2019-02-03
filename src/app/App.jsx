import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import fetchDataset from './AppActions';
import Home from '../components/Home/Home';
import { HOME, EDIT_ID, ADD_DICT } from '../common/Routes';
import { APP_REDUCER } from './AppReducer';
import Edit from '../components/Edit/Edit';
import style from './app.scss';
import AddNewDict from '../components/AddNewDict/AddNewDict';

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

    ///https://github.com/supasate/connected-react-router/issues/159
    //https://codesandbox.io/s/p2wp49mmp0
    //https://github.com/ReactTraining/react-router/issues/4924
    return (
      <Router>
        <div className={style.app}>
          <Route path={HOME} component={Home} />
          <Switch>
            <Route path={EDIT_ID} component={Edit} />
            <Route path={ADD_DICT} component={AddNewDict} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  error: state[APP_REDUCER].error
});

export default connect(mapStateToProps)(App);
