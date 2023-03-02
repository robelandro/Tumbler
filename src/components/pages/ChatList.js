import React, { useState, useEffect } from "react";
import "./ChatList.css";

function ChatList() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    document.title = "Chat";
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setChats(data));
  }, []);

  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <div key={chat.id} className="chat">
          <div className="chat-info">
            <h3>{chat.name}</h3>
            <p>{chat.username}</p>
          </div>
          <div className="chat-badge">{chat.unreadMessages}</div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
