// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import { configureStore, combineReducers } from '../myRedux';
// import { thunk } from 'redux-thunk';

export const counterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
  
    default:
      return state;
  }
} 

const store = configureStore({ 
  // reducer: counterReducer, 
  // preloadedState: 0 , 
  reducer: combineReducers({ count: counterReducer }), 
  preloadedState: { count: 0 } , 
  middleware: [thunk, promise, logger]
});

export default store;

function logger({ dispatch, getState }) {
  return (next) => (action) => {
    console.log('----------------');
    console.log(action.type + "执行了");

    const prevState = getState();
    console.log('prevState:', prevState);

    const returnVal = next(action);

    const nextState = getState();
    console.log('nextState:', nextState);

    console.log('----------------');

    return returnVal;
  }
}

function thunk({ dispatch, getState }) {
  return (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  }
}

function promise({ dispatch, getState }) {
  return (next) => (action) => {
    return action instanceof Promise ? action.then(dispatch) : next(action);
  }
}
