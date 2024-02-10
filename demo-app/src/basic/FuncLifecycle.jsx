import React, { useEffect, useState } from 'react';

export default function FuncLifecycle(props) {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log('回调函数执行 count:', count);
  //   return () => {
  //     console.log('destory执行 count:', count);
  //   }
  // }, [count])

  const [msg, setMsg] = useState(() => {
    // getDerivedStateFromProps (部分模拟)
    return 'hellow FuncLifecycle';
  });

  useEffect(() => {
    console.log('componentDidMount');
    return () => {
      console.log('componentWillUnmount');
    }
  }, [])

  useEffect(() => {
    console.log('componentWillReceiveProps');
  }, [props])

  useEffect(() => {
    console.log('componentDidUpdate');
  })

  return (
    <div>
      <h2>函数组件生命周期</h2>
      <div>the msg is : {msg}</div>
      <div>the count is : {count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}