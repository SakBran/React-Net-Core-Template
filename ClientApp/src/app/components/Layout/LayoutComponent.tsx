import { Button, Collapse, Layout, theme } from 'antd';
import React, { useState } from 'react';
import { BreadcrumbLink } from '../Breadcrump/BreadcrumbLink';
import { SideNav } from '../SideNav/SideNav';
import { RouteComponent } from 'src/app/Routes/Route';
import { Footer, Header } from 'antd/es/layout/layout';
import {
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

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
      <SideNav collapsed={collapsed} setCollapse={handleCollapsed} />
      <Layout
        className="site-layout"
        style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}
      >
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            height: '25px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: 0,
          }}
        >
          <Button size="small" onClick={handleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>

        <Content style={{ margin: '0px 16px 16px 16px', overflow: 'initial' }}>
          <BreadcrumbLink />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: '4px',
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
            backgroundColor: '#ddd',
          }}
        >
          Ant Design ©2023 Created by Sak Bran Aung
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
