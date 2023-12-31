import React from 'react';
import { Button, Form, Select, Space } from 'antd';
import Dragger from 'antd/es/upload/Dragger.js';
import TextArea from 'antd/es/input/TextArea.js';
import { TiUploadOutline } from 'react-icons/ti';
import Title from 'antd/es/typography/Title.js';

function ViewNewDescription(props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Form
        style={{ width: '50%' }}
        onFinish={(fields) => {
          const formData = new FormData();
          formData.append('subject', fields.subject);
          formData.append('file', fields.file.fileList[0].originFileObj);

          console.log('file', formData);

          // createFile(formData)
          //     .unwrap()
          //     .then(() => {
          //         closeModal();
          //         successMessage({content: `file ${fields.name} created`});
          //     });
        }}
      >
        <div style={{ margin: '2em', width: '100%' }}>
          <Title level={5} style={{ margin: '1rem 0' }}>
            Subject
          </Title>
          <Form.Item
            name="subject"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select style={{ width: '50%' }} placeholder="Select Subject" options={dummyOptions} />
          </Form.Item>

          <Title level={5} style={{ margin: '1rem 0' }}>
            Description
          </Title>
          <Form.Item
            name="description"
            // rules={[
            //     {
            //         required: true,
            //     },
            // ]}
          >
            <TextArea rows={4} placeholder="Descripe Your Submission" />
          </Form.Item>

          <Title level={5} style={{ margin: '1rem 0' }}>
            File
          </Title>
          <Form.Item
            name="file"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Dragger maxCount={1}>
              <TiUploadOutline size={'2em'} />
              <p>Upload Your Submission Here</p>
            </Dragger>
          </Form.Item>
        </div>
        <Space style={{ width: '100%', justifyContent: 'end' }}>
          {/*<Button*/}
          {/*    type='text'*/}
          {/*    onClick={closeModal}*/}
          {/*>*/}
          {/*    Cancel*/}
          {/*</Button>*/}
          <Button type="primary" htmlType="submit">
            Send
          </Button>
        </Space>
      </Form>
    </div>
  );
}

const dummyOptions = [
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
];
export default ViewNewDescription;
