import React from 'react';
import {Table} from "antd";

function ViewMarks(props) {

    const columns = [
        {
            title: 'Marks For Subject X',
            children: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    width: "30%",
                },
                {
                    title: 'Mark',
                    dataIndex: 'mark',
                    key: 'age',
                    width: "20%",

                },
                {
                    title: 'Submission Date',
                    dataIndex: 'submissionDate',
                    key: 'submissionDate',
                    width: "20%",
                },
                {
                    title: 'Submitted By',
                    dataIndex: 'submittedBy',
                    key: 'submittedBy',
                    width: "20%",
                },
            ]
        },
    ];

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            height: "100%"
        }}>
            <Table style={{marginTop: "1em", width: "50%"}} columns={columns} dataSource={data} pagination={false}/>
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
