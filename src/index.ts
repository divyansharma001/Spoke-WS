import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    socket: WebSocket,
    room: string
}

let userCount = 0;
let allSockets: User[] = [];

//what user can send

// Join a room                  
//{
//     "type": "join",
//     "payload": {
//       "roomId": "123"
//     }
//  }

//Send a message
// {
// 	"type": "chat",
// 	"payload": {
// 		"message: "hi there"
// 	}
// }

wss.on("connection", (socket) => {
    allSockets.push(socket);

    userCount++;
    console.log("User connected #" + userCount);
    
    socket.on("message", (message)=>{
      const parsedMessage = JSON.parse(message.toString());
      if(parsedMessage.type=="join"){
        allSockets.push({
            socket,
            room: parsedMessage.payload.roomId
        })
      }
    })

    socket.on("disconnet", ()=>{
        allSockets = allSockets.filter(s => s !== socket);
    })
});
