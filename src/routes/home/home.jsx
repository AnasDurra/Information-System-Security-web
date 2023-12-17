import React from "react";
import {theme} from "antd";

const Home = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    return (
        <div
            style={{
                padding: 24,
                minHeight: 380,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                marginTop: "15px",
            }}
        >
            Home
        </div>
    );
};

export default Home;
