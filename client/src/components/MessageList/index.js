import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_MESSAGE } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import { MailIcon } from "@heroicons/react/solid";
import { AiOutlineDelete } from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import ChatBox from "../ChatBox";

const MessageList = ({ messages, isLoggedInUser = false, isDarkMode }) => {
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
<div className="text-center py-8">
  <h1 className="text-xl lg:text-xl xl:text-2xl font-bold mb-2">
    Message Box
  </h1>
  <div className="flex items-center justify-center">
    <MailIcon className="h-6 w-6 mr-1 mb-2 ml-2" />
    <span style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: 10 }}>
      {messages.length}
      {messages.length === 1}
    </span>
  </div>
</div>


      <div className={`overflow-auto max-h-100 my-4 grid grid-cols-1 gap-4 `}>
        {messages.slice(0, displayedMessages).map((message) => (
          <div key={message._id} className="col-span-1">
            <div className="border border-gray-800 dark:border-gray-100 rounded-lg p-4 mb-4">
              {/* Sender Information */}
              <p className="text-sm text-gray-500 mt-2">
                From: {message?.sender.name} on {message.createdAt}
              </p>
              {/* Message Text */}
              <p className={`bg-gray-500 rounded-md text-white p-2`}>
                {message.text}
              </p>

              <div className="flex justify-between items-center">
                {/* Reply Button */}
                {isLoggedInUser && (
                  <button
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition duration-300"
                    onClick={() => handleReply(message?.sender)}
                  >
                     <FaReply />
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
     className="block w-1/4 mx-auto mt-2 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-2 rounded"
     onClick={handleScroll}
   >
     View More 
   </button>
   
        )}
      </div>
      {error && <div className="error-message">{error.message}</div>}

      {/* ChatBox Modal */}
      {showChatModal && (
        <ChatBox
          recipient={selectedRecipient}
          onCloseModal={() => setShowChatModal(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
};

export default MessageList;
