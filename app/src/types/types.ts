interface User {
  socketId: string;
  userName: string;
}

interface Message {
  id: string;
  socketId: string;
  name: string;
  text: string;
}