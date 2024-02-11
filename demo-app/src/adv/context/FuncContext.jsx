import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const navigator = window.history;

export default function FuncContext(props) {

  return (
    <ThemeContext.Provider value={navigator}>
      <div>函数组件 Context</div>
      <Parent></Parent>
    </ThemeContext.Provider>
  )
}

const Parent = () => <Child />

const Child = () => {
  // 将navigator注入到组件中
  const navigator = useContext(ThemeContext);
  return <div>
    <button onClick={() => navigator.pushState({}, undefined, './main')}>toMain</button>
  </div>
}