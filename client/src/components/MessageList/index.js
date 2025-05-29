import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_MESSAGE } from "../../utils/mutations";
import { QUERY_ME, QUERY_PROFILES } from "../../utils/queries";
import { MailIcon, PlusIcon } from "@heroicons/react/solid";
import { AiOutlineDelete } from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import ChatBox from "../MessageBox";
import UserListModal from "../UserListModal";

const MessageList = ({ messages, isLoggedInUser = false, isDarkMode }) => {
  const [removeMessage] = useMutation(REMOVE_MESSAGE, {
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

  const { data: profileData } = useQuery(QUERY_PROFILES);
  const profiles = profileData?.profiles || [];

  const [displayedMessages, setDisplayedMessages] = useState(2);
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showUserListModal, setShowUserListModal] = useState(false);
  const handleRemoveMessage = async (messageId) => {
    try {
      await removeMessage({ variables: { messageId } });
    } catch (err) {
      console.error(err);
    }
  };
  const handleScroll = () => {
    setDisplayedMessages((prev) => prev + 2);
  };

  const handleReply = (recipient, message) => {
    setSelectedRecipient(recipient);
    setSelectedMessage(message);
    setShowChatModal(true);
  };

  const handleSelectUser = (user) => {
    setSelectedRecipient(user);
    setSelectedMessage(null);
    setShowUserListModal(false);
    setShowChatModal(true);
  };

  return (
    <>
      <div className="text-center py-8">
        <h1 className="text-xl lg:text-xl xl:text-2xl font-bold mb-2">Message Box</h1>
        <div className="flex items-center justify-center space-x-2">
          <MailIcon className="h-6 w-6 text-gray-600" />
          <span className="font-bold">{messages.length}</span>

          {isLoggedInUser && (
            <button
              onClick={() => setShowUserListModal(true)}
              className={`ml-4 flex items-center px-2 py-1 rounded-md ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
              } hover:bg-indigo-500 hover:text-white transition`}
              title="Create New Message"
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              New
            </button>
          )}
        </div>
      </div>

      <div className={`overflow-auto max-h-100 my-4 grid grid-cols-1 gap-4`}>
        {messages.slice(0, displayedMessages).map((message) => (
          <div key={message._id} className="col-span-1">
            <div className="border border-gray-800 dark:border-gray-100 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-500 mt-2">
                From: {message?.sender.name} on {message.createdAt}
              </p>
              <p className={`bg-gray-500 rounded-md text-white p-2`}>
                {message.text}
              </p>
              <div className="flex justify-between items-center">
                {isLoggedInUser && (
                  <button
                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800"
                    onClick={() => handleReply(message?.sender, message)}
                  >
                    <FaReply />
                  </button>
                )}
                {isLoggedInUser && (
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    onClick={() => handleRemoveMessage(message._id)}
                  >
                    <AiOutlineDelete />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {displayedMessages < messages.length && (
          <button
            className="block w-1/4 mx-auto mt-2 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-2 rounded"
            onClick={handleScroll}
          >
            View More
          </button>
        )}
      </div>

      {/* User Selection Modal */}
      <UserListModal
        show={showUserListModal}
        onClose={() => setShowUserListModal(false)}
        profiles={profiles}
        onSelectUser={handleSelectUser}
        isDarkMode={isDarkMode}
      />

      {/* Chat Modal */}
      {showChatModal && selectedRecipient && (
        <ChatBox
          recipient={selectedRecipient}
          selectedMessage={selectedMessage}
          onCloseModal={() => {
            setShowChatModal(false);
            setSelectedRecipient(null);
            setSelectedMessage(null);
          }}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
};

export default MessageList;
