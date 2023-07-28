import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './axios.css';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/myapp/messages/')
      .then(response => {
        setMessages(response.data);
      });
  }, []);

  return (
    <div className='messages'>
      <ul>
        {messages.map(message => 
          <li key={message.id}>{message.text}</li>
        )}
      </ul>
    </div>
  );
};

export default MessageList;
