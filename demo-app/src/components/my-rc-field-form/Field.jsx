import React, { Component } from 'react';
import FieldContext from './FieldContext';

class Field extends Component {
  static contextType = FieldContext;

  // 更新组件
  onStoreChange = () => {
    this.forceUpdate();
  }
  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context;
    const { name } = this.props;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newVal = e.target.value;
        setFieldsValue({ [name]: newVal });
        console.log(newVal);
      }
    }
  }

  componentDidMount() {
    this.context.registerFieldEntities(this);
  }

  render() {
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled());
    return returnChildNode
  }
}

export default Field;
