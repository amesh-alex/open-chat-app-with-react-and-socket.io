import { Socket } from "socket.io";

interface WebSocketInterface {
    handleConnection(socket: Socket): void;
    middlewareImplementation?(socket: Socket, next: any): void;
}

export default WebSocketInterface;