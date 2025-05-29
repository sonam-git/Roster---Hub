import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SEND_MESSAGE } from "../../utils/mutations";
import Modal from "../Modal";
import MessageSentModal from "../MessageSentModal";
import { QUERY_ME } from "../../utils/queries";

const ChatBox = ({ recipient, selectedMessage, onCloseModal, isDarkMode }) => {
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const { data } = useQuery(QUERY_ME);

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

  const isSender = selectedMessage?.sender?._id === data?.me?._id;

  return (
    recipient && (
      <>
        {!messageSent && (
          <Modal showModal={true} onClose={handleCloseModal}>
            <div
              className={`rounded-lg shadow-md p-6 ${
                isDarkMode ? "bg-gray-200 text-white" : "bg-white text-black"
              } `}
            >
              <h3 className="text-xl font-bold mb-4 card-header bg-dark text-light p-2 m-0 rounded-md">
                {selectedMessage
                  ? `Reply to ${recipient.name[0].toUpperCase() + recipient.name.slice(1)}`
                  : `Message ${recipient.name[0].toUpperCase() + recipient.name.slice(1)}`}
              </h3>

              {/* Display original message if replying */}
              {selectedMessage ? (
                <div
                  className={`conversation-container p-2 max-h-80 overflow-y-auto ${
                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <div className="mb-2">
                    <p className="font-semibold">
                      {selectedMessage.sender?.name
                        ? selectedMessage.sender.name[0].toUpperCase() +
                          selectedMessage.sender.name.slice(1)
                        : "Sender"}
                    </p>
                    <p
                      className={`rounded-md text-white p-2 ${
                        isSender ? "bg-blue-500" : "bg-gray-500"
                      }`}
                    >
                      {selectedMessage.text}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedMessage.createdAt || ""}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mb-4 text-sm italic">
                  You're starting a new message to {recipient.name}.
                </p>
              )}

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
