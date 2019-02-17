import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import dictReducer, { DICT_REDUCER } from '../components/ProductsDict/redux/DictReducer';
import coloursDictReducer, {
  COLOURS_DICT_REDUCER
} from '../components/ColoursDict/redux/ColoursDictReducer';
import coloursDomainReducer, {
  DOMAIN_REDUCER
} from '../components/DomainsDict/redux/DomainReducer';
import DictMiddleware from '../components/ProductsDict/redux/DictMiddleware';
import DomainMiddleware from '../components/DomainsDict/redux/DomainMiddleware';

const store = createStore(
  combineReducers({
    [DICT_REDUCER]: dictReducer,
    [COLOURS_DICT_REDUCER]: coloursDictReducer,
    [DOMAIN_REDUCER]: coloursDomainReducer
  }),
  compose(applyMiddleware(thunk, DictMiddleware, DomainMiddleware))
);

export default store;
