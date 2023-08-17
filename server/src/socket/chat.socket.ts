import { Socket } from "socket.io";
import WebSocketInterface from "./websocket.interface";
import { Message, User } from "../types/types";

class ChatSocket implements WebSocketInterface {
  users: User[] = [];

  handleConnection(io: Socket): void { 
    io.on('connection', (socket) => {
      console.log(`${socket.id} user just connected!`);

      socket.on('message', (data: Message) => {
        console.log(`message: ${JSON.stringify(data)}`)
        io.emit("messageResponse", data);
      })

      socket.on("typing", (data: string) => (
        socket.broadcast.emit("typingResponse", data)
      ))

      socket.on("newUser", (data: User) => {
        this.users.push(data)
        io.emit("newUserResponse", this.users)
      })

      socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        this.users = this.users.filter(user => user.socketId !== socket.id)
        io.emit("newUserResponse", this.users)
        socket.disconnect()
      });
    })
  }

  middlewareImplementation(socket: Socket, next: any) {
    return next();
  }
}

export default ChatSocket;