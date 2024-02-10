import { useState } from 'react';
import './App.css';
// import ClassCom from './basic/ClassCom';
// import FuncCom from './basic/FuncCom';
// import FuncRender from './basic/FuncRender';

// import ClassLifecycle from './basic/ClassLifecycle';
import FuncLifecycle from './basic/FuncLifecycle';

function App() {
  // const handleClick = (msg) => {
  //   console.log('接收到的消息：', msg);
  // }

  const [num, setNum] = useState(1);

  setTimeout(() => {
    setNum(10);
  }, 3000)

  return (
    <div className="App">
      {/* <ClassCom name='类组件'></ClassCom>
      <FuncCom name='函数组件' getMsg={handleClick}></FuncCom>
      <FuncRender></FuncRender> */}

      {/* <ClassLifecycle num={num}></ClassLifecycle> */}
      <FuncLifecycle num={num}></FuncLifecycle>
    </div>
  );
}

export default App;
