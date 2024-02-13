import { useRef } from "react";

class FormStore {
  constructor() {
    // state 仓库
    this.store = {};

    // field实例
    this.fieldEntities = [];

    // 校验成功/失败后执行的回调
    this.callbacks = {};

  }

  //get
  getFieldsValue = () => {
    return {...this.store};
  }

  getFieldValue = (name) => {
    return this.store[name];
  }

  //set
  setFieldsValue = (newStore) => {
    this.store = { ...this.store, ...newStore };

    // 订阅组件更新
    this.fieldEntities.forEach(field => {
      Object.keys(newStore).forEach(key => {
        if (key === field.props.name) {
          field.onStoreChange();
        }
      })
    });
  }

  // 保存每一个field组件实例
  registerFieldEntities = (field) => {
    this.fieldEntities.push(field);

    // 取消订阅
    return () => {
      this.fieldEntities = this.fieldEntities.filter(_f => _f !== field);
      delete this.store[field.props.name];
    }
  }

  setValidates = (newValidate) => {
    this.callbacks = { ...this.callbacks, ...newValidate };
  }

  setRules = (name, rules) => {
    if (this.rules[name]) {
      this.rules[name].push(...rules);
    } else {
      this.rules[name] = rules;
    }
  }

  // 校验
  validate = () => {
    let err = [];
    const res = this.getFieldsValue();
    this.fieldEntities.forEach(field => {
      const { name, rules = [] } = field.props;
      if (rules.length) {
        rules.forEach(rule => {
          if (rule.required && !res[name]) {
            // 必填
            err.push({ [name]: rule.message, value: res[name] })
          }
        })
      }
    })
    return err;
  }

  // 提交
  onSubmit = () => {
    let err = this.validate();
    if (!err.length) {
      // onFinish
      this.callbacks.onFinish(this.getFieldsValue());
    } else {
      // onFinishFailed
      this.callbacks.onFinishFailed(err, this.getFieldsValue());
    }
  }

  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      registerFieldEntities: this.registerFieldEntities,
      onSubmit: this.onSubmit,
      setValidates: this.setValidates,
    }
  }

}


export default function useForm(form) {
  // 把getForm存起来，保证每次更新用的都是同一个getForm
  const formRef = useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}