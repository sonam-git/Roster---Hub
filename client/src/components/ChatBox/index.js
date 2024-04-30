import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SEND_MESSAGE } from '../../utils/mutations';
import Modal from '../Modal';
import MessageSentModal from '../MessageSentModal';
import { QUERY_ME } from '../../utils/queries'; // Import the GraphQL query for fetching profile information

const ChatBox = ({ recipient, onCloseModal }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); // State to store messages
  const [showModal, setShowModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  

  // Fetch messages between current user and recipient
  const { loading, data } = useQuery(QUERY_ME);
  if(loading){
    <div>loading....</div>
  }

  useEffect(() => {
    if (data && data.me && data.me.receivedMessages) {
      // Filter messages to include only those from the current recipient
      const filteredMessages = data.me.receivedMessages.filter(
        msg => msg.sender._id === recipient._id
      );
      setMessages(filteredMessages);
    }
  }, [data, recipient]);

  // Function to handle sending message
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

      // Update messages state with the newly sent message
      setMessages([
        ...messages,
        { sender: 'You', text: message, createdAt: new Date().toISOString() },
      ]);

      setMessage('');
      setMessageSent(true);
      setShowModal(true);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Function to handle closing modal
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
              <h3 className="text-xl font-bold mb-4">Chat with {recipient.name}</h3>
              {/* Display previous messages */}
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">{msg.sender.name}</p>
                  <p>{msg.text}</p>
                  <p className="text-sm text-gray-500">
                    {msg.createdAt}
                  </p>
                </div>
              ))}
              {/* Input field for new message */}
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={3}
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
      </>
    )
  );
};

export default ChatBox;
