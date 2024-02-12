import { useState } from 'react';
import './App.css';
import MyRcFieldForm from './pages/MyRcFieldForm';
// import RenderControlClass from './adv/optimize/RenderControlClass';
// import RenderControlFunc from './adv/optimize/RenderControlFunc';
// import Property from './adv/hoc/Property';
// import Extending from './adv/hoc/extending';
// import ClassContext from './adv/context/ClassContext';
// import FuncContext from './adv/context/FuncContext';
// import ClassRef from './adv/ref/ClassRef';
// import FuncRef from './adv/ref/FuncRef';
// import ClassCom from './basic/ClassCom';
// import FuncCom from './basic/FuncCom';
// import FuncRender from './basic/FuncRender';

// import ClassLifecycle from './basic/ClassLifecycle';
// import FuncLifecycle from './basic/FuncLifecycle';

function App() {
  // const handleClick = (msg) => {
  //   console.log('接收到的消息：', msg);
  // }

  // const [num, setNum] = useState(1);

  // setTimeout(() => {
  //   setNum(10);
  // }, 3000)

  return (
    <div className="App">
      {/* <ClassCom name='类组件'></ClassCom>
      <FuncCom name='函数组件' getMsg={handleClick}></FuncCom>
      <FuncRender></FuncRender> */}

      {/* <ClassLifecycle num={num}></ClassLifecycle> */}
      {/* <FuncLifecycle num={num}></FuncLifecycle> */}

      {/* <ClassRef></ClassRef>
      <FuncRef></FuncRef> */}

      {/* <ClassContext></ClassContext>
      <FuncContext></FuncContext> */}

      {/* <Property></Property>
      <Extending></Extending> */}

      {/* <RenderControlClass></RenderControlClass>
      <RenderControlFunc></RenderControlFunc> */}

      <MyRcFieldForm></MyRcFieldForm>
    </div>
  );
}

export default App;
