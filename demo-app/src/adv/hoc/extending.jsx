import React, { Component } from 'react';

class Index extends Component {
  render() {
    return (<div id='text'>
      <div>这是一个简单的组件</div>
    </div>)
  }
}

const logProps = (logMap) => {
  return (WarppedComponent) => {
    const didMount = WarppedComponent.prototype.componentDidMount;
    return class A extends WarppedComponent {
      componentDidMount() {

        if (didMount) {
          didMount.apply(this);
        }

        // 在WarppedComponent的componentDidMount执行完后，执行下面的代码
        Object.entries(logMap).forEach(([key, val]) => {
          if(document.getElementById(key)){
            console.log('埋点曝光：', val);
          }
        })
      }

      render() {
        return super.render();
      }
    }
  }
}

const LogIndex = logProps({ text: 'text_module_show' })(Index);

export default function Extending() {
  return ( <div><LogIndex /></div> )
}