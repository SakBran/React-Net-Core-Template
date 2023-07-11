import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Style.css';

const LoginPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>

        <Form name="loginForm" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="form-button"
              size="large"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
        <a className="register-link" href="/">
          Register an account
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
