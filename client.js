import React, { useState, useEffect, useContext } from 'react';

const WebSocketContext = React.createContext();

export function WebSocketProvider({ children }) {
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');

        socket.onopen = () => {
            console.log('Connected to WebSocket');
        };

        socket.onmessage = (message) => {
            const data = JSON.parse(message.data);
            handleServerMessage(data);
        };

        socket.onclose = () => {
            console.log('Disconnected from WebSocket');
        };

        setWs(socket);

        return () => socket.close();
    }, []);

    const handleServerMessage = (data) => {
        switch (data.type) {
            case 'init':
                // Initialize game state
                break;
            case 'update':
                // Update game state
                break;
            case 'error':
                // Handle errors
                break;
            default:
                break;
        }
    };

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
}

export function useWebSocket() {
    return useContext(WebSocketContext);
}
