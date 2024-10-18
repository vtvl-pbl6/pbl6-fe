import React, { useEffect, useState } from 'react';
import { connectSocket, disconnectSocket, sendMessage, subscribeToChat } from '../../api/socketClient';

const ChatRoom = () => {
    const [newMessage, setNewMessage] = useState('');
    const [connected, setConnected] = useState(false);
    const [publicChats, setPublicChats] = useState([]);
    const [userData, setUserData] = useState({
        username: "user1",
        receivername: "user2",
        connected: false,
        message: "",
    });

    /**
     * Callback function to handle received messages.
     * @param {object} payload The message payload.
     */
    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);

        switch (payloadData.status) {
            case "MESSAGE":
                setPublicChats((prevChats) => [...prevChats, payloadData]);
                break;
            default:
                console.log('Received message:', payload);
        }
    };

    useEffect(() => {
        connectSocket(() => {
            setConnected(true);
            subscribeToChat(onMessageReceived);
        }, (error) => {
            console.error('Error connecting to WebSocket:', error);
        });

        return () => {
            disconnectSocket();
        };
    }, []);

    /**
     * Sends a new message.
     */
    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            const messageData = {
                senderName: userData.username,
                receiverName: userData.receivername,
                message: newMessage,
                status: "MESSAGE"
            };
            sendMessage(messageData);
            setNewMessage('');
        }
    };

    return (
        <div>
            {connected ? (
                <div>
                    <h2>Chat</h2>
                    <ul>
                        {publicChats.map((message, index) => (
                            <li key={index}>{message.senderName}: {message.message}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            ) : (
                <p>Connecting to WebSocket...</p>
            )}
        </div>
    );
};

export default ChatRoom;