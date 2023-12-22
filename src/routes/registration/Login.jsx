import React, { useEffect } from "react";
import {
  UserOutlined,
  LockOutlined,
  LoginOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
// import { useLoginMutation } from "../../app/services/auth";
import {
  Button,
  Divider,
  Form,
  Image,
  Input,
  Space,
  Typography,
  message,
} from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.css";

import LoginImage from "../../assets/account.png";
const Login = () => {
  //   const [loginMutation, { isLoading, isError, error }] = useLoginMutation();
  const [messageApi, contextHolder] = message.useMessage();
  const [formDisabled, setFormDisabled] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const informationCompletion = params.get("informationCompletion");

  useEffect(() => {
    if (informationCompletion == "true") {
      messageApi.open({
        type: "info",
        content: "You need to sign in or sign up before continuing !",
      });
    }
  }, [informationCompletion]);

  const success = () => {
    messageApi.open({
      type: "success",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      content: "Log in successfully",
    });
  };
  const warning = () => {
    /* messageApi.open({
        type: "warning",
        content: "The user name or password is incorrect",
      }); */
  };

  const wrong = () => {
    messageApi.open({
      type: "error",
      content: "Something went wrong!",
    });
  };

  const onFinish = async (values) => {
    if (informationCompletion == "true") {
      navigate("/information-completion");
    } else {
      navigate("/");
    }
    // try {
    //   const result = await loginMutation(values);
    //   if (result.error) {
    //     if (result.error.status === 401) {
    //       warning();
    //     } else {
    //       wrong();
    //     }
    //   } else {
    //     success();
    //     // const token = Cookies.set("accessToken", result.data.accessToken);
    //     // console.log(token);
    //     setFormDisabled(true);
    //     setTimeout(() => {
    //       navigate("/");
    //       setFormDisabled(false);
    //     }, 1000);
    //   }
    // } catch (error) {
    //   wrong();
    // }
  };

  return (
    <div className="login-page">
      {contextHolder}
      <div className="login-page-content">
        <Image
          //   width={350}
          style={{ marginTop: "60px", marginLeft: "80px", width: "60%" }}
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
            <Typography.Title level={2}>Welcome Back</Typography.Title>
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
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
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
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
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

export default Login;
