import FieldContext from "./FieldContext";
import useForm from "./useForm"

export default function Form({ form, children, onFinish, onFinishFailed }) {
  const [formInstance] = useForm(form);

  formInstance.setValidates({ onFinish, onFinishFailed });

  return <form onSubmit={(e) => {
    e.preventDefault();
    formInstance.onSubmit();
  }}>
    <FieldContext.Provider value={formInstance}>
      {children}
    </FieldContext.Provider>
  </form>
}
