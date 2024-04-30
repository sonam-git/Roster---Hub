import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries'; // Import the necessary query
import Modal from '../Modal';
import MessageSentModal from '../MessageSentModal';
import MyProfile from '../MyProfile'; // Import the MyProfile component

const ChatBox = ({ recipient, onCloseModal }) => {
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
        refetchQueries: [{ query: QUERY_ME }], // Refetch the necessary query after sending the message
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
    onCloseModal();
  };

  return (
    recipient && (
      <>
        {!messageSent && (
          <Modal showModal={!messageSent} onClose={handleCloseModal}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Send Message to {recipient.name}</h3>
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Type your message..."
                rows={6}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
        {showModal && <MessageSentModal onClose={handleCloseModal} />}
        {messageSent && <MyProfile />}
      </>
    )
  );
};

export default ChatBox;
