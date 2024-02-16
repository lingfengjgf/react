import { BrowserRouter, Link, Route, Routes, useLocation, useParams } from '../adv/my-react-router-dom';

function ReactRouterPage() {
  return (
    <BrowserRouter>
      <div>
        <Link to='/'>首页</Link>
        <Link to='/news'>新闻</Link>
        <Link to='/about'>关于</Link>
        <Link to='/admin/user'>会员-用户</Link>
        <Link to='/admin/info'>会员-信息</Link>
        <Link to='/product/123'>商品</Link>
      </div>
      <Routes>
        <Route path='/' element={<div>首页页面</div>}></Route>
        <Route path='/news' element={<div>新闻页面</div>}></Route>
        <Route path='/about' element={<div>关于页面</div>}></Route>
        <Route path='*' element={<div>404页面</div>}></Route>
        <Route path='/product/:id' element={<Product></Product>}></Route>
        {/* <Route path='/admin'>
          <Route path='/admin/user' element={<div>用户页面</div>}></Route>
          <Route path='/admin/info' element={<div>信息页面</div>}></Route>
        </Route> */}
      </Routes>
 
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

export default ReactRouterPage;
