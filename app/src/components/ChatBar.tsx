import React, { useState, useEffect } from 'react'

import { Socket } from 'socket.io-client';

interface Props {
  socket: Socket
}

const ChatBar: React.FC<Props> = ({ socket }) => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    socket.on("newUserResponse", data => setUsers(data))
  }, [socket, users])

  return (
    <div className='chat__sidebar'>
      <h2>Open Chat</h2>
      <div>
        <h4 className='chat__header'>ACTIVE USERS</h4>
        <div className='chat__users'>
          {users.map(user => <p key={user.socketId}>{user.userName}</p>)}
        </div>
      </div>
    </div>
  )
}

export default ChatBar