import React from 'react';
import {Button, Col, Divider, Form, Input, InputNumber, Row, Select, Space} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title.js";
import FormItemLabel from "antd/es/form/FormItemLabel.js";


const dummyOptions = [
    {
        value: 'jack',
        label: 'Jack',
    },
    {
        value: 'lucy',
        label: 'Lucy',
    },
]


function ViewNewMarks(props) {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "100%",
            height: "100%"
        }}>

            <Row justify={"center"} style={{width: "100%"}}>
                <Col>
                    <Title level={3}>
                        New Mark List
                    </Title>
                </Col>
            </Row>


            <Form layout={'vertical'} style={{
                width: "100%", height: "100%",
            }}>
                <Row justify={"center"} style={{width: "100%"}}>
                    <Col span={12}>
                        <Title level={4}>Subject </Title>
                        <Form.Item name='subject'>
                            <Select
                                placeholder={"Select Subject"}
                                defaultValue="lucy"
                                style={{
                                    width: "20%",
                                }}
                                onChange={() => {
                                }}
                                options={dummyOptions}
                            />
                        </Form.Item>
                    </Col>
                </Row>


                <Row style={{width: "100%"}} justify={'center'}>
                    <Col span={12}>
                        <Title level={4} style={{marginTop: "0"}}>Students </Title>
                        <Form.List
                            name="students"
                            initialValue={[{student: null, mark: null}]}
                        >
                            {(fields, {add, remove}, {errors}) => {
                                return (
                                    <>
                                        {fields.map((field, index) => (
                                            <Row key={field.key} style={{width: "100%", marginTop: "1em"}}
                                                 justify={'start'}>
                                                <Col span={10}>
                                                    <Form.Item style={{width: "100%"}} noStyle
                                                               name={[field.name, 'student']}>
                                                        <Select style={{width: "100%"}} placeholder="Student"
                                                                options={dummyOptions}/>
                                                    </Form.Item>
                                                </Col>
                                                <Col offset={2} span={10}>
                                                    <Form.Item noStyle name={[field.name, 'second']}>
                                                        <InputNumber style={{width: "100%"}} placeholder="Mark" min={0}
                                                                     max={100}/>
                                                    </Form.Item>
                                                </Col>
                                                <Col offset={1}
                                                     style={{
                                                         display: "flex",
                                                         justifyContent: "center",
                                                         alignItems: "center"
                                                     }}>
                                                    {fields.length !== 1 && <CloseOutlined
                                                        onClick={() => {
                                                            remove(field.name);
                                                        }}
                                                    />}
                                                </Col>
                                            </Row>
                                        ))}

                                        <Title level={4}>Actions </Title>
                                        <Row style={{width: "100%", marginTop: "1em"}}>
                                            <Col span={12}>
                                                <Button style={{width: "100%"}} type="dashed" onClick={() => add()}>
                                                    + Add Student
                                                </Button>
                                            </Col>
                                            <Col offset={1} span={11}>
                                                <Button style={{width: "100%"}} type="primary" htmlType="submit">
                                                    Send
                                                </Button>
                                            </Col>
                                        </Row>
                                    </>)
                            }}
                        </Form.List>
                    </Col>
                </Row>
            </Form>
        </div>
    )
        ;
}

export default ViewNewMarks;