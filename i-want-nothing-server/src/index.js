import express, { response } from 'express';
import { WebSocketServer } from "ws";
import { html } from './html';
import ip from "ip";
import qrcode from 'qrcode';
const LOGGING = false;
const wss = new WebSocketServer({
    port: 8083,
    perMessageDeflate: {
        zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3,
        },
        zlibInflateOptions: {
            chunkSize: 10 * 1024,
        },
        // Other options settable:
        clientNoContextTakeover: true, // Defaults to negotiated value.
        serverNoContextTakeover: true, // Defaults to negotiated value.
        serverMaxWindowBits: 10, // Defaults to negotiated value.
        // Below options specified as default values.
        concurrencyLimit: 10, // Limits zlib concurrency for perf.
        threshold: 1024, // Size (in bytes) below which messages
        // should not be compressed if context takeover is disabled.
    },
});
if (LOGGING)
    console.log(`Established websocket server on ${JSON.stringify(wss.address())}`);
const ipAddress = ip.address();
const clientAddress = `http://${ipAddress}:8084`;
if (LOGGING)
    console.log(`IP address is ${ipAddress}`);
let connections = [false, false, false, false, false, false, false, false];
let mainSocket = null;
wss.on("connection", (ws, request) => {
    ws.on("error", console.error);
    if (request.rawHeaders.includes("Main")) {
        mainSocket = ws;
        (async () => {
            const qr = await qrcode.toString(clientAddress);
            ws.send(qr);
        })();
        ws.on("close", () => {
            if (LOGGING)
                console.log("Closed connection with main.");
        });
        ws.on("message", data => {
            if (LOGGING)
                console.log("Received main data");
        });
        return;
    }
    // Otherwise, it's a mini client
    let index = 0;
    for (; index < 8; index++) {
        if (!connections[index])
            break;
    }
    const buffer = new Uint8Array(1);
    buffer[0] = index;
    ws.send(buffer);
    connections[index] = true;
    if (LOGGING)
        console.log(`Connected with client index ${index}`);
    ws.on("close", () => {
        if (LOGGING)
            console.log(`Closed connection with client index ${index}.`);
        connections[index] = false;
    });
    ws.on("message", (data) => {
        if (LOGGING)
            console.log(`Received data ${data[0]} from client index ${index}`);
        if (mainSocket !== null) {
            data[0] |= index;
            mainSocket.send(data);
            if (LOGGING)
                console.log(`Sent ${data[0]} to main socket`);
        }
    });
});
const app = express();
app.get('/', (request, response) => {
    response.send(html.replace("<<IP>>", ipAddress));
});
app.listen(8084, () => {
});
(async () => {
    const qr = await qrcode.toString(clientAddress);
    console.log(`      
============================================

SERVER STARTED; PLAYERS CAN CONNECT BY SCANNING THIS QR CODE ON A MOBILE PHONE:
${qr}
============================================`);
})();
