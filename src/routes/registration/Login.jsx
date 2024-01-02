import React, { useEffect, useState } from "react";
import {
    CheckCircleTwoTone,
    LockOutlined,
    LoginOutlined,
    OrderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
// import { useLoginMutation } from "../../app/services/auth";
import { Button, Form, Image, Input, message, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import LoginImage from "../../assets/account.png";
import { authSocket, authSocketLogin } from "../../services/sockests.js";
import { useAuth } from "../../hooks/AuthContext.jsx";
// import cloudImage from "../../assets/login.png";

const Login = () => {
    //   const [loginMutation, { isLoading, isError, error }] = useLoginMutation();
    const [messageApi, contextHolder] = message.useMessage();
    const [formDisabled, setFormDisabled] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();

    const onFinish = async (values) => {
        const credentials = {
            username: values.username,
            password: values.password,
        };

        authSocketLogin(credentials);
    };

    useEffect(() => {
        authSocket.connect();

        return () => {
            authSocket.disconnect();
        };
    }, []);

    return (
        <div className="login-page">
            {contextHolder}
            <div className="login-page-content">
                <Image
                    //   width={350}
                    style={{
                        marginTop: "60px",
                        marginLeft: "80px",
                        width: "60%",
                    }}
                    preview={false}
                    src={LoginImage}
                />

                <div style={{ marginLeft: "80px" }}>
                    <Form
                        className="login-form"
                        //   disabled={isLoading || formDisabled}
                        onFinish={onFinish}
                    >
                        {/* <Image preview={false} width={150} src={cloudImage}></Image> */}
                        <Typography.Title level={2}>
                            Welcome Back
                        </Typography.Title>
                        <Typography.Paragraph>
                            Please sign in to continue.
                        </Typography.Paragraph>
                        <Form.Item
                            style={{ width: "100%", marginBottom: 15 }}
                            name={"username"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your username",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: "40px",
                                }}
                                placeholder="Username"
                                prefix={
                                    <UserOutlined
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                }
                            />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "100%" }}
                            name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your password",
                                },
                            ]}
                        >
                            <Input.Password
                                status={""}
                                style={{
                                    height: "40px",
                                }}
                                placeholder="passowrd"
                                prefix={
                                    <LockOutlined
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                }
                            />
                        </Form.Item>

                        <Form.Item style={{ width: "100%", marginBottom: 15 }}>
                            <Button
                                style={{
                                    width: "100%",
                                    fontSize: "18px",
                                    color: "white",
                                    padding: "0px",
                                    backgroundColor: "#002147",
                                }}
                                //   loading={isLoading}
                                icon={<LoginOutlined />}
                                className="custom-button"
                                htmlType="submit"
                            >
                                Login
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Typography.Text
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                Don't have an account?
                                <span style={{ marginLeft: "3px" }}>
                                    <Link to={"/register"}> Signup now</Link>
                                </span>
                            </Typography.Text>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

const openNotification = (api) => {
    api.open({
        message: "Complete the information?",
        description:
            "If you would like to complete your information, please click here",
        duration: 0,
        icon: (
            <OrderedListOutlined
                style={{
                    color: "#108ee9",
                }}
            />
        ),
    });
};

const success = (messageApi, message) => {
    messageApi.open({
        type: "success",
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        content: message ? message : "Login successfully",
    });
};

const warning = (messageApi, message) => {
    messageApi.open({
        type: "warning",
        content: message,
    });
};

const wrong = (messageApi, message) => {
    messageApi.open({
        type: "error",
        content: message ? message : "Something Went Wrong!",
    });
};

export default Login;
