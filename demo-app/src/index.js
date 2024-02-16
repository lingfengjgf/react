import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { Provider } from 'react-redux';
import { Provider } from './adv/redux/myReactRedux';
import store from './adv/redux/store';
import ReactRouterPage from './pages/ReactRouterPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

// raect-router

root.render(
  <ReactRouterPage />
)

// react-redux

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

/*
root.render(
  <App />
  // StrictMode 会执行两遍生命周期
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
*/
