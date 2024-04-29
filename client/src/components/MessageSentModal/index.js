import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/modal.css"; 

const MessageSentModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose(); // Close the modal
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Message Sent!</h2>
        <p>Your message has been successfully sent.</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageSentModal;
