import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../data/endpoint';
import { Input, Table, Tag } from 'antd';
import User from './User';
import Header from '../Request/component/Header';

const UserList = memo(() => {
    const [users, setUsers] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(endpoints.user.getAll);
                const usersNoPhoto = resp.data;
                const usersWithPhotos = await Promise.all(
                    usersNoPhoto.map(async (user: any) => {
                        const photos = await axios.get(endpoints.user.getPhotos(user.id)).then((resp) => resp.data);
                        return { ...user, photos: photos || [] };
                    })
                );
                setUsers(usersWithPhotos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredUsers = users.filter((user) => user.id.toString().includes(searchText));

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Sex',
            dataIndex: 'sexName',
            key: 'sexName',
        },
        {
            title: 'Role',
            dataIndex: 'roleName',
            key: 'roleName',
        },
        {
            title: 'Occupation',
            dataIndex: 'occupationName',
            key: 'occupationName',
        },
        {
            title: 'Photos',
            dataIndex: 'photos',
            key: 'photos',
            render: (photos: any[]) => (
                <div>
                    {photos.map((photo, index) => (
                        <img key={index} src={`data:image/jpeg;base64,${photo.photo}`} alt={`Photo ${index}`} style={{ width: '120px', height: '100px', marginRight: '5px' }} />
                    ))}
                </div>
            ),
        },
    ];

    return (
        <>
            <Header />
            <div style={{ marginBottom: 16 }}>
                <Input.Search placeholder="Search by ID" onChange={e=>setSearchText(e.target.value)} style={{ margin:'1% 0%',width: 200 }} />
            </div>
            <Table dataSource={filteredUsers} columns={columns} rowKey="id" />
        </>
    );
});

export default UserList;
