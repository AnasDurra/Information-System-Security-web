import React, { useEffect, useState } from 'react';
import { Button, Select, Table } from 'antd';
import { FaDownload } from 'react-icons/fa';
import Title from 'antd/es/typography/Title';
import { getSocketGetTeacherSubjects } from '../../services/sockests';
import { useSubjects } from '../../hooks/SubjectsContext';
import { useAuth } from '../../hooks/AuthContext';
import { useDescriptions } from '../../hooks/DescriptionsContext';

function ViewDescriptions(props) {
  const { token: authToken } = useAuth();
  const { subjects, setAllSubjects } = useSubjects();
  const [subject, setSubject] = useState(null);
  const { descriptions, setAllDescriptions } = useDescriptions();

  useEffect(() => {
    getSocketGetTeacherSubjects(authToken);
  }, []);

  const columns = [
    {
      title: `Submissions For Subject ${subject?.label}`,
      children: [
        {
          title: 'Student Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'desc',
          width: '20%',
        },
        {
          title: 'Submission Date',
          dataIndex: 'submissionDate',
          key: 'submissionDate',
          width: '20%',
        },
      ],
    },
  ];

  /* descriptions.map((desc) => {
    return {
      key: '3',
      name: 'Alice Johnson',
      description: desc.title,
      submissionDate: desc.date,
    };
  }); */

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
        options={subjects?.map((sub) => {
          return { value: sub?.subject?.id, label: sub?.subject?.name };
        })}
        onChange={(selectedSub) => {
          setSubject(selectedSub);
        }}
      />
      {subject && (
        <Table style={{ marginTop: '1em', width: '50%' }} columns={columns} dataSource={data} pagination={false} />
      )}
    </div>
  );
}

const data = [
  {
    key: '1',
    name: 'John Doe',
    description: 'Assignment 1',
    submissionDate: '2023-01-05',
  },
  {
    key: '2',
    name: 'Jane Smith',
    description: 'Project Report',
    submissionDate: '2023-01-10',
  },
  {
    key: '3',
    name: 'Alice Johnson',
    description: 'Homework',
    submissionDate: '2023-01-15',
  },
];

export default ViewDescriptions;
