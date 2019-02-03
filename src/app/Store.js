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

const store = createStore(
  combineReducers({
    [APP_REDUCER]: appReducer,
    [DICT_REDUCER]: dictReducer
  }),
  compose(
    applyMiddleware(thunk))
);

export default store;
