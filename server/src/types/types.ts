export interface User {
  socketId: string;
  userName: string;
}

export interface Message {
  id: string;
  socketId: string;
  name: string;
  text: string;
}