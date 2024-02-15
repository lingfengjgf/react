import React, { useCallback, useContext, useLayoutEffect, useReducer, useState } from 'react';
import { bindActionCreators } from '../myRedux';

// 1 创建context对象
const Context = React.createContext();

// 2 Provider传递value
export const Provider = ({ children, store }) => {
  return <Context.Provider value={store}> {children} </Context.Provider>
}

// 3 子孙组件消费value
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappendComponent) => (props) => {
  const store = useContext(Context);
  const stateProps = mapStateToProps(store.getState());
  let dispatchProps = {dispatch: store.dispatch};

  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(store.dispatch)
  } else if (typeof mapDispatchToProps === 'object' && mapDispatchToProps !== null) {
    dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
  }

  // 更新组件
  const forceUpdate = useForceUpdate();

  // 不使用useEffect，有延迟，防止漏掉订阅
  useLayoutEffect(() => {
    const unSubscribe = store.subscribe(() => {
      forceUpdate();
    })

    return () => { unSubscribe() };
  }, [store])

  return <WrappendComponent {...props} {...stateProps} {...dispatchProps} />
}

function useForceUpdate() {
  // const [, setState] = useState(0);
  const [, setState] = useReducer(prev => prev + 1, 0);

  const update = useCallback(() => {
    // setState(prev => prev + 1);
    setState();
  }, []);

  return update;
}


// hooks
export function useDispatch () {
  const store = useContext(Context);
  return store.dispatch;
}

export function useSelector (selector) {
  const store = useContext(Context);

  // 更新组件
  const forceUpdate = useForceUpdate();

  // 不使用useEffect，有延迟，防止漏掉订阅
  useLayoutEffect(() => {
    const unSubscribe = store.subscribe(() => {
      forceUpdate();
    })

    return () => { unSubscribe() };
  }, [store])

  return selector(store.getState());
}