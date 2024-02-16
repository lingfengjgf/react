import { Component, Suspense, lazy, useState } from 'react';
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation, useNavigate, useParams, useRoutes } from 'react-router-dom';
import './App.css';
// import ReactReduxHookPage from './adv/redux/ReactReduxHookPage';
// import ReactReduxPage from './adv/redux/ReactReduxPage';
// import ReduxPage from './adv/redux/ReduxPage';
// import MyRcFieldForm from './pages/MyRcFieldForm';
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

const NavMenu = ({ to, children }) => (
  <div style={{display: 'inline-block', margin: '10px'}}>
    <Link to={to}>{children}</Link>
  </div>
)

const Menu = () => (
  <div>
    <NavMenu to="./">首页</NavMenu>
    <NavMenu to="./news">新闻</NavMenu>
    <NavMenu to="./product/123">商品</NavMenu>
    <NavMenu to="./admin/user">会员-用户</NavMenu>
    <NavMenu to="./admin/info">会员-信息</NavMenu>
    <NavMenu to="./about">关于</NavMenu>
    <Outlet />
  </div>
)

const News = () => {
  const nav = useNavigate();
  return <div>
    <div>新闻页面</div>
    <button onClick={() => nav('/product/456')}> 去商品页面 </button>
  </div>
}

class Admin extends Component {
  componentDidMount() {
    console.log('Admin componentDidMount');
  }

  componentWillUnmount() {
    console.log('Admin componentWillUnmount');
  }
  render() {
    return (
      <div><h3>会员页面</h3><Outlet /></div>
    )
  }
}

// 动态加载
const DynamicAboutPage = lazy(() => import('./pages/AboutPage'));

const routes = [
  {
    path:'/', element: <Menu />,
    children: [
      { path: '/', element: <div>首页页面</div> },
      { path: '/news', element: <News /> },
      { path: '/product/:id', element: <Product /> },
      { path: '*', element: <div>404页面</div> },
      { path: '/admin', element: <Admin />, 
        children: [
          { path: '/admin/user', element: <div>会员-用户页面</div> },
          { path: '/admin/info', element: <div>会员-信息页面</div> },
        ]
      },
      { path: '/about', 
        element: <div>
          <Suspense fallback={<div>loading...</div>}>
            <DynamicAboutPage />
          </Suspense>
        </div> 
      }
    ]
  }
]

const Routing = () => useRoutes(routes);

function App() {
  // const handleClick = (msg) => {
  //   console.log('接收到的消息：', msg);
  // }

  // const [num, setNum] = useState(1);

  // setTimeout(() => {
  //   setNum(10);
  // }, 3000)

  return (
    <BrowserRouter>
      <Routing />

      {/* <div>
        <Link to='./'>首页</Link>
        <Link to='./news'>新闻</Link>
        <Link to='./about'>关于</Link>
        <Link to='./admin/user'>会员-用户</Link>
        <Link to='./admin/info'>会员-信息</Link>
        <Link to='./product/123'>商品</Link>
      </div>
      <Routes>
        <Route path='/' element={<div>首页页面</div>}></Route>
        <Route path='/news' element={<div>新闻页面</div>}></Route>
        <Route path='/about' element={<div>关于页面</div>}></Route>
        <Route path='/product/:id' element={<Product></Product>}></Route>
        <Route path='*' element={<div>404页面</div>}></Route>
        <Route path='/admin'>
          <Route path='/admin/user' element={<div>用户页面</div>}></Route>
          <Route path='/admin/info' element={<div>信息页面</div>}></Route>
        </Route>
      </Routes> */}
    {/* <div className="App"> */}
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

      {/* <MyRcFieldForm></MyRcFieldForm> */}

      {/* <ReduxPage></ReduxPage> */}
      {/* <ReactReduxPage />
      <ReactReduxHookPage /> */}
    {/* </div> */}
    </BrowserRouter>
  );
}

function Product() {
  const params = useParams();
  const location = useLocation();
  console.log('Product params:', params);
  console.log('Product location:', location);
  return (
    <div>
      <h3>Product - {params.id}</h3>
    </div>
  )
}

export default App;
