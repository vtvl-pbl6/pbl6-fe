import React from 'react';
import {
     MenuOutlined,
     BellOutlined,
     UserOutlined } 
    from '@ant-design/icons';
import './header.scss'; 

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <h1 className="app-name">Threeds</h1> 
            </div>
            <div className="header-right">
                <MenuOutlined className="header-icon" title="management" /> 
                <BellOutlined className="header-icon" title="noti" /> 
                <UserOutlined className="header-icon" title="avatar" />
                <span className="user-name">Admin</span> 
            </div>
        </header>
    );
};

export default Header;
