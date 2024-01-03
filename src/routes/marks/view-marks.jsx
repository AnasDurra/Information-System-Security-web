import React, { useEffect, useState } from 'react';
import { Select, Table } from 'antd';
import Title from 'antd/es/skeleton/Title';
import { useAuth } from '../../hooks/AuthContext';
import { getSocket, marksSocket, requestGetTeacherSubjects } from '../../services/sockests';

function ViewMarks(props) {
  const { token: authToken } = useAuth();

  const [options, setOptions] = useState([]);
  const columns = [
    {
      title: 'Marks For Subject Xx',
      children: [
        {
          title: 'Student Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
        },
        {
          title: 'Mark',
          dataIndex: 'mark',
          key: 'age',
          width: '20%',
        },
        {
          title: 'Submission Date',
          dataIndex: 'submissionDate',
          key: 'submissionDate',
          width: '20%',
        },
        {
          title: 'Submitted By',
          dataIndex: 'submittedBy',
          key: 'submittedBy',
          width: '20%',
        },
      ],
    },
  ];
  useEffect(() => {
    if (!marksSocket.connect()) {
      marksSocket.connect();
    }
    getSocket.connect();

    console.log(authToken);
    requestGetTeacherSubjects({ access_token: authToken });

    getSocket.on('result', requestGetTeacherSubjectsResult);

    function requestGetTeacherSubjectsResult(msg) {
      console.log(msg);
    }
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
      <Title level={5} style={{ margin: '1rem 0' }}>
        Subject
      </Title>

      <Select style={{ width: '50%' }} placeholder="Select Subject" />

      <Table style={{ marginTop: '1em', width: '50%' }} columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

const data = [
  {
    key: '1',
    name: 'John Doe',
    mark: 85,
    submissionDate: '2023-01-01',
    submittedBy: 'Teacher A',
  },
  {
    key: '2',
    name: 'Jane Smith',
    mark: 92,
    submissionDate: '2023-01-02',
    submittedBy: 'Teacher B',
  },
  {
    key: '3',
    name: 'Alice Johnson',
    mark: 78,
    submissionDate: '2023-01-03',
    submittedBy: 'Teacher C',
  },
];

export default ViewMarks;
