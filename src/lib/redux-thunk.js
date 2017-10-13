export default store => next => action => {
  console.log('we made it to thunk', action);
  return typeof action === 'function' ?
  action(store.dispatch, store.getState)
  : next(action);
};
