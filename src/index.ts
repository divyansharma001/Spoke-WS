import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];


wss.on("connection", (socket) => {
    allSockets.push(socket);

    userCount++;
    console.log("User connected #" + userCount);
    
    socket.on("message", (message)=>{
        console.log("Received: " + message.toString());
        for(let i=0;i<allSockets.length;i++){
            const s = allSockets[i];
            s.send("Sent from server: " + message.toString());
        }
        // setTimeout(()=>{
        //     socket.send("Sent from server: " + message.toString());
        // }, 1000);
        
    })

    socket.on("disconnet", ()=>{
        allSockets = allSockets.filter(s => s !== socket);
    })
});
