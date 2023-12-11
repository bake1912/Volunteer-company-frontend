import React, { memo, useState } from 'react';
import '../style/RequestPage.scss';
import { Button, Form, Input, Select, message } from 'antd';
import CharityImage from '../../../data/images/charity.jpg';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import endpoints from '../../../data/endpoint';
import { IRequest, addRequest } from '../../../redux/slice/request-slice';
import Item, { IItem } from '../../items/component/Item';
const { Option } = Select;

const RequestPage = memo(() => {
    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.items.items);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const userData = JSON.parse(localStorage.getItem('userData') as string) || "";
    const [messageApi, contextHolder] = message.useMessage();
    const formik = useFormik({
        initialValues: { description: '', selectedItems: [], delayName: '', forWhomName: '' },
        validationSchema: Yup.object().shape({
            description: Yup.string().required('Please enter a description'),
            selectedItems: Yup.array().min(1, 'Please select at least one item'),
            delayName: Yup.string().required(),
            forWhomName: Yup.string().required()
        }),
        onSubmit: (values) => {
            axios.post(endpoints.request.postRequest(), {
                description: values.description,
                userId: userData.id,
                delayName:values.delayName,
                forWhomName:values.forWhomName
            }).then(resp => {
                const req = resp.data;
                const selectedItemsObj: IItem[] = [];
                selectedItems.forEach(selectedItemId => {
                    const findingItem = items.find(item => item.id === selectedItemId);
                    if (findingItem) {
                        selectedItemsObj.push(findingItem);
                    }
                })
                const fullRequest: IRequest = { ...req, items: selectedItemsObj }
                dispatch(addRequest(fullRequest));
                axios.post(endpoints.request.postItemRequest(req.id), {
                    requestId: req.id,
                    itemsId: values.selectedItems,
                }).then((resp) => {
                    if (resp.data) {
                        succesReqeust()
                    }
                })
            })
        },
    });

    const succesReqeust = () => {
        messageApi.open({
            type: 'success',
            content: 'The Request has been created'
        })
    }

    return (
        <div className='main_page'>
            <Header />
            <main className='main'>
                {contextHolder}
                <div className="main-left">
                    <img src={'https://concord3000.com.ua/uploads/41/Symbol_Concord.png'} style={{ height: '100%', width: '100%' }} alt="charity" />
                </div>
                <div className="main-right">
                    <h1 style={{ textAlign: 'center' }}>Request form</h1>
                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={formik.handleSubmit}>
                        <p>Description</p>
                        <Input.TextArea
                            rows={4}
                            placeholder='Enter a description'
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            name='description'
                        />
                        {formik.errors.description && formik.touched.description && (
                            <div style={{ color: 'red' }}>{formik.errors.description}</div>
                        )}
                        <p>Select Items</p>
                        <Select
                            mode="multiple"
                            placeholder="Select items"
                            onChange={(values) => {
                                formik.setFieldValue('selectedItems', values);
                                setSelectedItems(values);
                            }}
                            value={selectedItems}

                        >
                            {items.map((item) => (
                                <Option key={item.id} value={item.id}>
                                    <Item {...item} />
                                </Option>
                            ))}
                        </Select>
                        {formik.errors.selectedItems && formik.touched.selectedItems && (
                            <div style={{ color: 'red' }}>{formik.errors.selectedItems}</div>
                        )}
                        <p>Select delay</p>
                        <Select
                            value={formik.values.delayName}
                            onChange={e => formik.setFieldValue('delayName', e)}
                            options={
                                [
                                    {
                                        label: 'Urgently',
                                        value: 'urgently'
                                    },
                                    {
                                        label: 'Does not matter',
                                        value: 'does not matter'
                                    }
                                ]
                            }
                        />
                        <p>Select for whom</p>
                        <Select
                            value={formik.values.forWhomName}
                            onChange={e => formik.setFieldValue('forWhomName', e)}
                            options={
                                [
                                    {
                                        label: 'For me',
                                        value: 'for me'
                                    },
                                    {
                                        label: 'For others',
                                        value: 'for others'
                                    }
                                ]
                            }
                        />
                        <Button style={{ marginTop: '1%' }} type='primary' htmlType='submit'>
                            Submit Request
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
});

export default RequestPage;
