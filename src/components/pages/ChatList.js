import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./ChatList.css";

function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Chat";
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setChats(data));
  }, []);

  const handleChatClick = (chatId) => {
    // handle chat click here, e.g. redirect to chat page
    console.log(`Clicked on chat ${chatId}`);
    navigate('/chat', { state: { chatId} })
  };

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <button key={chat.id} className="chat" onClick={() => handleChatClick(chat.name)}>
          <div className="chat-info">
            <h3>{chat.name}</h3>
            <p>{chat.username}</p>
          </div>
          <div className="chat-badge">{chat.unreadMessages}</div>
        </button>
      ))}
    </div>
  );
}

export default ChatList;
