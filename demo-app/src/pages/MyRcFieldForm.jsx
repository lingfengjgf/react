import Input from "../components/Input";
import Form, { Field } from "../components/my-rc-field-form";

const nameRules = {required: true, message: '请输入姓名！'};
const pwRules = {required: true, message: '请输入密码！'};

export default function MyRcFieldForm() {
  const [form] = Form.useForm();

  const onFinish = (val) => {
    console.log('onFinish', val);
  }

  // 表单校验失败执行
  const onFinishFailed = (val) => {
    console.log('onFinishFailed', val);
  }

  return (
    <div>
      <h3>MyRcFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="请输入用户名"></Input>
        </Field>
        <Field name="password" rules={[pwRules]}>
          <Input placeholder="请输入密码"></Input>
        </Field>
        <button>提交</button>
      </Form>
    </div>
  )
}