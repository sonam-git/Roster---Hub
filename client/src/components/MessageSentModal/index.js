import React from 'react';
import "../../assets/css/modal.css"; 
const MessageSentModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Message Sent!</h2>
        <p>Your message has been successfully sent.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageSentModal;
