import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_MESSAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import "../../assets/css/message.css"; 

const MessageList = ({ messages, isLoggedInUser = false }) => {
  const [removeMessage, { error }] = useMutation(REMOVE_MESSAGE, {
    update(cache, { data: { removeMessage } }) {
      try {
        // Read the current cache data
        const { me } = cache.readQuery({ query: QUERY_ME });

        // Remove the deleted message from the messages array
        const updatedMessages = me.receivedMessages.filter(
          (message) => message._id !== removeMessage._id
        );

        // Write the updated data back to the cache
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
      await removeMessage({
        variables: { messageId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!messages.length) {
    return <h3>No Messages Yet</h3>;
  }

  return (
    <div>
      <div className="message-container">
        {messages.map((message) => (
          <div key={message._id} className="message-item">
            <div className="message-card">
              <p className="message-header">
                <span className="message-text">{message.text}</span>
                <span className="author-name"> From: {message.sender.name} on {message.createdAt}</span>
                {isLoggedInUser && (
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveMessage(message._id)}
                  >
                    X
                  </button>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="error-message">{error.message}</div>
      )}
    </div>
  );
};

export default MessageList;
