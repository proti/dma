import { getDomains } from './DomainActions';
import {
  REMOVE_DOMAIN_SUCCESS,
  ADD_DOMAIN_SUCCESS,
  SAVE_DOMAIN_BY_ID_SUCCESS
} from './DomainActionType';

const actionTypes = [REMOVE_DOMAIN_SUCCESS, ADD_DOMAIN_SUCCESS, SAVE_DOMAIN_BY_ID_SUCCESS];
const DomainMiddleware = store => next => action => {
  if (actionTypes.includes(action.type)) {
    store.dispatch(getDomains());
  }
  next(action);
};
export default DomainMiddleware;
