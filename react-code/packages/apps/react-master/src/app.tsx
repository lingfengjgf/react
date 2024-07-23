import * as React from 'react';
import styles from "./app.module.less";
import { HashRouter, useRoutes } from 'react-router-dom';
import { router } from './router';

type Props = {}

const Routes = () => useRoutes(router);

function App({}: Props) {
  console.log('test');
  console.log('router：',router);
  
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  )
}

export default App;