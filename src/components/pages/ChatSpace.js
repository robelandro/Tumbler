import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import './ChatSpace.css'

function ChatSpace() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const location = useLocation();
  const name = location.state.chatId;

  const handleSendMessage = () => {
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };

  return (
    <div className="chat-box">
      <div className="header">
        <h2>{name}</h2>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          size={newMessage.length} 
          onChange={(event) => setNewMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage}><FontAwesomeIcon icon={faPaperPlane}/></button>
      </div>
    </div>
  );
}

export default ChatSpace;
