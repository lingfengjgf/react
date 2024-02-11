import React, { Component, createRef } from 'react';

export default class ClassRef extends Component {
  constructor(props) {
    super(props);

    this.divRef = createRef();
    this.inputRef = createRef();
  }

  handleClick = () => {
    // 点击按钮聚焦input
    this.inputRef.current.focus();
    
    console.log('divRef:', this.divRef);
    // 使用id获取元素会破坏react的封装
    console.log('d1:', document.getElementById('d1'));
  }

  render() {

    return (
      <div>
        <h2>类组件 Ref</h2>
        <div id='d1' ref={this.divRef}></div>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.handleClick}>Focus</button>
      </div>
    )
  }
}