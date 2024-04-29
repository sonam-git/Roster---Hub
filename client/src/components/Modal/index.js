import React from 'react';
import "../../assets/css/chatModal.css"

const Modal = ({ showModal, children, onClose }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>×</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
