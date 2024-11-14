import React, { useState, useEffect, useContext } from "react";
import "./index.scss";
import AccountAPI from "../../../api/admin/accountAPI";
import { Table, Button, Input, Tag } from "antd";
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import Utils from "../../../support/support_function";
import AccountContext from "../../../contexts/AccountContext";

function ManageAccount() {
  const { accountRecords, setAccountRecords } = useContext(AccountContext);
  const [filteredRecords, setFilteredRecords] = useState(accountRecords || []);

  useEffect(() => {
    if (accountRecords.length === 0) {
      const fetchAccounts = async () => {
        try {
          const response = await AccountAPI.getAccounts();
          if (response.data.is_success) {
            const formattedData = response.data.data.map((item) => ({
              ...item,
              createdAt: Utils.formatDateTime(item.created_at),
              updateAt: Utils.formatDateTime(item.updated_at),
              birthday: Utils.formatDate(item.birthday),
            }));
            setAccountRecords(formattedData);
            setFilteredRecords(formattedData);
          }
        } catch (error) {
          console.error("Failed to fetch accounts:", error);
        }
      };
      fetchAccounts();
    } else {
      setFilteredRecords(accountRecords);
    }
  }, [accountRecords]);
  const onClickChangeDeleteStatus = (id, isDeleted) => {
    // Logic to change delete status of an account
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "display_name",
      key: "display_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      sorter: (a, b) => new Date(a.birthday) - new Date(b.birthday),
    },
    {
      title: "Create at",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Update at",
      dataIndex: "updateAt",
      key: "updateAt",
      sorter: (a, b) => new Date(a.updateAt) - new Date(b.updateAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "ACTIVE" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="center-content">
          {record.status === "INACTIVE" ? (
            <Button
              className="btn-UnDel"
              onClick={() => onClickChangeDeleteStatus(record.id, 0)}
              icon={<UndoOutlined />}
            />
          ) : (
            <Button
              className="btn-Del"
              onClick={() => onClickChangeDeleteStatus(record.id, 1)}
              icon={<DeleteOutlined />}
            />
          )}
        </div>
      ),
    },
  ];

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredData = accountRecords.filter((row) =>
      row.email.toLowerCase().includes(value)
    );
    setFilteredRecords(value ? filteredData : accountRecords);
  };
  return (
    <div className="main-wrapper">
      <div className="container">
        <div className="data-table-container">
          <h2 className="table-title">Danh sách tài khoản</h2>
          <div className="sub-header">
            <Input
              placeholder="Tìm kiếm"
              className="custom-search-input"
              onChange={handleFilter}
            />
          </div>
          <Table
            columns={columns}
            dataSource={filteredRecords}
            rowKey="id"
            pagination={{ pageSize: 20 }}
            className="management-account-table"
          />
        </div>
      </div>
    </div>
  );
}

export default ManageAccount;
