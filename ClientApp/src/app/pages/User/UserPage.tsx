import { Form, Input, Button } from 'antd';
import Password from 'antd/es/input/Password';
import { useCallback } from 'react';
import { useFormload } from 'src/app/Hooks/useFormload';

const UserPage = () => {
  const { readOnly, id, action, formRef } = useFormload('User');
  const onFinish = useCallback((values: unknown) => {
    console.log('Form values:', values);
    alert(JSON.stringify(values));
  }, []);
  return (
    <Form
      ref={formRef}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 800 }}
      //initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the name!' }]}
      >
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter the password!' }]}
      >
        <Password readOnly={readOnly} />
      </Form.Item>

      <Form.Item
        label="Permission"
        name="permission"
        rules={[{ required: true, message: 'Please enter the permission!' }]}
      >
        <Input readOnly={readOnly} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserPage;
