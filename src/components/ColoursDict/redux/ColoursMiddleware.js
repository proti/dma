import { getColours } from './ColoursDictActions';
import { ADD_COLOUR_SUCCESS, SAVE_COLOURS_SUCCESS } from './ColoursDictActionType';

const actionTypes = [SAVE_COLOURS_SUCCESS, ADD_COLOUR_SUCCESS];
const ColorsMiddleware = store => next => action => {
  if (actionTypes.includes(action.type)) {
    store.dispatch(getColours());
  }
  next(action);
};
export default ColorsMiddleware;
