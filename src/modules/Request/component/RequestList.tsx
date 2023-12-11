import React, { memo, useEffect, useState } from 'react';
import axios from 'axios';
import endpoints from '../../../data/endpoint';
import { useDispatch } from 'react-redux';
import { IRequest, setRequests } from '../../../redux/slice/request-slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Button, Modal, Table, Select, Drawer } from 'antd';
import Item, { IItem } from '../../items/component/Item';
import Header from './Header';
import TextArea from 'antd/es/input/TextArea';
import useMessage from 'antd/es/message/useMessage';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const { Option } = Select;

const RequestList = memo(() => {
    const dispatch = useDispatch();
    const requests = useSelector((store: RootState) => store.requests).requests;
    const [messageApi, contextHolder] = useMessage();
    const items = useSelector((store: RootState) => store.items);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(endpoints.request.getAll);
                const requestsData = resp.data as IRequest[];

                const requestsWithItems = await Promise.all(
                    requestsData.map(async (request) => {
                        const itemsData: IItem[] = (await axios.get(endpoints.request.getAllReqItems(request.id))).data;
                        return { ...request, items: itemsData || [] };
                    })
                );

                dispatch(setRequests(requestsWithItems));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Items',
            dataIndex: 'items',
            key: 'items',
            render: (request: any[]) => (
                <div style={{ display: 'flex' }}>
                    {request.map((req) =>
                        req.itemId ? <Item {...items.items.find((item) => item.id === req.itemId)!} /> : <span key="no-photos">No photos</span>
                    )}
                </div>
            ),
        },
        {
            title: 'User id',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: ' For whom name',
            dataIndex: 'forWhomName',
            key: 'forWhomName',
        },
        {
            title: 'Delay',
            dataIndex: 'delayName',
            key: 'delayName',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, req: IRequest) => (
                <>
                    <Button onClick={() => handleRowClick(req)}>Response</Button>
                </>
            ),
        },
    ];

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedRequest, setSelectedRequest] = useState<IRequest | null>(null);

    const handleRowClick = (request: IRequest) => {
        setSelectedRequest(request);
        formik.setValues({
            responseText: '',
            requestId: request.id,
            statusName: '',
        });
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedRequest(null);
        setIsOpen(false);
    };

    const formik = useFormik({
        initialValues: {
            responseText: '',
            requestId: 0,
            statusName: '',
        },
        validationSchema: Yup.object().shape({
            responseText: Yup.string().required('Please enter a response text'),
            statusName: Yup.string().required('Please select the response status'),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:8080/volunteers/response', values);
                successResponse();
                setIsOpen(false);
            } catch (error) {
                console.error('Error submitting response:', error);
            }
        },
    });

    const successResponse = () => {
        messageApi.open({
            type: 'success',
            content: 'The response has been created',
        });
    };

    return (
        <div>
            <Header />
            {contextHolder}
            <h1 style={{ textAlign: 'center' }}>List of requests</h1>
            <Table pagination={{ pageSize: 9 }} dataSource={requests} columns={columns} rowKey="id" />
            <Drawer open={isOpen}  onClose={()=>setIsOpen(false)}>
                <form onSubmit={formik.handleSubmit} style={{display:'flex',flexDirection:'column'}}>
                    <label htmlFor="responseText">Response Text:</label>
                    <TextArea
                        id="responseText"
                        name="responseText"
                        value={formik.values.responseText}
                        onChange={formik.handleChange}
                        required
                    />
                    {formik.errors.responseText && formik.touched.responseText && (
                        <div style={{ color: 'red' }}>{formik.errors.responseText}</div>
                    )}

                    <label htmlFor="statusName">Is approved:</label>
                    <Select
                        id="statusName"
                        value={formik.values.statusName}
                        onChange={(value) => formik.setFieldValue('statusName', value)}
                        options={[
                            { label: 'Approved', value: 'Approved' },
                            { label: 'Denied', value: 'Denied' },
                        ]}
                    />
                    {formik.errors.statusName && formik.touched.statusName && (
                        <div style={{ color: 'red' }}>{formik.errors.statusName}</div>
                    )}

                    <Button type="primary" htmlType="submit">
                        Submit Response
                    </Button>
                </form>
            </Drawer>
        </div>
    );
});

export default RequestList;
