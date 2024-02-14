import applyMiddleware from "./applyMiddleware";

export const configureStore = function({ reducer, preloadedState, middleware = [] }) {
  let state = preloadedState ?? null;
  let listeners = [];

  // 加强dispatch
  if (middleware.length) {
    return applyMiddleware(middleware)(configureStore)(reducer, preloadedState);
  }

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(cb => cb());
  }

  function subscribe(cb) {
    listeners.push(cb);
    // 销毁
    return () => {
      const index = listeners.indexOf(cb);
      listeners.splice(index, 1);
    }
  }

  return {
    getState,
    dispatch,
    subscribe
  }

}