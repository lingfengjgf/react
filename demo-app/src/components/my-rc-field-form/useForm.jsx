import { useRef } from "react";

class FormStore {
  constructor() {
    // state 仓库
    this.store = {};

    this.fieldEntities = [];
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
    this.fieldEntities.forEach(cb => cb.onStoreChange());
  }

  //保存每一个field组件实例
  registerFieldEntities = (field) => {
    this.fieldEntities.push(field);
  }

  getForm = () => {
    return {
      setFieldsValue: this.setFieldsValue,
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      registerFieldEntities: this.registerFieldEntities,
    }
  }

  // 订阅组件更新

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