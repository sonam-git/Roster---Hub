import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_MESSAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { MailIcon } from "@heroicons/react/solid";

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

  const handleScroll = () => {
    setDisplayedMessages((prevDisplayedMessages) => prevDisplayedMessages + 2);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-center">Message Box</h1>
      <div className="flex items-center">
        <MailIcon className="h-6 w-6 mr-1" />{" "}
        {/* Adjust size and margin as needed */}
        <span style={{ fontSize: "1rem" }}>
          You currently have {messages.length} message
          {messages.length === 1 ? "" : "s"} in your box.
        </span>
      </div>
      <div className="message-container overflow-auto max-h-80">
        {/* Display messages */}
        {messages.slice(0, displayedMessages).map((message) => (
          <div key={message._id} className="message-item">
            <div className="message-card border border-gray-300 rounded-lg p-4 mb-4">
              {/* Sender Information */}
              <p className="text-sm text-gray-500 mt-2">
                From: {message.sender.name} on {message.createdAt}
              </p>
              {/* Message Text */}
              <p className="message-text">{message.text}</p>

              {/* Delete Button (if logged in user) */}
              {isLoggedInUser && (
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleRemoveMessage(message._id)}
                >
                  Delete
                </button>
              )}
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
    </div>
  );
};

export default MessageList;
