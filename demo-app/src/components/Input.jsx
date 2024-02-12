import React, { Component } from 'react';

class Input extends Component {
  render() {
    const { value = '', ...otherProps } = this.props;
    return (
      <div style={{ padding: 10 }}>
        <input style={{ outline: 'none'}} type="text" value={value} {...otherProps} />
      </div>
    )
  }
}

export default Input;