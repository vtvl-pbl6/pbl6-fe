import React, { useState, useEffect, useContext } from "react";
import { Modal, List, Button } from "antd";
import "./notificationModal.scss";
import NotificationAPI from "../../api/admin/notificationAPI";
import Utils from "../../support/support_function";
import AccountContext from "../../contexts/AccountContext";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({ visible, onClose }) => {
    const navigate = useNavigate();
    const { account } = useContext(AccountContext);
    const adminEmail = account.email;
    const [selectedTab, setSelectedTab] = useState("received");
    const [notifications, setNotifications] = useState({
        received: [],
        sent: [],
    });

    useEffect(() => {
        const fetchNotifications = async () => {
            if (visible) {
                try {
                    const receivedResponse =
                        await NotificationAPI.getNotifications(1);
                    const sentResponse =
                        await NotificationAPI.getCreatedNotifications(1);
                    console.log(receivedResponse.data.data);
                    console.log(sentResponse.data.data);

                    if (receivedResponse.data.is_success) {
                        const receivedNotifications =
                            receivedResponse.data.data.map((noti) => ({
                                id: noti.object_id,
                                sender: noti.sender.display_name,
                                content: Utils.formatContent(noti.content),
                                time: Utils.formatPostTime(noti.created_at),
                            }));

                        setNotifications((prev) => ({
                            ...prev,
                            received: receivedNotifications,
                        }));
                    }

                    if (sentResponse.data.is_success) {
                        const sentNotifications = sentResponse.data.data.map(
                            (noti) => ({
                                id: noti.id,
                                receiver: noti.receiver.display_name,
                                content: Utils.formatContent(noti.content),
                                time: Utils.formatPostTime(noti.created_at),
                            })
                        );

                        setNotifications((prev) => ({
                            ...prev,
                            sent: sentNotifications,
                        }));
                    }
                } catch (error) {
                    console.error("Error fetching notifications:", error);
                }
            }
        };

        fetchNotifications();
    }, [visible]);
    const handleViewClick = (id) => {
        navigate(`/admin/list-requests/detail/${id}`);
    };
    const handleDeleteClick = (id) => {
        console.log(`Xóa thông báo với ID: ${id}`);
    };
    // useEffect(() => {
    //   if (visible && adminEmail) {
    //     connectSocket(
    //       () => {
    //         subscribeToAdminNotifications(adminEmail, (newNotification) => {
    //           setNotifications((prev) => ({
    //             ...prev,
    //             received: [newNotification, ...prev.received],
    //           }));
    //         });
    //       },
    //       (error) => {
    //         console.error("Error connecting to WebSocket:", error);
    //       }
    //     );
    //   }
    //   return () => {
    //     onClose();
    //   };
    // }, [visible, adminEmail, onClose]);
    return (
        <Modal
            title="Thông báo"
            visible={visible}
            onCancel={onClose}
            modalRender={(node) => node}
            transitionName=""
            footer={null}
            width={400}
            className="notification-modal"
        >
            <div className="tabs">
                <span
                    onClick={() => setSelectedTab("received")}
                    className={selectedTab === "received" ? "active" : ""}
                >
                    Đã nhận
                </span>
                <span
                    onClick={() => setSelectedTab("sent")}
                    className={selectedTab === "sent" ? "active" : ""}
                >
                    Đã gửi
                </span>
            </div>

            <div className="notification-list">
                <List
                    dataSource={
                        selectedTab === "received"
                            ? notifications.received
                            : notifications.sent
                    }
                    renderItem={(noti) => (
                        <List.Item className="list-item">
                            <List.Item.Meta
                                title={
                                    <>
                                        <div className="sender-info">
                                            {selectedTab === "received"
                                                ? `Từ: ${noti.sender}`
                                                : `Đến: ${noti.receiver}`}
                                        </div>

                                        <span className="content">
                                            {noti.content}
                                        </span>
                                    </>
                                }
                                description={
                                    <span className="time">{noti.time}</span>
                                }
                            />
                            <div className="action-buttons">
                                {selectedTab === "received" ? (
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() => handleViewClick(noti.id)}
                                    >
                                        Xem
                                    </Button>
                                ) : (
                                    <Button
                                        type="primary"
                                        size="small"
                                        onClick={() =>
                                            handleDeleteClick(noti.id)
                                        }
                                    >
                                        Xóa
                                    </Button>
                                )}
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        </Modal>
    );
};

export default NotificationModal;
