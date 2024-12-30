const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname)));

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (data) => {
        // Broadcast data to all connected clients except the sender
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});


server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
