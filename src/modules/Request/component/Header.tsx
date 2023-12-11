import { Menu, Button } from 'antd';
import axios from 'axios';
import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import endpoints from '../../../data/endpoint';
import { IItem, IPhoto } from '../../items/component/Item';
import { useDispatch } from 'react-redux';
import { setItems } from '../../../redux/slice/item-slice';
import { useUser } from '../../hooks/useUser';

const Header = memo(() => {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    const { fetchData } = useUser();
    useEffect(() => {
        fetchData()
    }, []);

    return (
        <header className="header">
            <div className="header-title">
                <h2>Volunteers</h2>
            </div>
            <Menu mode="horizontal" className="header-menu">
                {userData ? userData.role === 'admin' && (
                    <>
                        <Menu.Item key="items">
                            <Link to="/volunteers/items">Items</Link>
                        </Menu.Item>
                        <Menu.Item key="my-requests">
                            <Link to="/volunteers/my-requests">My requests</Link>
                        </Menu.Item>
                    </>
                ) : null}
                {userData ? userData.role === 'member' && (
                    <>
                        <Menu.Item key="request">
                            <Link to="/volunteers/request">Request</Link>
                        </Menu.Item>
                        <Menu.Item key="my-responses">
                            <Link to="/volunteers/my-responses">My responses</Link>
                        </Menu.Item>
                    </>
                ) : null}
            </Menu>
            <div className="user_info" style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 15 }}>
                    <strong>{userData ? userData.role === 'admin' ? "Admin" : 'No admin' : null}</strong>
                </span>
                <span style={{ marginRight: 15 }}>
                    <strong>{userData ? userData.email : null}</strong>
                </span>
                <Menu mode='horizontal' title='Settings' style={{ width: 130, borderRadius: 15 }} >
                    <Menu.SubMenu title="Settings">
                        <Menu.Item>
                            <Link to="/volunteers/user">
                                Users
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link onClick={() => localStorage.setItem('userData', '')} to="/volunteers/login">
                                Logout
                            </Link>
                        </Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </div>
        </header>
    );
});

export default Header;
