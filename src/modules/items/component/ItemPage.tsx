import React, { memo, useEffect, useState } from 'react';
import Item, { IItem, IPhoto } from './Item';
import axios from 'axios';
import endpoints from '../../../data/endpoint';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addItem, setItems } from '../../../redux/slice/item-slice';
import { Button, Form, Input, Modal, Select, Upload } from 'antd';
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup'
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadFile } from 'antd/es/upload';
import Header from '../../Request/component/Header';
import { useUser } from '../../hooks/useUser';
const ItemPage = memo(() => {
    const items = useSelector((store: RootState) => store.items.items);
    const dispatch = useDispatch();

    const postItem = async (values: IItem) => {
        await axios.post(endpoints.items.postItem, {
            ...values
        }).then(resp => dispatch(addItem(resp.data)))
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        sizeName: Yup.string().required(),
        typeName: Yup.string().required(),
        sexName: Yup.string().required(),
    });

    const initialState = {
        name: '',
        description: '',
        sizeName: '',
        typeName: '',
        sexName: '',
    };

    const [fileList, setFileList] = useState<File | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { fetchData } = useUser();
    const onSubmit = async (values: FormikValues) => {
        setModalVisible(false);
        await axios.post(endpoints.items.postItem, {
            ...values
        }).then(async resp => {
            const formdata = new FormData();
            formdata.append('photo', fileList as File)
            await axios.post(endpoints.items.postPhoto(resp.data.id), formdata).then(async aw => {
                await fetchData()
            })
        })
    };

    const formik = useFormik({
        initialValues: initialState,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: onSubmit,
    });

    return (
        <>
            <Header />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {items.map(item => {
                    const { isInTable, ...rest } = item;
                    return (
                        <Item key={item.id} isInTable={true}  {...rest} />
                    )
                })}
            </div>
            <div>
                <Button onClick={() => setModalVisible(true)}>Create item</Button>
                <Modal
                    title="Create Item"
                    visible={modalVisible}
                    onCancel={() => setModalVisible(false)}
                    footer={null}
                >
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <p>Name</p>
                        <Input
                            placeholder='Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            name='name'
                        />
                        {formik.errors.name && formik.touched.name && (
                            <div style={{ color: 'red' }}>{formik.errors.name}</div>
                        )}
                        <p>Description</p>
                        <Input
                            placeholder='Description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            name='description'
                        />
                        {formik.errors.description && formik.touched.description && (
                            <div style={{ color: 'red' }}>{formik.errors.description}</div>
                        )}
                        <p>Size</p>
                        <Select
                            placeholder='Size'
                            value={formik.values.sizeName}
                            onChange={e => formik.setFieldValue('sizeName', e)}
                            options={[{
                                label: 'XS',
                                value: 'XS'
                            },
                            {

                                label: 'S',
                                value: 'S'
                            },
                            {

                                label: 'M',
                                value: 'M'
                            },
                            {

                                label: 'L',
                                value: 'L'
                            },
                            {

                                label: 'XL',
                                value: 'XL'
                            }
                            ]}
                            id='sizeName'
                        />
                        {formik.errors.sizeName && formik.touched.sizeName && (
                            <div style={{ color: 'red' }}>{formik.errors.sizeName}</div>
                        )}
                        <p>Type</p>
                        <Select
                            placeholder='Type'
                            value={formik.values.typeName}
                            onChange={e => formik.setFieldValue('typeName', e)}
                            options={[
                                {

                                    label: 'Shoes',
                                    value: 'Shoes'
                                },
                                {

                                    label: 'Pants',
                                    value: 'Pants'
                                },
                                {

                                    label: 'Jacket',
                                    value: 'Jacket'
                                },
                                {

                                    label: 'T-shirt',
                                    value: 'T-shirt'
                                },
                                {

                                    label: 'Hoody',
                                    value: 'Hoody'
                                },
                            ]}
                            id='typeName'
                        />
                        {formik.errors.typeName && formik.touched.typeName && (
                            <div style={{ color: 'red' }}>{formik.errors.typeName}</div>
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
                        <Button type='primary' htmlType='submit'>
                            Submit
                        </Button>
                    </form>
                </Modal>
            </div >
        </>
    );
});

export default ItemPage;
