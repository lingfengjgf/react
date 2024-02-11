import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

export default function FuncRef(props) {

  const inputRef = useRef(null);
  const modelRef = useRef(null);

  return (
    <div>
      <h2>函数组件 Ref</h2>
      <FancyInput ref={inputRef}></FancyInput>
      <FancyModel ref={modelRef}></FancyModel>
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
      <button onClick={() => inputRef.current.setVal(123)}>赋值</button>
      <button onClick={() => modelRef.current.open(true)}>显示</button>
    </div>
  )
}

// 提供方法让父组件直接调用
const MyInput = (props, ref) => {
  const inputRef = useRef();

  const focus = () => {
    inputRef.current.focus();
  }

  const setVal = (val) => {
    inputRef.current.value = val;
  }

  useImperativeHandle(ref, () => ({ focus, setVal }));

  return <input type="text" ref={inputRef} />
}

const FancyInput = forwardRef(MyInput);

const MyModel = (props, ref) => {
  const [show, setShow] = useState(false);

  const open = (val) => {
    setShow(val);
  }

  useImperativeHandle(ref, () => ({ open, show })); 

  return <div>我是弹窗，我现在的状态是：{ show ? '显示' : '隐藏' }</div>
}

const FancyModel = forwardRef(MyModel);