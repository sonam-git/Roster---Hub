import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_CHATS_BETWEEN_USERS, QUERY_PROFILES } from '../../utils/queries';
import { CREATE_CHAT, CHAT_SUBSCRIPTION } from '../../utils/mutations';
import { FaPaperPlane } from 'react-icons/fa';

const ChatPopup = ({ currentUser, isDarkMode }) => {
  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const chatEndRef = useRef(null);
  
  const { data: profilesData } = useQuery(QUERY_PROFILES);
  const { data: chatsData, refetch: refetchChats } = useQuery(GET_CHATS_BETWEEN_USERS, {
    variables: { userId1: currentUser._id, userId2: selectedUser?._id },
    skip: !selectedUser,
  });
  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: () => refetchChats(),
    onError: (error) => console.error('Error creating chat:', error.message),
  });

  useSubscription(CHAT_SUBSCRIPTION, {
    onSubscriptionData: () => {
      if (selectedUser) {
        refetchChats();
      }
    },
  });

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatsData]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setErrorMessage('Please write a message first to send.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    try {
      await createChat({
        variables: {
          from: currentUser._id,
          to: selectedUser._id,
          content: message,
        },
        optimisticResponse: {
          createChat: {
            id: Math.random().toString(),
            from: { _id: currentUser._id, name: currentUser.name, __typename: 'Profile' },
            to: { _id: selectedUser._id, name: selectedUser.name, __typename: 'Profile' },
            content: message,
            createdAt: new Date().toISOString(),
            seen: false,
            __typename: 'Chat',
          },
        },
        update: (cache, { data: { createChat } }) => {
          const data = cache.readQuery({
            query: GET_CHATS_BETWEEN_USERS,
            variables: { userId1: currentUser._id, userId2: selectedUser._id },
          });

          if (data) {
            cache.writeQuery({
              query: GET_CHATS_BETWEEN_USERS,
              variables: { userId1: currentUser._id, userId2: selectedUser._id },
              data: {
                getChatsBetweenUsers: [...data.getChatsBetweenUsers, createChat],
              },
            });
          }
        },
      });
      setMessage('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  return (
    <div className={`fixed bottom-0 right-2 w-80 bg-white border border-gray-300 rounded-t-lg shadow-lg`}>
      <div
        className={` font-semibold ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white'} p-2 cursor-pointer rounded-t-lg flex justify-between items-center`}
        onClick={() => setChatPopupOpen(!chatPopupOpen)}
      >
        <span>Chat Box</span>
        <span>{chatPopupOpen ? '▼' : '▲'}</span>
      </div>
      {chatPopupOpen && (
        <div className={`flex flex-col h-86 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
          {!selectedUser ? (
            <div className="flex-1 border-b border-gray-300 p-2 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">Players List</h3>
              {profilesData?.profiles
                .filter((user) => user._id !== currentUser._id)
                .map((user) => (
                  <div
                    key={user._id}
                    className={`p-1 cursor-pointer hover:bg-gray-100 dark:hover:text-black ${selectedUser?._id === user._id ? 'bg-gray-200' : ''}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    {user.name}
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between  font-semibold items-center p-2 border-b border-gray-300">
                <span>{selectedUser.name}</span>
                <button
                  className="text-red-500"
                  onClick={() => setSelectedUser(null)}
                >
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: '300px' }}>
                {chatsData?.getChatsBetweenUsers.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-1 my-1 ${chat.from._id === currentUser._id ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block p-2 rounded-lg ${chat.from._id === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                    >
                      {chat.content}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(parseInt(chat.createdAt)).toLocaleString()}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              {errorMessage && <div className="text-red-500 p-2">{errorMessage}</div>}
              <div className="border-t border-gray-300 p-2 flex">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 dark:bg-gray-800 rounded-lg mr-2 resize-none dark:text-white"
                  placeholder="Type your message..."
                  rows="3"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
