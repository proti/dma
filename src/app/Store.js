import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import appReducer, {
  APP_REDUCER
} from './AppReducer';
import dictReducer, {
  DICT_REDUCER
} from '../components/Dict/DictReducer';
import coloursDictReducer, {
  COLOURS_DICT_REDUCER
} from '../components/ColoursDict/ColoursDictReducer';
import coloursDomainReducer, {
  COLOURS_DOMAIN_REDUCER
} from '../components/ColoursDict/ColoursDomain/ColoursDomainReducer';

const store = createStore(
  combineReducers({
    [APP_REDUCER]: appReducer,
    [DICT_REDUCER]: dictReducer,
    [COLOURS_DICT_REDUCER]: coloursDictReducer,
    [COLOURS_DOMAIN_REDUCER]: coloursDomainReducer
  }),
  compose(
    applyMiddleware(thunk))
);

export default store;
