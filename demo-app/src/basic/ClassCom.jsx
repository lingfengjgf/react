import React, { Component } from 'react';

export default class ClassCom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: 'hellow ClassCom',
      count: 0
    }
  }

  handleClick = (type) => {
    this.setState({
      count: this.state.count + (type === 'plus' ? 1 : -1)
    }, () => {
      console.log('最新的count:', this.state.count);
    })

    console.log('未更新的count:', this.state.count);
  }

  handleChange = (event) => {
    this.setState({
      msg: event.target.value
    })
  }

  render() {
    const { msg, count } = this.state;

    return (
      <div>
        <h2>{this.props.name}</h2>
        <input type="text" value={msg} onChange={this.handleChange} />
        <div>the count is : {count}</div>
        <button onClick={this.handleClick.bind(this, 'plus')}>+</button>
        <button onClick={() => this.handleClick('minus')}>-</button>
      </div>
    )
  }
}