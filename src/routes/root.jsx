import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;
const items = [
  {
    key: "",
    label: "Home",
  },
  {
    key: "information-completion",
    label: "Information Completion",
  },
];
const Root = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
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
            onClick={(value) => navigate(`${value.key}`)}
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
            padding: "40px 48px",
            minHeight: "82vh",
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
