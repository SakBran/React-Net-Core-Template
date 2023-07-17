import { LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useCustomContext } from '../Context/Context';
type Pros = {
  collapsed: boolean;
};
export const LoginButton = ({ collapsed }: Pros) => {
  const { data, updateData } = useCustomContext();
  const handleLogin = () => {
    if (data?.isSignedIn) {
      console.log(data);
      const temp = { ...data };
      temp.isSignedIn = false;
      if (updateData) updateData(temp);
    } else {
      console.log(data);
      const temp = { ...data };
      temp.isSignedIn = true;
      if (updateData) updateData(temp);
    }
  };
  return (
    <>
      {data?.isSignedIn ? (
        <Button size="small" onClick={handleLogin}>
          <UserOutlined />
        </Button>
      ) : (
        ''
      )}

      <Button style={{ cursor: 'pointer' }} size="small" onClick={handleLogin}>
        {data?.isSignedIn ? <LogoutOutlined /> : <LoginOutlined />}
      </Button>
    </>
  );
};
