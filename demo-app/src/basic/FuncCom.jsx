import React, { useState } from 'react';

export default function FuncCom(props) {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('hellow FuncCom');

  const handleChange = (event) => {
    setMsg(event.target.value)
  }

  const handleFather = () => {
    props.getMsg('子组件的消息')
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <input type="text" value={msg} onChange={handleChange} />
        <div>the count is : {count}</div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
        <br />
        <button onClick={handleFather}>发送消息</button>
    </div>
  )
}