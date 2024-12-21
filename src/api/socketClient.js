import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;
let reconnectAttempts = 0; // Số lần thử kết nối lại
const MAX_RECONNECT_ATTEMPTS = 5; // Số lần thử kết nối lại tối đa

const isConnected = () => stompClient && stompClient.connected;

const connectSocket = async (onConnected, onError) => {
  const accessToken = localStorage.getItem("token");

  if (!accessToken) {
    console.error("No access token found!");
    return;
  }

  if (!stompClient) {
    const socket = new SockJS(process.env.REACT_APP_API_WS_URL);

    stompClient = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        reconnectAttempts = 0; // Reset lại số lần thử khi kết nối thành công
        console.log("Connected to WebSocket server.");
        if (onConnected) onConnected();
      },
      onStompError: (error) => {
        console.error("STOMP error:", error);
        if (onError) onError(error);
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket server.");
        reconnectSocket(onConnected, onError);
      },
    });

    stompClient.activate();
  }
};

const reconnectSocket = (onConnected, onError) => {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts++;
    console.log(`Reconnecting attempt ${reconnectAttempts}...`);
    setTimeout(
      () => connectSocket(onConnected, onError),
      2000 * reconnectAttempts
    ); // Tăng thời gian thử lại
  } else {
    console.error(
      "Max reconnect attempts reached. Could not connect to WebSocket."
    );
  }
};

const subscribeToTopic = (topic, onMessageReceived) => {
  if (isConnected()) {
    stompClient.subscribe(topic, (message) => {
      const data = JSON.parse(message.body);
      onMessageReceived(data);
    });
  } else {
    console.error("Cannot subscribe, STOMP client not connected.");
  }
};

const subscribeToNotifications = (email, onNotificationReceived) => {
  const notificationPath = `/private/${email}/user/notification`;
  console.log("Subscribing to notifications:", notificationPath);
  subscribeToTopic(notificationPath, onNotificationReceived);
};
const subscribeToAdminNotifications = (adminId, onNotificationReceived) => {
  const adminNotificationPath = `/private/${adminId}/admin/notification`;
  console.log("Subscribing to admin notifications:", adminNotificationPath);
  subscribeToTopic(adminNotificationPath, onNotificationReceived);
};
const subscribeThreadChannel = (onNotification) => {
  const path = "/public/user";
  console.log("Subscribing to thread:", path);
  subscribeToTopic(path, onNotification);
};

const sendMessage = (messageData) => {
  if (isConnected() && messageData) {
    stompClient.publish({
      destination: "/app/message",
      body: JSON.stringify(messageData),
    });
  } else {
    console.error(
      "Cannot send message, STOMP client not connected or message data is empty."
    );
  }
};

const disconnectSocket = () => {
  if (isConnected()) {
    stompClient.deactivate();
  }
};

export {
  connectSocket,
  disconnectSocket,
  isConnected,
  sendMessage,
  subscribeToTopic,
  subscribeToNotifications,
  subscribeThreadChannel,
  subscribeToAdminNotifications,
};
