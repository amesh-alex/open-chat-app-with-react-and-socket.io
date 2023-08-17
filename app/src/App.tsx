import {BrowserRouter, Routes, Route} from "react-router-dom"

import { io, Socket } from 'socket.io-client';
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";

const socket: Socket = io("http://localhost:3001/chat");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<Chat socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
