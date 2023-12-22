import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Space,
  Typography,
  message,
  notification,
} from "antd";
import {
  OrderedListOutlined,
  UserOutlined,
  MailFilled,
  KeyOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import React, { useState } from "react";

import LoginImage from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [api, notificationContextHolder] = notification.useNotification();

  const [messageApi, contextHolder] = message.useMessage();
  const [formDisabled, setFormDisabled] = useState(false);
  const [usernameWarning, setUsernameWarning] = useState(false);
  const [emailWarning, setEmailWarning] = useState(false);

  //   const [isLoading, setIsLoading] = useState(true);

  const openNotification = () => {
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

  const success = () => {
    messageApi.open({
      type: "success",
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      content: "Registeration complete successfully",
    });
  };

  const warning = (meesage) => {
    messageApi.open({
      type: "warning",
      content: meesage,
    });
  };

  const wrong = () => {
    messageApi.open({
      type: "error",
      content: "Something went wrong!",
    });
  };

  const onFinish = (values) => {
    const credentials = {
      username: values.username,
      full_name: values.first_name + " " + values.last_name,
      email: values.email,
      password: values.password,
    };

    // when success open notification
    openNotification();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        // minHeight: "82vh",
        // alignItems: "space",
      }}
    >
      {notificationContextHolder}
      <Image
        style={{ marginTop: "60px", marginLeft: "40px", width: "73%" }}
        preview={false}
        src={LoginImage}
      />

      <Row>
        {/* <Col>
          <Typography.Paragraph
            style={{
              width: "45vw",
              marginTop: "20px",
              marginLeft: "30px",
            }}
          >
            Register now to access a seamless connection between students and
            educators, facilitating collaboration, knowledge-sharing, and
            academic growth.
          </Typography.Paragraph>
        </Col> */}

        <Col>
          <Card
            style={{
              width: "45vw",
              minHeight: "55vh",
              marginTop: "20px",
              marginLeft: "30px",
            }}
          >
            <div>
              <Form
                layout="vertical"
                className="register-form-items"
                autoComplete="off"
                onFinish={onFinish}
              >
                <Form.Item
                  name={"first_name"}
                  label={"Fist Name"}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input placeholder={"First Name"} />
                </Form.Item>
                <Form.Item
                  name={"last_name"}
                  label={"Last Name"}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input placeholder={"Last Name"} />
                </Form.Item>
                <Form.Item
                  name={"email"}
                  label={"Email Address"}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      type: "email",
                      message: "Please enter a valid email address",
                    },
                    {
                      max: 255,
                      message: "Email is too long",
                    },
                  ]}
                >
                  <Input
                    status={emailWarning ? "warning" : ""}
                    prefix={<MailFilled style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder={"Email"}
                  />
                </Form.Item>
                <Form.Item
                  name={"username"}
                  label={"username"}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    status={usernameWarning ? "warning" : ""}
                    prefix={
                      <UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder={"Username"}
                  />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  label={"Password"}
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={
                      <KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder={"password"}
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  required
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={
                      <KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Confirm Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    // loading={isLoading}
                    style={{
                      fontSize: "18px",
                      color: "white",
                      padding: "0px",
                      backgroundColor: "#002147",
                    }}
                    block
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item style={{ marginTop: "11px" }}>
                  <Typography.Text
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    Already have an account?
                    <div style={{ marginTop: "8px" }}>
                      <span style={{ marginLeft: "3px" }}>
                        <Link to={"/login"}> Login now </Link>
                      </span>
                      <span style={{ marginTop: "8px" }}>or</span>
                      <span style={{ marginLeft: "3px" }}>
                        <Link to="/login?informationCompletion=true">
                          Complete your information now!
                        </Link>
                      </span>
                    </div>
                  </Typography.Text>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
