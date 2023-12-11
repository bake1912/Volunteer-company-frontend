import { Button, Input, Select, Switch, message } from 'antd';
import { FormikValues, useFormik } from 'formik';
import React, { memo, useState } from 'react';
import * as Yup from 'yup';
import endpoints from '../../../data/endpoint';
import '../style/Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = memo(() => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        sexName: Yup.string().required(),
        roleName: Yup.string().required(),
        occupationName: Yup.string().required()
    });
    const [fileList, setFileList] = useState<File | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sexName: '',
        roleName: '',
        occupationName: ''
    };

    const onSubmit = (values: FormikValues) => {
        axios.post(endpoints.user.register, { ...values })
            .then(resp => resp.data)
            .then(data => {
                if (data.email) {
                    localStorage.setItem('userData', JSON.stringify({ email: data.email, id: data.id, role: data.roleName }));
                    navigate('/volunteers/request')
                    if (fileList) {
                        const formData = new FormData();
                        formData.append('photo', fileList as File)
                        axios.post(endpoints.user.createPhoto(data.id), formData)
                    }
                }
                else {
                    messageAlert();
                }
                setFileList(null);
            })
    };

    const messageAlert = () => {
        messageApi.open({
            type: 'error',
            content: 'The email exists'
        })
    }

    const formik = useFormik({
        initialValues: initialState,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    const navigate = useNavigate();

    return (
        <div className='greeting'>
            {contextHolder}
            <div className='new_user'>
                <h1>Welcome Back!</h1>
                <h2>To keep connected with us please login with your personal info</h2>
                <Button onClick={() => navigate('/volunteers/login')}>Sign in</Button>
            </div>
            <div className='welcome_back'>
                <h1>Create an account</h1>
                <form
                    style={{ width: '30%', display: 'flex', flexDirection: 'column' }}
                    onSubmit={formik.handleSubmit}
                >
                    <p>First name</p>
                    <Input
                        placeholder='First Name'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        name='firstName'
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                        <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
                    )}
                    <p>Last name</p>
                    <Input
                        placeholder='Last Name'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        name='lastName'
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                        <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
                    )}
                    <p>Email</p>
                    <Input
                        placeholder='Email'
                        value={formik.values.email}
                        type='email'
                        onChange={formik.handleChange}
                        name='email'
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div style={{ color: 'red' }}>{formik.errors.email}</div>
                    )}
                    <p>Password</p>
                    <Input
                        placeholder='Password'
                        value={formik.values.password}
                        type='password'
                        onChange={formik.handleChange}
                        name='password'
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    )}
                    <p>Sex</p>
                    <Select
                        placeholder='Sex'
                        options={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                        ]}
                        onChange={(e) => formik.setFieldValue('sexName', e)}
                        id='sexName'
                    />
                    {formik.errors.sexName && formik.touched.sexName && (
                        <div style={{ color: 'red' }}>{formik.errors.sexName}</div>
                    )}
                    <p>Photo</p>
                    <Input
                        type='file'
                        onChange={e => setFileList(e.target.files![0])}
                    />
                    <p>Role</p>
                    <Select
                        onChange={(e) => formik.setFieldValue('roleName', e)}
                        value={formik.values.roleName}
                        options={
                            [
                                {
                                    label: 'Member',
                                    value: 'member'
                                },
                                {
                                    label: 'Admin',
                                    value: 'admin'
                                }
                            ]
                        }
                    />
                    <p>Occupation</p>
                    <Select
                        value={formik.values.occupationName}
                        onChange={(e) => formik.setFieldValue('occupationName', e)}
                        options={
                            [
                                {
                                    label: 'Worker',
                                    value: 'worker'
                                },
                                {
                                    label: 'Student',
                                    value: 'student'
                                },
                                {
                                    label: 'Other',
                                    value: 'other'
                                }
                            ]
                        }
                    />
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
});

export default Register;
