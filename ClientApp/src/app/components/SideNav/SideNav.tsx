import {
  TeamOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Link } from 'react-router-dom';
type Props = {
  collapsed: boolean;
  setCollapse: () => void;
};
export const SideNav = ({ collapsed, setCollapse }: Props) => {
  const items: MenuProps['items'] = [
    {
      label: 'Company',
      key: 'SubMenu-Company',
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link to="/Company/List">List</Link>,
          key: 'SubMenu-Company-List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/Company/New">New</Link>,
          key: 'SubMenu-Company-New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
    {
      label: 'User',
      key: 'SubMenu-User',
      icon: <TeamOutlined />,
      children: [
        {
          label: <Link to="/User/List">List</Link>,
          key: 'SubMenu-User-List',
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to="/User/New">New</Link>,
          key: 'SubMenu-User-New',
          icon: <PlusCircleOutlined />,
        },
      ],
    },
  ];
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={25}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 100000,
      }}
    >
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        items={items}
      ></Menu>
    </Sider>
  );
};
