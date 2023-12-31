import React from 'react';
import { Button, Table } from 'antd';
import { FaDownload } from 'react-icons/fa';

function ViewDescriptions(props) {
  const columns = [
    {
      title: 'Submissions For Subject X',
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
          title: 'File Download',
          dataIndex: 'file',
          key: 'file',
          width: '20%',
          render: () => (
            <Button type="text">
              <FaDownload style={{ color: 'darkgray' }} />
            </Button>
          ),
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
      <Table style={{ marginTop: '1em', width: '50%' }} columns={columns} dataSource={data} pagination={false} />
    </div>
  );
}

const data = [
  {
    key: '1',
    name: 'John Doe',
    description: 'Assignment 1',
    submissionDate: '2023-01-05',
    file: 'fake-file-url-1',
  },
  {
    key: '2',
    name: 'Jane Smith',
    description: 'Project Report',
    submissionDate: '2023-01-10',
    file: 'fake-file-url-2',
  },
  {
    key: '3',
    name: 'Alice Johnson',
    description: 'Homework',
    submissionDate: '2023-01-15',
    file: 'fake-file-url-3',
  },
];

export default ViewDescriptions;
