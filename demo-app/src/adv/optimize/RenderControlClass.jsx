import React, { Component } from 'react';

export default class RenderControlClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      count: 0
    }

    this.component = <Child num={this.state.num}></Child>
  }

  controlComponentRender = () => {
    const { props } = this.component;
    if (props.num !== this.state.num) {
      return this.component = React.cloneElement(this.component, { num: this.state.num })
    }
    return this.component;
  }

  render() {
    const { num, count } = this.state;

    return ( <div>
      {/* num没有变化Child也会重新渲染 */}
      {/* <Child num={num} /> */}
      
      {this.controlComponentRender()}
      <button onClick={() => this.setState({ num: num + 1 })}>num++</button>
      <button onClick={() => this.setState({ count: count + 1 })}>num++</button>
    </div> )
  }
}

const Child = ({ num }) => {
  console.log('子组件执行');
  return <div>Child -- {num}</div>
}