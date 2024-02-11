import React, { Component } from 'react';
import { ThemeContext } from './ThemeContext';

export default class ClassContext extends Component {

  state = { theme: 'dark' };

  render() {

    return (
      <ThemeContext.Provider value={this.state.theme}>
        <div>类组件 Context</div>
        <Parent></Parent>
        <button onClick={() => this.setState({ theme: 'light' })}>light</button>
        <button onClick={() => this.setState({ theme: 'dark' })}>dark</button>
      </ThemeContext.Provider>
    )
  }
}

const Parent = () => <div>
  <Child1></Child1>
  <Child2></Child2>
</div>

class Child1 extends Component {
  // 注入方式1
  static contextType = ThemeContext;
  render() {
    return <div>Child1 -- {this.context}</div>
  }
}

class Child2 extends Component {
  // 注入方式2
  render() {
    return <div>
      <ThemeContext.Consumer>
        {
          (theme) => <div>Child2 -- {theme}</div>
        }
      </ThemeContext.Consumer>
    </div>
  }
}