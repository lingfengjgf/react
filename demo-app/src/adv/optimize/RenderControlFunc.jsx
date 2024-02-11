import React, { useMemo, useState } from 'react';

const Child = ({ num }) => {
  console.log('子组件执行');
  return <div>Child -- {num}</div>
}

export default function RenderControlFunc() {
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);

  return <div>
    {useMemo(() => <Child num={num} />, [num])}
    <button onClick={() => setNum(num + 1)}>num++</button>
    <button onClick={() => setCount(count + 1)}>count++</button>
  </div>
}