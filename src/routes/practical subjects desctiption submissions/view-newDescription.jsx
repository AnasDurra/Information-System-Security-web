import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Space } from 'antd';
import Dragger from 'antd/es/upload/Dragger.js';
import TextArea from 'antd/es/input/TextArea.js';
import { TiUploadOutline } from 'react-icons/ti';
import Title from 'antd/es/typography/Title.js';

import { handshakingSocket, requestGetAllSubjects, requestSubmitProjects } from '../../services/sockests.js';
import forge from 'node-forge';
import { useAuth } from '../../hooks/AuthContext.jsx';
import { decrypt, encrypt } from '../../services/encryption.js';
import Cookies from 'js-cookie';
import { useSubjects } from '../../hooks/SubjectsContext.jsx';
import { getSocket, getSocketGetTeacherSubjects } from '../../services/retrieveSocket.js';

function ViewNewDescription(props) {
  const { token: authToken } = useAuth();
  const { subjects } = useSubjects();

  useEffect(() => {
    getSocket.connect();

    getSocketGetTeacherSubjects(authToken);

    return () => {
      getSocket.disconnect();
    };
  }, []);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    // console.log(handshakingSocket);
    requestGetAllSubjects();

    handshakingSocket.on('responseGetAllSubjects', onResponseGetAllSubjects);

    function onResponseGetAllSubjects(msg) {
      console.log(msg);
      // console.log(Cookies.get("sessionKey"));
      // // DECODING
      // // Prepare data
      // const encrypted = msg.data;
      // 1. Decode from base64
      // const decodedFromBase64 = forge.util.decode64(encrypted);
      // 2. Decrypt Data
      // const decryptedData = decrypt(
      //     encrypted,
      //     Cookies.get("sessionKey"),
      //     msg.iv
      // );
      // // 3. Base64 decode
      // const jsonString = atob(decryptedData);
      // // 4. Parse data back from JSON
      // const parsed = JSON.parse(jsonString);
      // // Print the output
      // console.log(jsonString);
      // const jsonData = JSON.stringify(data);

      const data = [];

      for (let i = 0; i < msg.data.length; i++) {
        const obj = {
          label: msg.data[i].name,
          value: msg.data[i].id,
        };
        data.push(obj);
      }
      setOptions(data);
      console.log(options);
    }

    return () => {
      handshakingSocket.off('responseGetAllSubjects', onResponseGetAllSubjects);
    };
  }, []);
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
          const data = {
            title: fields.description,
            subject_id: fields.subject,
          };

          requestSubmitProjects(data);
          console.log('done');
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
            <Select style={{ width: '50%' }} placeholder="Select Subject" options={options} />
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

          {/* <Title level={5} style={{ margin: "1rem 0" }}>
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
                            <TiUploadOutline size={"2em"} />
                            <p>Upload Your Submission Here</p>
                        </Dragger>
                    </Form.Item> */}
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
export default ViewNewDescription;
