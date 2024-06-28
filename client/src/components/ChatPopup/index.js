import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { QUERY_PROFILES, GET_CHAT_BY_USER } from '../../utils/queries';
import { CREATE_CHAT } from '../../utils/mutations';
import { CHAT_SUBSCRIPTION } from '../../utils/subscription';
import { FaPaperPlane } from 'react-icons/fa';
import ProfileAvatar from "../../assets/images/profile-avatar.png";

const ChatPopup = ({ currentUser, isDarkMode }) => {
  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const chatEndRef = useRef(null);

  // get userId from currently loggedin user
  const userId = currentUser._id;
 
// query profiles to get the selected userId for chat
  const { data: profilesData } = useQuery(QUERY_PROFILES);

  // query chat between users
  const { data: chatsData, refetch } = useQuery(GET_CHAT_BY_USER, {
    variables: { to: selectedUser?._id },
    skip: !selectedUser,
    onCompleted: (data) => {
      setMessages(data.getChatByUser);
    },
  });

  // create chat mutation
  const [createChat] = useMutation(CREATE_CHAT);

// Subscription 
  useSubscription(CHAT_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (
        (data.chatCreated.to._id === selectedUser?._id && data.chatCreated.from._id === userId) ||
        (data.chatCreated.to._id === userId && data.chatCreated.from._id === selectedUser?._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, data.chatCreated]);
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
  });

  // in order to display the message in scrolling UI, showing the latest one in the bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // handle the messagesent
  const handleSendMessage = async () => {
    if (!text.trim()) {
      setErrorMessage('Please write a message first to send.');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return;
    }

    try {
      await createChat({
        variables: {
          from: userId,
          to: selectedUser._id,
          content: text,
        },
      });
      setText('');
      setErrorMessage('');
      refetch();  // Refetch the chats to get the latest messages
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  return (
    <div className={`fixed bottom-0 right-2 w-80 bg-white border border-gray-300 rounded-t-lg shadow-lg`}>
      <div
        className={`font-semibold ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-blue-600 text-white'} p-2 cursor-pointer rounded-t-lg flex justify-between items-center`}
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
                .filter((user) => user._id !== userId)
                .map((user) => (
                  <div
                    key={user._id}
                    className={`p-1 cursor-pointer hover:bg-gray-100 dark:hover:text-black ${
                      selectedUser?._id === user._id ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => setSelectedUser(user)}
                  >
                    {user.name}
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between font-semibold items-center p-2 border-b border-gray-300">
                <span>{selectedUser.name}</span>
                <button className="text-red-500" onClick={() => setSelectedUser(null)}>
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: '300px' }}>
                {messages.map((chat) => (
                  <div
                    key={chat._id}
                    className={`p-1 my-1 flex ${chat.from._id === userId ? 'justify-end' : 'justify-start'}`}
                  >
                    {chat.from._id !== userId && (
                      <img
                        src={chat.from.profilePic || ProfileAvatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <div>
                      <div
                        className={`inline-block p-2 rounded-lg ${
                          chat.from._id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                        }`}
                      >
                        {chat.content}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(parseInt(chat.createdAt)).toLocaleString()}
                      </div>
                    </div>
                    {chat.from._id === userId && (
                      <img
                        src={currentUser.profilePic || ProfileAvatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full ml-2"
                      />
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              {errorMessage && <div className="text-red-500 p-2">{errorMessage}</div>}
              <div className="border-t border-gray-300 p-2 flex">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
