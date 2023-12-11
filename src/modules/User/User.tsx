import React, { memo } from 'react';
import { Card } from 'antd';

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    sexName: string;
}

const User: React.FC<IUser> = memo(({ id, firstName, lastName, email, sexName }:IUser) => (
    <Card style={{ width: 300, margin: '16px' }}>
        <p>ID: {id}</p>
        <p>Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
        <p>Sex: {sexName}</p>
    </Card>
));

export default User;
