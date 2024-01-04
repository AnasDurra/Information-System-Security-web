import React, { useEffect, useState } from 'react';
import { Select, Table } from 'antd';
import Title from 'antd/es/skeleton/Title';
import { useAuth } from '../../hooks/AuthContext';
import { useCertificate } from '../../hooks/CertificateContext';
import { decrypt } from '../../services/encryption';
import Cookies from 'js-cookie';
import { getMarksViaCertificate } from '../../services/socket-marks.js';
import { getSocket, requestGetTeacherSubjects } from '../../services/socket-get';
import { marksSocket, setMarksSocketHeader } from '../../services/socket-marks.js';

function ViewMarks(props) {
  const { token: authToken } = useAuth();
  const { certificate } = useCertificate();

  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const columns = [
    {
      title: selectedSubject ? `Marks For Subject ${selectedSubject}` : '',
      children: [
        {
          title: 'Student ID',
          dataIndex: 'student_id',
          key: 'id',
          width: '10%',
          sorter: (a, b) => a.student_id - b.student_id,
          sortDirections: ['ascend', 'descend'],
          defaultSortOrder: 'ascend',
        },
        {
          title: 'Student Name',
          dataIndex: ['student', 'name'],
          key: 'name',
          width: '30%',
        },
        {
          title: 'Mark',
          dataIndex: 'mark',
          key: 'mark',
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
    // console.log(certificate);
    setMarksSocketHeader({
      certificate: btoa(JSON.stringify(certificate).toString()),
    });
    marksSocket.connect();

    getSocket.connect();

    requestGetTeacherSubjects({ access_token: authToken });

    getSocket.on('result', requestGetTeacherSubjectsResult);
    marksSocket.on('getMarksViaCertificateResult', getMarksViaCertificateResult);

    function getMarksViaCertificateResult(msg) {
      console.log(msg);

      if (msg.status === 200) {
        console.log(Cookies.get('sessionKey'));
        const result = decrypt(msg.data.data, Cookies.get('sessionKey'), msg.data.iv);
        const modifiedData = JSON.parse(atob(result)).data.map((item) => {
          return { ...item, key: item.id };
        });
        setData(modifiedData);
      }
    }

    function requestGetTeacherSubjectsResult(msg) {
      const data = [];
      for (let i = 0; i < msg.length; i++) {
        const obj = {
          label: msg[i].subject.name,
          value: msg[i].subject.id,
        };
        data.push(obj);
      }
      setOptions(data);
    }

    if (selectedSubject) {
      console.log(selectedSubject);
      getMarksViaCertificate({
        subject_id: selectedSubject,
      });
    }
  }, [selectedSubject]);

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

      <Select
        style={{ width: '50%' }}
        placeholder="Select Subject"
        options={options}
        value={selectedSubject}
        onChange={(id) => setSelectedSubject(id)}
      />

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
