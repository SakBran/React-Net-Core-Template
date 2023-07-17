import { Form, Input, Button, Spin } from 'antd';
import Password from 'antd/es/input/Password';
import { useState } from 'react';
import useFormActions from 'src/app/Hooks/useFormActions';
import useFormLoad from 'src/app/Hooks/useFormLoad';
import useFormhelper from 'src/app/Hooks/useFormhelper';
const APIURL = 'User';

const UserPage = () => {
  const { readOnly, id, action } = useFormhelper();
  const { formRef, loading } = useFormLoad(id, action, APIURL);
  const { onFinish } = useFormActions(id, action, APIURL);

  const Wait = () => {
    if (loading) {
      return <Spin></Spin>;
    } else {
      return <div></div>;
    }
  };

  return (
    <Form
      ref={formRef}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 800 }}
      //initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Wait></Wait>
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
          {action}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserPage;
