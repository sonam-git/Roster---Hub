// MessageList.js

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_MESSAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { MailIcon } from "@heroicons/react/solid";
import { AiOutlineDelete } from 'react-icons/ai';
import ChatBox from "../ChatBox";

const MessageList = ({ messages, isLoggedInUser = false }) => {
  const [removeMessage, { error }] = useMutation(REMOVE_MESSAGE, {
    update(cache, { data: { removeMessage } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        const updatedMessages = me.receivedMessages.filter(
          (message) => message._id !== removeMessage._id
        );
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, receivedMessages: updatedMessages } },
        });
      } catch (error) {
        console.error("Error updating cache:", error);
      }
    },
  });

  const handleRemoveMessage = async (messageId) => {
    try {
      await removeMessage({ variables: { messageId } });
    } catch (err) {
      console.error(err);
    }
  };

  const [displayedMessages, setDisplayedMessages] = useState(2);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

  const handleScroll = () => {
    setDisplayedMessages((prevDisplayedMessages) => prevDisplayedMessages + 2);
  };

  const handleReply = (recipient) => {
    setSelectedRecipient(recipient);
    setShowChatModal(true);
  };

  return (
    <>
      <div className="flex items-center ">
        <h1 className="text-2xl lg:text-xl xl:text-2xl font-bold mb-2 text-center">
          Message Box
        </h1>
        <MailIcon className="h-6 w-6 mr-1 mb-2 ml-2" />
        <span
          style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 10 }}
        >
          {messages.length}
          {messages.length === 1}
        </span>
      </div>
      <div className="overscroll-contain message-container overflow-auto max-h-80">
        {/* Display messages */}
        {messages.slice(0, displayedMessages).map((message) => (
          <div key={message._id} className="message-item">
            <div className="message-card border border-gray-300 rounded-lg p-4 mb-4">
              {/* Sender Information */}
              <p className="text-sm text-gray-500 mt-2">
                From: {message.sender.name} on {message.createdAt}
              </p>
              {/* Message Text */}
              <p>{message.text}</p>

              <div className="card-body flex justify-between items-center">
                {/* Reply Button */}
                {isLoggedInUser && (
                  <button
                    className="mt-4 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={() => handleReply(message.sender)}
                  >
                    Reply
                  </button>
                )}

                {/* Delete Button (if logged in user) */}
                {isLoggedInUser && (
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                    onClick={() => handleRemoveMessage(message._id)}
                  >
                    <AiOutlineDelete />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Display "View More Messages" button if there are more messages */}
        {displayedMessages < messages.length && (
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleScroll}
          >
            View More Messages
          </button>
        )}
      </div>
      {error && <div className="error-message">{error.message}</div>}

      {/* ChatBox Modal */}
      {showChatModal && (
        <ChatBox
          recipient={selectedRecipient}
          onCloseModal={() => setShowChatModal(false)}
        />
      )}
    </>
  );
};

export default MessageList;
