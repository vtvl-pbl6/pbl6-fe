import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../contexts/themeContext";
import "./index.scss";
import NotificationAPI from "../../../api/notificationAPI";
import Follow from "../../../components/noti/follow";
import Comment from "../../../components/noti/comment";
import {
  connectSocket,
  disconnectSocket,
  subscribeToNotifications,
} from "../../../api/socketClient";
import AccountContext from "../../../contexts/AccountContext";

const Activity = ({ setActiveIcon }) => {
  const { t } = useTranslation();
  const { currentTheme } = useContext(ThemeContext);
  const { account } = useContext(AccountContext);
  const [notifications, setNotifications] = useState([]);
  const userEmail = account.email;

  useEffect(() => {
    setActiveIcon("activity");

    const onConnected = () => {
      console.log("Connected to WebSocket server.");
      subscribeToNotifications(userEmail, (newNotification) => {
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]);
        console.log("Received notification:", newNotification);
      });
    };

    connectSocket(onConnected, (error) => {
      console.error("Socket connection error:", error);
    });

    const fetchNotifications = async () => {
      try {
        const response = await NotificationAPI.getNotifications(1);
        const sortedNotifications = response.data.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setNotifications(sortedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="main-wrapper">
      <div className="activity-header">{t("activity.activity")}</div>
      <div
        className="container-main"
        style={{
          backgroundColor: currentTheme.bgPost,
          color: currentTheme.text,
          "--border-color": currentTheme.borderColor,
        }}
      >
        <div className="activity-body">
          {notifications.map((notification) => (
            <div key={notification.id} style={{ marginBottom: "10px" }}>
              {notification.type === "FOLLOW" && (
                <Follow follower={notification} />
              )}
              {notification.type === "COMMENT" && (
                <Comment comment={notification} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Activity;
