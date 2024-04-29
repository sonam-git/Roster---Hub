import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';

const ChatBox = ({ recipient }) => {
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
          recipientId: recipient._id,
          text: message,
        },
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Chatting with {recipient.name}</h3>
      </div>
      <div className="chat-input">
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
          rows={4}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
