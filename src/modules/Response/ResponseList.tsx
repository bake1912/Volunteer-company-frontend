import axios from 'axios';
import React, { memo, useEffect, useState } from 'react';
import endpoints from '../../data/endpoint';
import { Table } from 'antd';
import Header from '../Request/component/Header';

const ResponseList = memo(() => {
    const userData = JSON.parse(localStorage.getItem('id') as string) || "";
    const [responses, setResponses] = useState<any[]>([]);
    console.log(responses);

    useEffect(() => {
        axios.get(endpoints.response.getAll).then(resp => resp.data).then(data => setResponses(data))
    }, [])

    const columns = [
        {
            title: "Response text",
            dataIndex: 'responseText',
            key: 'responseText'
        },
        {
            title: "Is approved",
            dataIndex: 'approve',
            key: 'approve',
            render: (_: any, row: any) => (
                <p>{row.approve ? "Approved" : "Not approved"}</p>
            )
        },
        {
            title: "Request id",
            dataIndex: 'requestId',
            key: 'requestId'
        }
    ];

    return (
        <div>
            <Header />
            <h1 style={{ textAlign: 'center' }}>List of my responses</h1>
            <Table
                columns={columns}
                dataSource={responses}
            />
        </div>
    );
});

export default ResponseList;