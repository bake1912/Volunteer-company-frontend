import { Button, Input, Select, message } from 'antd';
import { FormikValues, useFormik } from 'formik';
import React, { memo, useEffect, useState } from 'react';
import *  as Yup from 'yup'
import endpoints from '../../../data/endpoint';
import '../style/Login.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = memo(() => {

    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().required(),
    })

    const initialState = {
        email: '',
        password: '',
    };

    const signedIn = (data: any) => {

        localStorage.setItem('userData', JSON.stringify({ email: data.email, id: data.id, role: data.roleName }));
        data.roleName === 'member' ?
            navigate('/volunteers/request')
            : navigate('/volunteers/items')

        setIsSignedIn(true);
    }

    const notSignedIn = () => {
        error();
        setIsSignedIn(false);
    }

    const onSubmit = async (values: FormikValues) => {
        await axios.post(endpoints.user.login, values)
            .then(resp => resp.data.email ? signedIn(resp.data) : notSignedIn())
    }

    const formik = useFormik({
        initialValues: initialState,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Data is uncorrect',
        });
    };

    const navigate = useNavigate();
    useEffect(() => {

        if (isSignedIn) {
            navigate("/volunteers/request")
        };

    }, [isSignedIn])
    return (
        <div className='greeting'>
            {contextHolder}
            <div className="new_user">
                <h1>New user?</h1>
                <h2>Sign up to save your personal information</h2>
                <Button onClick={() => navigate('/volunteers/register')}>Sign up</Button>
            </div>
            <div className="welcome_back">
                <h1>Welcome back</h1>
                <form
                    style={{ width: '30%', display: 'flex', flexDirection: 'column' }}
                    onSubmit={formik.handleSubmit}
                >
                    <p>Email</p>
                    <Input
                        placeholder='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        name='email'
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div style={{ color: 'red' }}>{formik.errors.email}</div>
                    )}
                    <p>Password</p>
                    <Input
                        placeholder='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        name='password'
                        type='password'
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    )}
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
})