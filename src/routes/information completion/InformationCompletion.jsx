import {
  HomeTwoTone,
  IdcardTwoTone,
  MobileTwoTone,
  PhoneTwoTone,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  Steps,
  Typography,
  theme,
} from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const InformationCompletion = () => {
  const steps = [
    {
      title: "Identity information",
    },
    {
      title: "Contact information",
    },
    {
      title: "Address information",
    },
  ];

  const [nationalNumber, setNationalNumber] = useState("");
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState("");
  const [landlinePhoneNumber, setLandlinePhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = () => {
    if (current === steps.length - 1) {
      console.log("Done");
    } else {
      setCurrent(current + 1);
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: "white",
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,

    padding: "15px",
  };

  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <Link to="/">Home</Link>,
          },
          {
            title: "Information Completion",
          },
        ]}
      />
      <Divider />
      <Typography.Title
        level={5}
        style={{
          margin: "10px 0",
          fontSize: "15px",
          color: "#333",
        }}
      >
        Please provide the required details to help us serve you better.
        <br />
        <span style={{ display: "block" }}>
          Fields marked with <span style={{ color: "red" }}>(*)</span> are
          mandatory.
        </span>
      </Typography.Title>

      <Steps
        percent={current === 0 ? 0 : current === 1 ? 50 : 75}
        style={{ margin: "30px 0px" }}
        current={current}
        items={items}
      />
      <div>
        {current === 0 && (
          <div>
            <Form onFinish={onFinish}>
              <div style={contentStyle}>
                <Form.Item
                  style={{ margin: "15px 0px" }}
                  name={"national_number"}
                  initialValue={nationalNumber}
                  label={
                    <span>
                      <IdcardTwoTone />
                      &nbsp; National Number
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your national number",
                    },
                    {
                      len: 11,
                      message:
                        "The  National Number should be exactly 11 digits long",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setNationalNumber(e.target.value)}
                    style={{ width: "40%" }}
                    placeholder="National Number"
                    prefix={<IdcardTwoTone />}
                  />
                </Form.Item>
              </div>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 24,
                  }}
                >
                  {current > 0 && (
                    <Button
                      style={{
                        margin: "0 8px",
                      }}
                      onClick={() => prev()}
                    >
                      Previous
                    </Button>
                  )}
                  {(current < steps.length - 1 ||
                    current === steps.length - 1) && (
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "#002147",
                      }}
                      htmlType="submit"
                    >
                      {current < steps.length - 1 ? (
                        <span>Next</span>
                      ) : (
                        <span>Done</span>
                      )}
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>
        )}

        {current === 1 && (
          <div>
            <Form onFinish={onFinish}>
              <div style={contentStyle}>
                <Form.Item
                  style={{ margin: "15px 0px" }}
                  name={"mobile_phone_number"}
                  initialValue={mobilePhoneNumber}
                  label={
                    <span>
                      <MobileTwoTone />
                      &nbsp; Mobile Phone Number
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                    {
                      pattern: /^09\d{8}$/,
                      message:
                        "Please enter a valid phone number starting with 09xxxxxxxx",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setMobilePhoneNumber(e.target.value)}
                    style={{ width: "40%" }}
                    placeholder="09xxxxxxxx"
                    prefix={<MobileTwoTone />}
                  />
                </Form.Item>
                <Form.Item
                  style={{ margin: "15px 0px" }}
                  name={"landline_phone_number"}
                  initialValue={landlinePhoneNumber}
                  label={
                    <span>
                      <PhoneTwoTone />
                      &nbsp; Landline Phone Number
                    </span>
                  }
                  rules={[
                    {
                      pattern: /^011\d{8}$/,
                      message:
                        "Please enter a valid phone number starting with 011xxxxxxx",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setLandlinePhoneNumber(e.target.value)}
                    style={{ width: "40%" }}
                    placeholder="011xxxxxxx"
                    prefix={<PhoneTwoTone />}
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 24,
                  }}
                >
                  {current > 0 && (
                    <Button
                      style={{
                        margin: "0 8px",
                      }}
                      onClick={() => prev()}
                    >
                      Previous
                    </Button>
                  )}
                  {(current < steps.length - 1 ||
                    current === steps.length - 1) && (
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "#002147",
                      }}
                      htmlType="submit"
                    >
                      {current < steps.length - 1 ? (
                        <span>Next</span>
                      ) : (
                        <span>Done</span>
                      )}
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>
        )}

        {current === 2 && (
          <div>
            <Form onFinish={onFinish}>
              <div style={contentStyle}>
                <Form.Item
                  style={{ margin: "15px 0px" }}
                  name={"address"}
                  initialValue={address}
                  label={
                    <span>
                      <HomeTwoTone />
                      &nbsp; Address
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please enter your address",
                    },
                    {
                      pattern: /^[a-zA-Z0-9\s,'-.#]+$/,
                      message: "Please enter a valid address.",
                    },
                    {
                      min: 3,
                      message: "Please enter a valid address",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: "40%" }}
                    placeholder="سرغايا - الشارع العام - ريف دمشق - سوريا"
                    prefix={<HomeTwoTone />}
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 24,
                  }}
                >
                  {current > 0 && (
                    <Button
                      style={{
                        margin: "0 8px",
                      }}
                      onClick={() => prev()}
                    >
                      Previous
                    </Button>
                  )}
                  {(current < steps.length - 1 ||
                    current === steps.length - 1) && (
                    <Button
                      style={{
                        color: "white",
                        backgroundColor: "#002147",
                      }}
                      htmlType="submit"
                    >
                      {current < steps.length - 1 ? (
                        <span>Next</span>
                      ) : (
                        <span>Done</span>
                      )}
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationCompletion;
