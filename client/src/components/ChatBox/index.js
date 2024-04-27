import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';

const ChatBox = ({ user }) => {
  const [message, setMessage] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    
    try {
      await sendMessage({
        variables: {
          userId: user.id, // Assuming user.id is the ID of the user to whom the message is being sent
          text: message
        }
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Chatting with {user.name}</h3>
      </div>
      <div className="chat-messages">
        {/* Render chat messages here */}
        {/* Example: messages.map(message => <div key={message.id}>{message.text}</div>) */}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
