import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const items = [
  {
    key: "home",
    label: "Home",
  },
];
const Root = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="root">
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["home"]}
            items={items}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          />
        </Header>
        <Content
          style={{
            backgroundColor: "#FCFDFB",
            borderRadius: borderRadiusLG,
            marginTop: "15px",
            padding: "40px 48px",
            minHeight: "82vh",
            marginTop: "0px",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Information systems security Project (23-24)
        </Footer>
      </Layout>
    </div>
  );
};
export default Root;
