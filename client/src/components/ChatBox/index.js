import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_MESSAGE } from "../../utils/mutations";
import Modal from "../Modal";
import MessageSentModal from "../MessageSentModal";
import { QUERY_ME } from "../../utils/queries";

const ChatBox = ({ recipient, onCloseModal, isDarkMode }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  // Fetch all messages between current user and recipient
  const { loading, data } = useQuery(QUERY_ME);

  useEffect(() => {
    if (!loading && data && data.me && data.me.receivedMessages && recipient) {
      // Combine received and sent messages
      const allMessages = [
        ...data.me.receivedMessages,
        ...data.me.sentMessages,
      ];
      // Filter messages to include only those between current user and recipient
      const filteredMessages = allMessages.filter(
        (msg) =>
          msg.sender._id === recipient._id ||
          msg.recipient._id === recipient._id
      );
      // Sort messages by createdAt timestamp in ascending order
      const sortedMessages = filteredMessages.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setMessages(sortedMessages);
    }
  }, [loading, data, recipient]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      await sendMessage({
        variables: {
          recipientId: recipient._id,
          text: message,
        },
        refetchQueries: [{ query: QUERY_ME }],
      });

      setMessage("");
      setMessageSent(true);
      setShowModal(true);
    } catch (error) {
      console.error("Error sending message:", error);
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
            <div className={`rounded-lg shadow-md p-6 ${isDarkMode ? 'bg-gray-200 text-white' : 'bg-white text-black'} `}>
              <h3 className="text-xl font-bold mb-4 card-header bg-dark text-light p-2 m-0 rounded-md">
                Send Message to {" "}
                {recipient.name[0].toUpperCase() + recipient.name.slice(1)}
              </h3>
              {/* Container with fixed height and vertical scrolling */}
              <div className={`conversation-container p-2 max-h-80 overflow-y-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                {messages.map((msg, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-semibold">
                      {msg?.sender && msg?.sender.name
                        ? msg.sender.name[0].toUpperCase() +
                          msg.sender.name.slice(1)
                        : "Sender"}
                    </p>
                    <p className="bg-gray-500 rounded-md text-white p-2">
                      {msg.text}
                    </p>
                    <p className="text-sm text-gray-500">
                      {msg.createdAt || ""}
                    </p>
                  </div>
                ))}
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={3}
                className="text-dark w-full p-2 border border-gray-300 rounded-md mt-2 mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800 mr-2"
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
