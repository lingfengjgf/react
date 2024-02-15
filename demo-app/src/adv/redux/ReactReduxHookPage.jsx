import React, { useCallback } from 'react';
import { useDispatch, useSelector } from './myReactRedux';
// import { useDispatch, useSelector } from 'react-redux';


export default function ReactReduxHookPage() {
  const count = useSelector(({count}) => count);
  const dispatch = useDispatch();
  const add = useCallback(() => {
    dispatch({type: 'ADD'})
  }, [])

  return (
    <div>
      <h3>ReactReduxHookPage</h3>
      <div>{count}</div>
      <button onClick={add}>add</button>
    </div>
  )
}