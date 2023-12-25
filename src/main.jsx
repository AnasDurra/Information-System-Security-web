import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {AuthProvider} from "./hooks/AuthContext.jsx";
import {ConfigProvider} from "antd";
import {router} from "./routes/router.jsx";
import {RouterProvider} from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider
        theme={{
            token: {
                colorPrimary: '#00474f',
                components: {
                    Layout: {
                        //  headerBg: '#f6ffed',
                    },
                },
            },
        }}
    >
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </ConfigProvider>
);
