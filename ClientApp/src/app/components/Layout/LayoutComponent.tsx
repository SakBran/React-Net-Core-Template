import { Button, Layout, Space, theme } from 'antd';
import React, { useState } from 'react';
import { BreadcrumbLink } from '../Breadcrump/BreadcrumbLink';
import { SideNav } from '../SideNav/SideNav';
import { RouteComponent } from 'src/app/Routes/Route';
import { Footer, Header } from 'antd/es/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './LayoutComponent.Module.css';
import { LoginButton } from '../LoginButton/LoginButton';
const LayoutComponent: React.FC = () => {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <div className="loginContainer">
        <LoginButton collapsed={collapsed}></LoginButton>
      </div>
      <SideNav collapsed={collapsed} setCollapse={handleCollapsed} />
      <Layout
        className="site-layout"
        style={collapsed ? { marginLeft: 25 } : { marginLeft: 200 }}
      >
        <Header className="topNav">
          <Button size="small" onClick={handleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>
        <Space style={{ paddingTop: 16 }}>
          <BreadcrumbLink />
        </Space>

        <Content style={{ margin: '16px 16px 16px 16px', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: '2px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            <RouteComponent />
          </div>
        </Content>

        <Footer
          style={{
            position: 'sticky',
            bottom: 0,
            zIndex: 1,
            height: '25px',
            padding: '4px',
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'white',
          }}
        >
          Ant Design ©2023 Created by{' '}
          <a href="https://sakbran.github.io/" target="blank">
            Sak Bran Aung
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
