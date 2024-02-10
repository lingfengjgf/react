import React, { Component } from 'react';

export default class ClassLifecycle extends Component {
  constructor(props) {
    super(props);

    console.log('1. constructor run...');
    this.state = {
      msg: 'hellow ClassLifecycle',
      count: 1
    }
  }

  // 静态函数，接收props和state，返回值会和state合并
  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps run...');
    const { num } = props;
    const msg = num === 1 ? 'getDerivedStateFromProps' : 'hellow ClassLifecycle';
    return { msg };
  }

  // 组件渲染前执行，和getDerivedStateFromProps不能同时存在
  // componentWillMount() {
  //   console.log('3. componentWillMount run...');
  // }

  // 首次渲染完成
  componentDidMount() {
    console.log('5. componentDidMount run...');
  }

  // 当props中有数据发生改变时执行，在这里可以控制state是否更新，和getDerivedStateFromProps不能同时存在
  // componentWillReceiveProps(nextProps) {
  //   console.log('componentWillReceiveProps nextProps:', nextProps);
  //   this.setState({ count: nextProps.num })
  // }

  // 返回bool，决定组件是否更新
  // nextState拿到的是getDerivedStateFromProps处理后的state
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate nextProps:', nextProps);
    console.log('shouldComponentUpdate nextState:', nextState);
    return nextState.count < 5;
  }

  // 组件更新前执行，可以获取组件当前的状态、DOM位置等
  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }

  // 组件更新前的快照
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate prevProps:', prevProps);
    console.log('getSnapshotBeforeUpdate prevState:', prevState);
    console.log('getSnapshotBeforeUpdate state:', this.state);
    return null;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  // 组件销毁前执行，清除闭包、定时器、事件
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // 首次渲染
  render() {
    console.log('4. render run...');
    const { msg, count } = this.state;

    return (
      <div>
        <h2>类组件生命周期</h2>
        <div>the msg is : {msg}</div>
        <div>the count is : {count}</div>
      </div>
    )
  }
}