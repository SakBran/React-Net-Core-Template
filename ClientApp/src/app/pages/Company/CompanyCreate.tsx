import { Form, Input, Button } from 'antd';
const onFinish = (values: unknown) => {
  console.log('Form values:', values);
  // You can perform further actions with the form values, such as submitting to an API or storing in state
};
const CompanyCreate = () => {
  return (
    <Form
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      style={{ maxWidth: 800 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Company Name"
        name="companyName"
        rules={[{ required: true, message: 'Please enter the company name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please enter the address!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone No"
        name="phoneNo"
        rules={[{ required: true, message: 'Please enter the phone number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Join Date"
        name="joinDate"
        rules={[{ required: true, message: 'Please enter the join date!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Company ID"
        name="companyId"
        rules={[{ required: true, message: 'Please enter the company ID!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CompanyCreate;
