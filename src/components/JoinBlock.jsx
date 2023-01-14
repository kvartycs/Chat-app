import axios from 'axios'
import React, { useState } from 'react'

const JoinBlock = ({ onLogin }) => {
  const [roomId, setroomId] = useState('')
  const [userName, setUserName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные')
    }
    const obj = {
      roomId,
      userName,
    }
    setIsLoading(true)
    await axios.post('/rooms', obj)
    onLogin(obj)
  }

  return (
    <div>
      <div className="header">
        <p>React Chat</p>
      </div>
      <div className="register-container">
        <div className="register-wrapper">
          <h3>Chat</h3>
          <form action="">
            <p className="def">Chat ID</p>
            <input
              type="text"
              placeholder="Enter Chat ID"
              value={roomId}
              onChange={(e) => setroomId(e.target.value)}
            />
            <p className="def">Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <button disabled={isLoading} onClick={onEnter}>
              {!isLoading ? 'Join to the room' : 'Connecting...'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JoinBlock
