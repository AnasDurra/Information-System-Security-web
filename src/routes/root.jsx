import React from "react";
import {Layout, Menu, theme} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/AuthContext.jsx";
import App from "../App.jsx";

const {Header, Content, Footer} = Layout;
const items = [
    {
        key: "",
        label: "Home",
    },
    {
        key: "marks",
        label: "Marks",
    },
    {
        key: "descriptions",
        label: "Descriptions",
    },
    {
        key: "information-completion",
        label: "Information Completion",
    },
];

const Root = () => {
    const navigate = useNavigate();
    const {token} = useAuth();
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    // noinspection JSValidateTypes
    return (
        <div className="root">
            <Layout>
                <Header
                    style={{
                        backgroundColor: "#006d75",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <div/>
                    {token && <Menu
                        theme={"dark"}
                        mode="horizontal"
                        defaultSelectedKeys={[""]}
                        items={items}
                        style={{
                            backgroundColor: "#006d75",
                            flex: 1,
                            minWidth: 0,
                        }}
                        onSelect={(entry) => {
                            if (entry.key !== "home") navigate(entry.key, {replace: true});
                            else navigate("/");
                        }}
                        onClick={(entry) => {
                            if (entry.key !== "home") navigate(entry.key, {replace: true});
                            else navigate("/");
                        }}
                    />}
                </Header>
                <Content
                    style={{
                        backgroundColor: "#FCFDFB",
                        borderRadius: borderRadiusLG,
                        padding: "40px 48px",
                        minHeight: "82vh",
                    }}
                >
                    <App>
                        <Outlet/>
                    </App>
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
