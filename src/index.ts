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

//web socket se jo message aaega wo string format me hoga, even if we send an object, it will be converted to string

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

      if(parsedMessage.type=="chat"){
       const currentUserRoom = allSockets.find((x) => x.socket === socket)?.room;
        
      }
    })

    socket.on("disconnet", ()=>{
        allSockets = allSockets.filter(s => s !== socket);
    })
});
