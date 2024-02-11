import React from 'react';

function Property() {
  return ( <div>我是一个普通的组件</div> )
}

// 高阶组件
const withCard = (color) => (Component) => {
  return (props) => {
    const hocStyle = {
      margin: '10px',
      padding: '10px',
      border: '1px solid #f1f1f1',
      borderRadius: '8px',
      background: color
    }

    return <div style={hocStyle}>
      <Component {...props} />
    </div>
  }
}

export default withCard('#4399eb')(Property);