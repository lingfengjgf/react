import Field from './Field';
import _Form from './Form';
import useForm from './useForm';

const Form = _Form;
Form.Field = Field;
Form.useForm = useForm;

export { Field, useForm };
export default Form;