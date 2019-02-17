import { getDomains } from './DomainActions';
import { REMOVE_DOMAIN_SUCCESS, ADD_DOMAIN_SUCCESS } from './DomainActionType';

const actionTypes = [REMOVE_DOMAIN_SUCCESS, ADD_DOMAIN_SUCCESS];
const DomainMiddleware = store => next => action => {
  if (actionTypes.includes(action.type)) {
    store.dispatch(getDomains());
  }
  next(action);
};
export default DomainMiddleware;
