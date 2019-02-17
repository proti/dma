import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import productReducer, { PRODUCT_REDUCER } from '../components/ProductsDict/redux/ProductReducer';
import coloursDictReducer, {
  COLOURS_DICT_REDUCER
} from '../components/ColoursDict/redux/ColoursDictReducer';
import coloursDomainReducer, {
  DOMAIN_REDUCER
} from '../components/DomainsDict/redux/DomainReducer';
import ProductMiddleware from '../components/ProductsDict/redux/ProductMiddleware';
import DomainMiddleware from '../components/DomainsDict/redux/DomainMiddleware';
import ColorsMiddleware from '../components/ColoursDict/redux/ColoursMiddleware';

const store = createStore(
  combineReducers({
    [PRODUCT_REDUCER]: productReducer,
    [COLOURS_DICT_REDUCER]: coloursDictReducer,
    [DOMAIN_REDUCER]: coloursDomainReducer
  }),
  compose(applyMiddleware(thunk, ProductMiddleware, DomainMiddleware, ColorsMiddleware))
);

export default store;
