// import {useReducer} from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "./my-react/react-dom";
import Component from "./my-react/Component";
import "./index.css";
import { useReducer, useState } from "./my-react/react";

function FunctionComponent({name}) {
  const [count1, setCount1] = useReducer(x => x + 1, 0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  return (
    <div className="border">
      <p>{name}</p>
      <button onClick={setCount1}>{count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>{count2}</button>
      <button onClick={() => setCount3(() => count3 + 1)}>{count3}</button>
    </div>
  );
}

function FC() {
  return (
    <>
      <h3>FC h3</h3>
      <h4>FC h4</h4>
    </>
  )
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <p>{this.props.name}</p>
      </div>
    );
  }
}

const jsx = (
  <div className="border">
    <h1>全栈</h1>
    <a href="https://www.baidu.com/">百度</a>
    <FC />
    <ClassComponent name="class" />
    <FunctionComponent name="function" />
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
