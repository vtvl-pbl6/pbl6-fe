import React, { useContext, useState } from "react";
import {
  MenuOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import NotificationModal from "../../../components/admin/NotificationModal";
import "./header.scss";
import AccountContext from "../../../contexts/AccountContext";

const Header = () => {
  const { logoutAdmin } = useContext(AccountContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/admin/manage-account">Danh sách tài khoản</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/admin/list-requests">Yêu cầu kiểm duyệt</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="app-name">Threeds</h1>
      </div>
      <div className="header-right">
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
          <MenuOutlined className="header-icon" title="list-management" />
        </Dropdown>

        <BellOutlined
          className="header-icon"
          title="noti"
          onClick={showModal}
        />

        <UserOutlined className="header-icon" title="avatar" />
        <span className="user-name">Admin</span>
        <LogoutOutlined
          className="header-icon"
          onClick={async () => {
            await logoutAdmin();
          }}
        />

        <NotificationModal
          visible={isModalVisible}
          onClose={handleModalClose}
          modalRender={(node) => node}
          transitionName=""
        />
      </div>
    </header>
  );
};

export default Header;
