import express from 'express';
import { WebSocketServer } from "ws";
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
console.log(`Established websocket server on ${JSON.stringify(wss.address())}`);
let connections = [false, false, false, false, false, false, false, false];
let mainSocket = null;
wss.on("connection", (ws, request) => {
    ws.on("error", console.error);
    if (request.rawHeaders.includes("Main")) {
        mainSocket = ws;
        ws.on("close", () => {
            console.log("Closed connection with main.");
        });
        ws.on("message", data => {
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
    connections[index] = true;
    console.log(`Connected with client index ${index}`);
    ws.on("close", () => {
        console.log(`Closed connection with client index ${index}.`);
        connections[index] = false;
    });
    ws.on("message", (data) => {
        console.info(`Received data ${data[0]} from client index ${index}`);
        if (mainSocket !== null) {
            data[0] |= index;
            mainSocket.send(data);
            console.log(`Sent ${data[0]} to main socket`);
        }
    });
});
const app = express();
app.set('view engine', 'ejs');
app.get('/join', (request, response) => {
    response.render("pages/join", {
        ip: "192.168.8.9"
    });
});
app.listen(8084, () => {
    console.log(`Client server running on 8084`);
});
