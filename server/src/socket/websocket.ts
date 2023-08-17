import { Server as HTTPServer } from 'http';
import { Server, Socket } from "socket.io";

const WEBSOCKET_CORS = {
  origin: "*",
  methods: ["GET", "POST"]
}

class WebSocket extends Server {
  private static io: WebSocket;

  constructor(httpServer?: HTTPServer) {
    super(httpServer, {
      cors: WEBSOCKET_CORS
    })
  }

  public static getInstance(httpServer?: HTTPServer): WebSocket {
    if (!WebSocket.io) {
      WebSocket.io = new WebSocket(httpServer);
    }

    return WebSocket.io;
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach(element => {
      let namespace = WebSocket.io.of(element.path);
      element.handler.handleConnection(namespace);

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}

export default WebSocket;