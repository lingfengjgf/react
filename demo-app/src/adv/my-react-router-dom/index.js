import React, { createContext, createElement, useContext, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createBrowserHistory } from "history";
import { match } from 'path-to-regexp';

const LocationContext = createContext({});
const NavigatorContext = createContext({});
const MatchContext = createContext({});

export function BrowserRouter({ children }) {
  let historyRef = useRef();
  if (!historyRef.current) {
    historyRef.current = createBrowserHistory();
  }

  let history = historyRef.current;

  let [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  // 监听 history, 当history变化时，派发更新，渲染 router 树
  useLayoutEffect(() => history.listen(setState), [history]);

  return <Router children={children} location={state.location} navigator={history} navigationType={state.action} />
}

function Router({ children, location: locationProp, navigator }) {
  const navigatorContext = useMemo(() => ({ navigator }), [navigator]);
  const locationContext = useMemo(() => ({ location: locationProp }), [locationProp]);

  return <NavigatorContext.Provider value={navigatorContext}>
      <LocationContext.Provider value={locationContext} children={children}></LocationContext.Provider>
  </NavigatorContext.Provider>
}

export function useLocation() {
  return useContext(LocationContext).location;
}

export function useNavigate() {
  return useContext(NavigatorContext).navigator;
}

export function useMatch() {
  return useContext(MatchContext).match;
}

export function useParams() {
  const match = useMatch();
  return match.params || {};
}

// 使用：const Routing = () => useRoutes(routes);
// useRoutes的作用是根据url返回对应的element
export function useRoutes(routes) {
  const location = useLocation();
  const currentPath = location.pathname || '/';
  let defaultEle = null;
  for (let i = 0; i < routes.length; i++) {
    let { path, element } = routes[i];
    if (path === '*') {
      defaultEle = element;
    }
    let match = matchPath(currentPath, path);
    if (match) {
      return createElement(() => element, { match });
    }
  }

  return defaultEle;
}

function matchPath(currentPath, path) {
  let res = null;
  if (path.indexOf('/:') > -1) {
    const matched = match(path);
    res = matched(currentPath);
  } else if (currentPath===path) {
    res = {
      path: currentPath,
      params: {}
    }
  }

  return res;
}

export const Routes = ({ children }) => {
  const route = useRoutes(createRoutesFromChildren(children));
  let match = route.props.match;
  const matchContext = useMemo(() => ({ match }), [match]);
  return <MatchContext.Provider value={matchContext}>{route}</MatchContext.Provider>;
};

// 将嵌套的<Route />组件转成树
export const createRoutesFromChildren = (children) => {
  const routes = [];
  React.Children.forEach(children, (node) => {

    let route = {
      path: node.props.path,
      element: node.props.element
    }

    if (node.props.children) {
      route.children = createRoutesFromChildren(node.props.children);
    }
    routes.push(route);
  })

  return routes;
}

export function Link({ to, children }) {
  const nav = useNavigate();
  const handle = (e) => {
    e.preventDefault();
    nav.push(to);
  }
  return (
    <a href={to} onClick={handle}>{children}</a>
  )
}

export const Route = () => {}