import { useState, useCallback, PureComponent, useMemo } from "react";
import ReactDOM from "react-dom";
// import ReactDOM from "./my-react/react-dom";
// import Component from "./my-react/Component";
import "./index.css";
// import { useEffect, useLayoutEffect, useReducer, useState } from "./my-react/react";

// function FunctionComponent({name}) {
//   const [count1, setCount1] = useReducer(x => x + 1, 0);
//   const [count2, setCount2] = useState(1);
//   const [count3, setCount3] = useState(0);

//   useEffect(() => {
//     console.log('useEffect count3');
//   }, [count3])

//   useLayoutEffect(() => {
//     console.log('useLayoutEffect count3');
//   }, [count3])
//   return (
//     <div className="border">
//       <p>{name}</p>
//       <button onClick={setCount1}>{count1}</button>
//       <button onClick={() => setCount2(count2 + 1)}>{count2}</button>
//       <button onClick={() => setCount3(() => count3 + 1)}>{count3}</button>

//       <ul>
//         <li key='0'>0</li>
//         <li key='1'>1</li>
//         { count2 % 2 ? <li key='2'>2</li> : null }
//         <li key='3'>3</li>
//       </ul>
//     </div>
//   );
// }

// function FC() {
//   return (
//     <>
//       <h3>FC h3</h3>
//       <h4>FC h4</h4>
//     </>
//   )
// }

// class ClassComponent extends Component {
//   render() {
//     return (
//       <div className="border">
//         <p>{this.props.name}</p>
//       </div>
//     );
//   }
// }

export default function UseCallbackPage(props) {
  const [count, setCount] = useState(0);
  const addClick = () => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  };
  const cacheAdd = useCallback(addClick, [count]);
  const [value, setValue] = useState("");
  return (
    <div>
      <h3>UseCallbackPage</h3> <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
      <Child addClick={cacheAdd} />
    </div>
  );
}

class Child extends PureComponent {
  render() {
    console.log("child render");
    const { addClick } = this.props;
    return (
      <div>
        <h3>Child</h3>
        <button onClick={() => console.log(addClick())}>add</button>
      </div>
    );
  }
}

function UseMemoPage(props) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const expensive = () => {
    console.log("compute");
    let sum = 0;
    for (let i = 0; i < count; i++) {
      sum += i;
    }
    return sum;
  };

  const cacheExp = useMemo(expensive, [count]);
  return (
    <div>
      <h3>UseMemoPage</h3> <p>expensive:{cacheExp}</p> <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <input value={value} onChange={(event) => setValue(event.target.value)} />
    </div>
  );
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.baidu.com/">百度</a>
    {/* <FC />
    <ClassComponent name="class" /> */}
    {/* <FunctionComponent name="function" /> */}
    <UseCallbackPage />
    <UseMemoPage />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));

// console.log("React", React.version); //sy-log

// 原生标签
// 文本组件
// 函数组件
// 类组件

// /如何渲染节点
// 1、 渲染自己
// 2、更新节点
