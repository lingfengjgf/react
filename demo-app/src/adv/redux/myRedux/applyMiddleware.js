export default function applyMiddleware(middlewares) {
  return (configureStore) => (reducer, preloadedState) => {
    const store = configureStore({reducer, preloadedState});

    let dispatch = store.dispatch;

    // 给中间件传递的参数
    const midAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action) // 每个中间件有自己的dispatch，防止原始的dispatch多次调用
    }

    const chain = middlewares.map(middleware => {
      return middleware(midAPI)
    });

    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    }
  }
}

function compose(...fns) {
  if (!fns.length) {
    return (arg) => arg;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return fns.reduce((a, b) => (...args) => a(b(...args)));
}