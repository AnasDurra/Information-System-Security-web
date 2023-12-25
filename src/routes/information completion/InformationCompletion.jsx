import {HomeTwoTone, LockOutlined, MobileTwoTone,} from "@ant-design/icons";
import {Breadcrumb, Button, Divider, Form, Input, Steps, theme, Typography,} from "antd";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/AuthContext.jsx";
import {completeInfoSocket, completeInfoSocketRequest} from "../../services/sockests.js";
import {IoPersonOutline} from "react-icons/io5";


const InformationCompletion = () => {
    const [form] = Form.useForm();


    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);


    const {token: authToken} = useAuth()

    useEffect(() => {
        console.log("auth", authToken)
        completeInfoSocket.auth = {
            ...completeInfoSocket.auth,
            auth: `Bearer ${authToken}`,
        };
        console.log(completeInfoSocket)

        completeInfoSocket.connect();

        return () => {
            completeInfoSocket.disconnect();
        };
    }, []);

    const prev = () => {
        setCurrent(current - 1);
    };

    const onFinish = () => {
        if (current === steps.length - 1) {
            console.log(form.getFieldsValue(true) || "duh");

            completeInfoSocketRequest({
                ...form.getFieldsValue(true),
                password: undefined
            }, form.getFieldValue(['password']));

        } else {
            setCurrent(current + 1);
        }
    };

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
            <Divider/>
            <Typography.Title
                level={5}
                style={{
                    margin: "10px 0",
                    fontSize: "15px",
                    color: "#333",
                }}
            >
                Please provide the required details to help us serve you better.
                <br/>
                <span style={{display: "block"}}>
          Fields marked with <span style={{color: "red"}}>(*)</span> are
          mandatory.
        </span>
            </Typography.Title>

            <Form onFinish={onFinish} form={form}>
                <Steps
                    percent={current === 0 ? 0 : current === 1 ? 50 : 75}
                    style={{margin: "30px 0px"}}
                    current={current}
                    items={items}
                />
                <div>
                    {current === 0 && (
                        <div>

                            <div style={contentStyle}>
                                <Form.Item
                                    style={{margin: "15px 0px"}}
                                    name={"name"}
                                    label={
                                        <span>
                                           <IoPersonOutline/>
                                            &nbsp; full name
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{width: "40%"}}
                                        placeholder="full name"
                                        prefix={<IoPersonOutline/>}
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
                        </div>
                    )}

                    {current === 1 && (
                        <div>
                            <div style={contentStyle}>
                                <Form.Item
                                    style={{margin: "15px 0px"}}
                                    name={"phone_number"}
                                    label={
                                        <span>
                                              <MobileTwoTone/>
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
                                        style={{width: "40%"}}
                                        placeholder="09xxxxxxxx"
                                        prefix={<MobileTwoTone/>}
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
                        </div>
                    )}

                    {current === 2 && (
                        <div>
                            <div style={contentStyle}>
                                <Form.Item
                                    style={{margin: "15px 0px"}}
                                    name={"address"}
                                    label={
                                        <span>
                                             <HomeTwoTone/>
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
                                        style={{width: "40%"}}
                                        placeholder="سرغايا - الشارع العام - ريف دمشق - سوريا"
                                    />
                                </Form.Item>

                                <Form.Item
                                    style={{margin: "15px 0px"}}
                                    name={"password"}
                                    label={
                                        <span>
                                              <LockOutlined/>
                                            &nbsp;  Password
                                        </span>
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{width: "40%"}}
                                        placeholder="password"
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
                        </div>
                    )}
                </div>
            </Form>

        </div>
    );
};

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

const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
}));


export default InformationCompletion;
