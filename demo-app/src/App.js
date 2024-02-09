import './App.css';
import ClassCom from './basic/ClassCom';
import FuncCom from './basic/FuncCom';
import FuncRender from './basic/FuncRender';

function App() {
  const handleClick = (msg) => {
    console.log('接收到的消息：', msg);
  }

  return (
    <div className="App">
      <ClassCom name='类组件'></ClassCom>
      <FuncCom name='函数组件' getMsg={handleClick}></FuncCom>
      <FuncRender></FuncRender>
    </div>
  );
}

export default App;
