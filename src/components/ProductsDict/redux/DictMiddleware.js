import {
  SAVE_DICT_BY_ID_SUCCESS,
  DICT_REMOVE_SUCCESS,
  ADD_NEW_DICT_SUCCESS
} from './DictActionType';
import { fetchDicts } from './DictActions';

const actionTypes = [SAVE_DICT_BY_ID_SUCCESS, DICT_REMOVE_SUCCESS, ADD_NEW_DICT_SUCCESS];
const DictMiddleware = store => next => action => {
  if (actionTypes.includes(action.type)) {
    store.dispatch(fetchDicts());
  }
  next(action);
};
export default DictMiddleware;
