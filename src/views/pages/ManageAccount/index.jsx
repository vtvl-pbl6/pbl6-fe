import React, { useState, useEffect } from 'react';
import "./index.scss";
import fakeData from "../../../data/fake_data.json";
import DataTable from "react-data-table-component";
import accountAPI from "../../../api/accountAPI";
import SupportFunction from "../../../support/support_function";
import { toast } from "react-toastify";
import { Button } from "antd";
import {
    DeleteOutlined,
    LockOutlined,
    UndoOutlined,
    UnlockOutlined,
} from "@ant-design/icons";

function ManageAccount() {
    const data = fakeData.Accounts
    const [records, setRecords] = useState(data);
    // const [originalRecords, setOriginalRecords] = useState([]);
    // const [records, setRecords] = useState([]);

    // const deleteAccount = async (accId, isDeleted) => {
    //     try {
    //         await accountAPI.deleteAccount(accId, isDeleted);
    //         const newRecords = records.map((record) => {
    //             if (record.id === accId) {
    //                 console.log({ ...record, isDeleted: isDeleted ? true : false }," deleteAccount", record.isDeleted);
    //                 return { ...record, isDeleted: isDeleted ? true : false };
    //             } else {
    //                 return record;
    //             }
    //         });
    //         setOriginalRecords(newRecords);
    //         setRecords(newRecords);
    //         toast.success(isDeleted ? "Delete account successfully" : "Recovery account successfully");
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Failed to delete account");
    //     }
    // };

    // useEffect(() => {
    //     const callApi = async () => {
    //         try {
    //             const response = await accountAPI.getAllAccountByAdmin();
    //             setOriginalRecords(response.data);
    //             console.log(response.data);
    //             setRecords(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     callApi();
    // }, []);

    const onClickChangeDeleteStatus = (id, isDeleted) => {
        //Mở khóa tai khoan
        // deleteAccount(id, isDeleted);
    };
    
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Create at",
            selector: (row) =>
                SupportFunction.convertDateFromArrayToString(row.createdAt),
            sortable: true,
        },
        {
            name: "Birthday",
            selector: (row) => row.birthday,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => (
                <div className="center-content">
                    {row.isDeleted ? (
                        <LockOutlined className="lock-icon" />
                    ) : (
                        <UnlockOutlined className="unlock-icon" />
                    )}
                </div>
            ),
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="center-content">
                    {row.isDeleted ? (
                        <Button
                            className="btn-UnDel"
                            onClick={() => onClickChangeDeleteStatus(row.id, 0)}
                            icon={<UndoOutlined />}
                        />
                    ) : (
                        <Button
                            className="btn-Del"
                            onClick={() => onClickChangeDeleteStatus(row.id, 1)}
                            icon={<DeleteOutlined />}
                        />
                    )}
                </div>
            ),
        },
    ];

    function handleFilter(event) {
        // const value = event.target.value.toLowerCase();
        // const newData = originalRecords.filter((row) => {
        //     return row.name.toString().toLowerCase().includes(value);
        // });
        // setRecords(newData);
        const newData = data.filter(row => {
            return row.email.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setRecords(newData);
    }

    return (
        <div className="container">
            <div className="data-table-container">
                <DataTable
                    title={<div className="custom-title">Account List</div>}
                    columns={columns}
                    data={records}
                    selectableRows
                    selectableRowsHighlight
                    highlightOnHover
                    fixedHeader
                    pagination
                    subHeader
                    subHeaderComponent={
                        <div className="sub-header">
                            <input
                                type="text"
                                placeholder="Search here"
                                className="form-control custom-search-input"
                                onChange={handleFilter}
                            />
                        </div>
                    }
                    subHeaderAlign="right"
                    className="managament-account-table"
                />
            </div>
        </div>
    );
}

export default ManageAccount;
