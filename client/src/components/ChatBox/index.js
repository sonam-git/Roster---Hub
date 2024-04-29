import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';
import Modal from '../Modal'; 
import "../../assets/css/modal.css"; 
import MessageSentModal from '../MessageSentModal'; 

const ChatBox = ({ recipient }) => {
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [messageSent, setMessageSent] = useState(false); 
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
      setMessageSent(true); 
      setShowModal(true); 
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (messageSent) {
      setMessageSent(false); // Reset messageSent state
    }
  };

  return (
    recipient && (
      <>
        {!messageSent && ( // Render message input box only if message is not sent
          <Modal showModal={!messageSent && showModal} onClose={handleCloseModal}>
            <div className="card mb-3">
              <h3>Chatting with {recipient.name}</h3>
              <div className="card-header bg-dark text-light p-2 m-0">
                <textarea
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Type your message..."
                  rows={4}
                />
                <div>
                  <button className="btn btn-info" onClick={handleSendMessage}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
        {showModal && <MessageSentModal onClose={handleCloseModal} />}
      </>
    )
  );
};

export default ChatBox;
