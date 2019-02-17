import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import dictReducer, { DICT_REDUCER } from '../components/ProductsDict/redux/DictReducer';
import coloursDictReducer, {
  COLOURS_DICT_REDUCER
} from '../components/ColoursDict/ColoursDictReducer';
import coloursDomainReducer, {
  COLOURS_DOMAIN_REDUCER
} from '../components/DomainsDict/redux/ColoursDomainReducer';

const store = createStore(
  combineReducers({
    [DICT_REDUCER]: dictReducer,
    [COLOURS_DICT_REDUCER]: coloursDictReducer,
    [COLOURS_DOMAIN_REDUCER]: coloursDomainReducer
  }),
  compose(applyMiddleware(thunk))
);

export default store;
