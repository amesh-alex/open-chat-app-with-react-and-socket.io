import React, { useEffect, useState, useRef } from 'react'

import { Socket } from 'socket.io-client';
import ChatBar from '../../components/ChatBar';
import ChatBody from '../../components/ChatBody';
import ChatFooter from '../../components/ChatFooter';

interface Props {
  socket: Socket
}

const Chat: React.FC<Props> = ({ socket }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("messageResponse", (data: Message) => {
      console.log(`messageResponse: ${data}`);
      setMessages([...messages, data])
    })
  }, [socket, messages])

  useEffect(() => {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  )
}

export default Chat;