import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// Global variable to hold the STOMP client instance
let stompClient = null;

/**
 * Checks if the STOMP client is connected.
 * @returns {boolean} True if the STOMP client is connected, false otherwise.
 */
const isConnected = () => stompClient && stompClient.connected;

/**
 * Connects to the WebSocket server.
 * @param {function} onConnected Callback function to execute when the connection is successful.
 * @param {function} onError Callback function to execute when an error occurs.
 */
const connectSocket = async (onConnected, onError) => {
    if (!stompClient) {
        const socket = new SockJS(process.env.REACT_APP_API_WS_URL);
        const accessToken = localStorage.getItem('token');

        if (!accessToken) {
            console.error('No access token found!');
            return;
        }

        stompClient = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            onConnect: onConnected,
            onStompError: (error) => {
                console.error('STOMP error:', error);
                if (onError) onError(error);
            },
        });

        stompClient.activate();
    }
};

/**
 * Subscribes to receive messages from the WebSocket server.
 * @param {function} onMessageReceived Callback function to execute when a message is received.
 */
const subscribeToChat = (onMessageReceived) => {
    if (stompClient) {
        stompClient.subscribe('/public', onMessageReceived);
    } else {
        console.error('STOMP client is not initialized or connected.');
    }
};

/**
 * Sends a message to the WebSocket server.
 * @param {object} messageData The message data to be sent.
 */
const sendMessage = (messageData) => {
    if (isConnected() && messageData) {
        stompClient.publish({
            destination: '/app/message',
            body: JSON.stringify(messageData),
        });
    } else {
        console.error('STOMP connection not established.');
    }
};

/**
 * Disconnects from the WebSocket server.
 */
const disconnectSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
    }
};

export {
    connectSocket,
    disconnectSocket,
    isConnected,
    sendMessage,
    subscribeToChat
};
