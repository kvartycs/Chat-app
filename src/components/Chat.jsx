import React, { useEffect, useState, useRef } from 'react'
import socket from '../socket'

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
  const [messageValue, setMessageValue] = useState('')
  const messagesRef = useRef(null)
  const onSendMessage = () => {
    socket.emit('ROOM:NEW_MESSAGE', {
      userName,
      roomId,
      text: messageValue,
    })

    onAddMessage({ userName, text: messageValue })
    setMessageValue('')
  }
  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999)
  }, [messages])
  console.log(messages)

  return (
    <div className="room-wrapper">
      <div className="room">
        <div className="sidebar">
          <span>Users online: ( {users.length} )</span>
          {users.map((name, index) => (
            <div className="user" key={name + index}>
              <p>{name}</p>
            </div>
          ))}
        </div>
        <div className="messages-wrapper">
          <div ref={messagesRef} className="messages">
            {messages.map((message, index) => (
              <div className="message" key={index}>
                <span>{message.text}</span>
                <div className="userName">
                  <p>{message.userName}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="enter">
            <input
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              type="text"
              id="input"
              className="input"
              placeholder="Enter your message"
            />
            <button onClick={onSendMessage} className="send-btn">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
