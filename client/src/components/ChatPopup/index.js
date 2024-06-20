import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_PROFILES, GET_CHATS_BETWEEN_USERS } from '../../utils/queries';
import { CREATE_CHAT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const ChatPopup = () => {
  const loggedInUserId = Auth.getProfile().data._id; 
 
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [recipientId, setRecipientId] = useState(null);

  const { data: profilesData, loading: profilesLoading } = useQuery(QUERY_PROFILES);

  const { data, loading, refetch } = useQuery(GET_CHATS_BETWEEN_USERS, {
    variables: { userId1: loggedInUserId, userId2: recipientId },
    skip: !recipientId || !isOpen,
  });
  const [createChat] = useMutation(CREATE_CHAT);

  useEffect(() => {
    if (isOpen && recipientId) {
      refetch();
    }
  }, [isOpen, recipientId, refetch]);

  const handleSend = async () => {
    if (message.trim() === '') return;
    await createChat({ variables: { from: loggedInUserId, to: recipientId, content: message } });
    setMessage('');
    refetch();
  };

  const handleUserClick = (selectedUserId) => {
    setIsOpen(true);
    setRecipientId(selectedUserId);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-lg z-50">
      {!isOpen && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Open Chat
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 max-w-full lg:max-w-xl bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="flex h-full">
            {/* User List Column */}
            <div className="w-1/3 bg-gray-200 p-4 h-full overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Users</h2>
              {profilesLoading ? (
                <p>Loading...</p>
              ) : (
                profilesData?.profiles.map((profile) => (
                  profile.id !== loggedInUserId && (
                    <div
                      key={profile.id}
                      className="cursor-pointer p-2 hover:bg-gray-300 mb-2 rounded"
                      onClick={() => handleUserClick(profile.id)}
                    >
                      {profile.name}
                    </div>
                  )
                ))
              )}
            </div>
            {/* Chat History and Input Column */}
            <div className="w-2/3 bg-white rounded-lg">
              <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                <h2 className="text-lg">Chat with {profilesData?.profiles.find(p => p.id === recipientId)?.name}</h2>
              </div>
              <div className="p-4 h-64 overflow-y-auto">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  data?.getChatsBetweenUsers.map((chat) => (
                    <div
                      key={chat.id}
                      className={`mb-4 p-2 rounded ${
                        chat.from.id === loggedInUserId ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
                      }`}
                    >
                      <p className="font-bold">{chat.from.name}</p>
                      <p>{chat.content}</p>
                      <span className="text-xs text-gray-500">{new Date(chat.createdAt).toLocaleTimeString()}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="p-4 flex items-center justify-between border-t border-gray-300">
                <input
                  type="text"
                  className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button
                  className="bg-blue-500 text-white p-2 rounded-r-lg ml-2"
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
