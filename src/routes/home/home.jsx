import React from 'react';
import { Carousel, List, Space, theme } from 'antd';
import { Image, Typography } from 'antd';

import image from '../../assets/cybersecurity2.png';
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const contentStyle = {
    height: '160px',
    // color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    // background: '#364d79',
  };
  return (
    <div
      style={{
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
        display: 'flex',
        justifyContent: 'start',
        padding: '24px',
      }}
    >
      <Space direction="horizontal" size={150} align="start">
        <Image src={image} preview={false} width={500} />

        <Space direction="vertical">
          <Title level={2}>Welcome to Your App!</Title>
          <Paragraph style={{ marginTop: '16px', fontSize: '15px', color: '#333', fontWeight: 'bold' }}>
            Welcome to our college app, designed with information security and privacy encryption in mind.
          </Paragraph>
          <Text style={{ fontSize: '16px', lineHeight: '1.8', color: '#666' }}>
            To get started, follow these steps:
            <br />
            <br />
            <Text strong>1. Complete Info:</Text> Click on "Complete Info" in the navigation menu to fill in your
            personal information after registering.
            <br />
            <br />
            Once your information is completed, you can:
            <br />
            <br />
            <Text strong>2. Marks:</Text>
            <List size="small" bordered>
              <List.Item>View Subject Marks</List.Item>
              <List.Item>Create New Marks List</List.Item>
            </List>
            <br />
            <Text strong>3. Descriptions:</Text>
            <List size="small" bordered>
              <List.Item>View Subject Descriptions</List.Item>
              <List.Item>Add New Descriptions</List.Item>
            </List>
            <br />
            <br />
            Enjoy using our app and exploring the features!
          </Text>
        </Space>
      </Space>
    </div>
  );
};

export default Home;
