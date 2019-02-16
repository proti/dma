import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Home/Home';
import {
  HOME,
  ADD_DICT,
  DETAILS_ID,
  DETAILS_DOMAIN_ID,
  ADD_DOMAIN,
  ADD_COLOUR
} from '../common/Routes';
import style from './app.scss';
import ProductDetails from '../components/ProductsDict/ProductDetails/ProductDetails';
import AddNewProduct from '../components/ProductsDict/AddNewProduct/AddNewProduct';
import DomainDetails from '../components/DomainsDict/DomainDetails/DomainDetails';
import AddNewDomain from '../components/DomainsDict/AddNewDomain/AddNewDomain';
import AddNewColour from '../components/ColoursDict/AddNewColour/AddNewColour';

const { shape, string } = PropTypes;
class App extends PureComponent {
  static propTypes = {
    error: shape({ message: string })
  };

  static defaultProps = {
    error: null
  };

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
          <Route path={DETAILS_ID} component={ProductDetails} />
          <Route path={ADD_DICT} component={AddNewProduct} />
          <Route path={DETAILS_DOMAIN_ID} component={DomainDetails} />
          <Route path={ADD_DOMAIN} component={AddNewDomain} />
          <Route path={ADD_COLOUR} component={AddNewColour} />
        </div>
      </Router>
    );
  }
}

export default App;
