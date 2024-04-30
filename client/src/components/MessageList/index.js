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
      <div className="flex items-center ">
        <h1 className="text-2xl font-bold mb-2 text-center">Message Box</h1>
        <MailIcon className="h-6 w-6 mr-1 mb-2 ml-2" />{" "}
        {/* Adjust size and margin as needed */}
        <span style={{ fontSize: "1rem", fontWeight: "bold" }} className="mb-2">
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

              {/* Delete Button (if logged in user) */}
              {isLoggedInUser && (
                <button
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleRemoveMessage(message._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
        {/* Display "View More Messages" button if there are more messages */}
        {displayedMessages < messages.length && (
          <button
            className="mt-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
