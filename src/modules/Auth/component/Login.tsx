import { Button, Input, Select } from 'antd';
import { FormikValues, useFormik } from 'formik';
import React, { memo } from 'react';
import *  as Yup from 'yup'
import endpoints from '../../../data/endpoint';
export const Login = memo(() => {

    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email(),
        password: Yup.string().required(),
    })

    const initialState = {
        email: '',
        password: '',
    };

    const onSubmit = (values: FormikValues) => {
        fetch(endpoints.auth.login, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
    }

    const formik = useFormik({
        initialValues: initialState,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });


    return (
        <div className='register'>
            <h1>Login</h1>
            <form
                style={{ width: '30%', display: 'flex', flexDirection: 'column' }}
                onSubmit={formik.handleSubmit}
            >
                <Input
                    placeholder='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    name='email'
                />
                {formik.errors.email && formik.touched.email && (
                    <div style={{ color: 'red' }}>{formik.errors.email}</div>
                )}
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
    );
})