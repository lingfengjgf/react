import React, { Component } from 'react';
import store from './store';

export default class ReduxPage extends Component {

  change = (type) => {
    store.dispatch({ type, payload: 10 })
  }

  asyncAdd = () => {
    store.dispatch((dispatch) => {
      setTimeout(() => {
        dispatch({ type: 'ADD', payload: 20 })
      }, 2000)
    })
  }

  promiseMinus = () => {
    store.dispatch(Promise.resolve({ type: 'MINUS', payload: 10 }))
  }

  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <div>{store.getState().count}</div>
        <button onClick={() => this.change('ADD')}>add 10</button>
        <button onClick={() => this.change('MINUS')}>minus 10</button>
        <button onClick={() => this.asyncAdd()}>asyncAdd 20</button>
        <button onClick={() => this.promiseMinus()}>promiseMinus 10</button>
      </div>
    )
  }
}