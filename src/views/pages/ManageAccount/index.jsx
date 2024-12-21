import React, { useState, useEffect, useContext, useCallback } from "react";
import "./index.scss";
import debounce from "lodash/debounce";
import AccountAPI from "../../../api/admin/accountAPI";
import { Table, Button, Input, Tag, Modal } from "antd";
import { DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import Utils from "../../../support/support_function";
import AccountContext from "../../../contexts/AccountContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageAccount() {
    const { accountRecords, setAccountRecords } = useContext(AccountContext);
    const [filteredRecords, setFilteredRecords] = useState(
        accountRecords || []
    );
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
        if (accountRecords.length === 0) {
            const fetchAccounts = async () => {
                try {
                    const response = await AccountAPI.getAccounts();
                    if (response.data.is_success) {
                        const formattedData = response.data.data.map(
                            (item) => ({
                                ...item,
                                createdAt: Utils.formatDateTime(
                                    item.created_at
                                ),
                                updateAt: Utils.formatDateTime(item.updated_at),
                                birthday: Utils.formatDate(item.birthday),
                            })
                        );
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
        if (isDeleted === 0) {
            setSelectedAccount({ id, isDeleted });
            setIsModalVisible(true); // Hiển thị modal khi "UnDel"
        } else {
            setSelectedAccount({ id, isDeleted });
            setIsModalVisible(true);
        }
    };

    const handleOk = async () => {
        if (selectedAccount) {
            const { id, isDeleted } = selectedAccount;
            try {
                const response =
                    isDeleted === 1
                        ? await AccountAPI.deactivateAccount(id)
                        : await AccountAPI.activateAccount(id);

                if (response.data.is_success) {
                    const updatedRecords = filteredRecords.map((record) =>
                        record.id === id
                            ? {
                                  ...record,
                                  status:
                                      isDeleted === 1 ? "INACTIVE" : "ACTIVE",
                              }
                            : record
                    );
                    setFilteredRecords(updatedRecords);
                    setAccountRecords(updatedRecords);
                    toast.info(
                        isDeleted === 1
                            ? "Tài khoản đã bị vô hiệu hóa!"
                            : "Tài khoản đã được kích hoạt!",
                        { autoClose: 2000 }
                    );
                }
            } catch (error) {
                console.error("Failed to update account status:", error);
            }
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
                <Tag color={status === "ACTIVE" ? "green" : "orange"}>
                    {status}
                </Tag>
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
                            onClick={() =>
                                onClickChangeDeleteStatus(record.id, 0)
                            }
                            icon={<UndoOutlined />}
                        />
                    ) : (
                        <Button
                            className="btn-Del"
                            onClick={() =>
                                onClickChangeDeleteStatus(record.id, 1)
                            }
                            icon={<DeleteOutlined />}
                        />
                    )}
                </div>
            ),
        },
    ];

    const handleFilter = useCallback(
        debounce((value) => {
            if (typeof value !== "string") return;
            const lowerValue = value.toLowerCase();
            const filteredData = accountRecords.filter(
                (row) =>
                    row.email.toLowerCase().includes(lowerValue) ||
                    row.display_name.toLowerCase().includes(lowerValue)
            );
            setFilteredRecords(value ? filteredData : accountRecords);
        }, 300),
        [accountRecords]
    );

    return (
        <div className="main-wrapper">
            <div className="container">
                <div className="data-table-container">
                    <h2 className="table-title">Danh sách tài khoản</h2>
                    <div className="sub-header">
                        <Input
                            placeholder="Tìm kiếm"
                            className="custom-search-input"
                            onChange={(event) =>
                                handleFilter(event.target.value)
                            }
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

            {/* Modal xác nhận */}
            <Modal
                title="Xác nhận"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <p>
                    {selectedAccount?.isDeleted === 0
                        ? "Bạn có chắc chắn muốn mở khóa tài khoản này?"
                        : "Bạn có chắc chắn muốn vô hiệu hóa tài khoản này?"}
                </p>
            </Modal>

            <ToastContainer />
        </div>
    );
}

export default ManageAccount;
