import React from 'react';
import "../../assets/css/chatModal.css"

const Modal = ({ showModal, children, onClose }) => {
  const handleClose = () => {
    onClose(); // Call the onClose function provided by the parent component
  };

  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <span className="close-btn" onClick={handleClose}>close</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
