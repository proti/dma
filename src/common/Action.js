const Action = (actionType, payload) => {
  return {
    type: actionType,
    payload
  };
};
export default Action;
