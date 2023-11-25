import { Button, Input, Select } from 'antd';
import { FormikValues, useFormik } from 'formik';
import React, { memo } from 'react';
import *  as Yup from 'yup'
import endpoints from '../../../data/endpoint';
const Register = memo(() => {

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
        sexName: Yup.string().required()

    })

    const initialState = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sexName: ''
    };

    const onSubmit = (values: FormikValues) => {
        fetch(endpoints.auth.register, {
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
            <h1>Registration</h1>
            <form
                style={{ width: '30%', display: 'flex', flexDirection: 'column' }}
                onSubmit={formik.handleSubmit}
            >
                <Input
                    placeholder='first name'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    name='firstName'
                />
                {formik.errors.firstName && formik.touched.firstName && (
                    <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
                )}
                <Input
                    placeholder='last name'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    name='lastName'
                />
                {formik.errors.lastName && formik.touched.lastName && (
                    <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
                )}
                <Input
                    placeholder='email'
                    value={formik.values.email}
                    type='email'
                    onChange={formik.handleChange}
                    name='email'
                />
                {formik.errors.email && formik.touched.email && (
                    <div style={{ color: 'red' }}>{formik.errors.email}</div>
                )}
                <Input
                    placeholder='password'
                    value={formik.values.password}
                    type='password'
                    onChange={formik.handleChange}
                    name='password'
                />
                {formik.errors.password && formik.touched.password && (
                    <div style={{ color: 'red' }}>{formik.errors.password}</div>
                )}
                <Select
                    placeholder='sexName'
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
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </form>
        </div>
    );
});

export default Register;